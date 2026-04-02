"use client";

import { useState } from "react";
//Icons
import { MdEditDocument } from "react-icons/md";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { BiSolidHide } from "react-icons/bi";
//Components
import DropdownMenu from "@/shared/components/DropdownMenu";
import ConfirmAction from "@/shared/components/ConfirmAction";
//Animations
import { AnimatePresence } from "motion/react";

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
      <DropdownMenu variant="ghost">
        <DropdownMenu.Item onClick={handleRename}>
          <MdEditDocument />
          Rename
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={handleDisconnect}>
          <PiPlugsConnectedFill />
          {isDisconnected ? "Reconnect" : "Disconnect"}
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={handleHide}>
          <BiSolidHide />
          {isHidden ? "Unhide" : "Hide"}
        </DropdownMenu.Item>
      </DropdownMenu>
      <AnimatePresence>
        {disconnectModalOpen && (
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
      </AnimatePresence>
    </>
  );
};

export default AccountItemMenu;
