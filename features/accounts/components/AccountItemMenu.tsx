"use client";

//Icons
import { MdEditDocument } from "react-icons/md";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { BiSolidHide } from "react-icons/bi";
//Components
import DropdownMenu from "@/shared/components/DropdownMenu";
import { useState } from "react";
import ConfirmAction from "@/shared/components/ConfirmAction";
import { AnimatePresence } from "motion/react";

type AccountItemMenuProps = {
  onRename: () => void;
  onDisconnect: () => void;
};

const AccountItemMenu = ({ onRename, onDisconnect }: AccountItemMenuProps) => {
  const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);

  const handleRename = () => {
    onRename();
  };
  const handleDisconnect = () => {
    setDisconnectModalOpen(true);
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
          Disconnect
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <BiSolidHide />
          Hide
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
