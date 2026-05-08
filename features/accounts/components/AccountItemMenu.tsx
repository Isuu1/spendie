"use client";

import { useState } from "react";
//Components
import ConfirmAction from "@/shared/components/ConfirmAction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//Animations
import { AnimatePresence } from "motion/react";
//Icons
import { EllipsisVertical, EyeOff, FilePenLine, Unplug } from "lucide-react";

type AccountItemMenuProps = {
  onRename: () => void;
  onDisconnect: () => void;
  onHide: () => void;
  isHidden: boolean;
  isDisconnected: boolean;
};

const AccountItemMenu = ({
  onRename,
  onDisconnect,
  onHide,
  isHidden,
  isDisconnected,
}: AccountItemMenuProps) => {
  const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);

  const handleRename = () => {
    onRename();
  };
  const handleDisconnect = () => {
    setDisconnectModalOpen(true);
  };

  const handleHide = () => {
    onHide();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="absolute top-2 right-2 cursor-pointer! z-99 hover:bg-[#ffffff1f] rounded-sm p-1"
        >
          <EllipsisVertical size={28} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-bg-surface text-white text-xs! p-2">
          <DropdownMenuItem
            className="cursor-pointer! hover:bg-bg-surface-dark-hover! text-white!"
            onSelect={handleRename}
          >
            <FilePenLine color="white" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={handleDisconnect}
            className="cursor-pointer! hover:bg-bg-surface-dark-hover! text-white!"
          >
            <Unplug color="white" />
            {isDisconnected ? "Reconnect" : "Disconnect"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={handleHide}
            className="cursor-pointer! hover:bg-bg-surface-dark-hover! text-white!"
          >
            <EyeOff color="white" />
            {isHidden ? "Unhide" : "Hide"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AnimatePresence>
        {disconnectModalOpen && !isDisconnected && (
          <ConfirmAction
            title="Disconnect this account?"
            subtitle="You will no longer receive updates from this bank. Your existing data will remain."
            onConfirm={() => {
              onDisconnect();
              setDisconnectModalOpen(false);
            }}
            onCancel={() => setDisconnectModalOpen(false)}
          />
        )}
        {disconnectModalOpen && isDisconnected && (
          <ConfirmAction
            title="Reconnect this account?"
            subtitle="This will attempt to reconnect the account and fetch the latest data."
            onConfirm={() => {
              onDisconnect();
              setDisconnectModalOpen(false);
            }}
            onCancel={() => setDisconnectModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AccountItemMenu;
