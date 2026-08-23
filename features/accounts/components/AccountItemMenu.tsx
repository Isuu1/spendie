"use client";

//Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//Icons
import { EllipsisVertical, EyeOff, FilePenLine } from "lucide-react";

type AccountItemMenuProps = {
  onRename: () => void;
  onHide: () => void;
  isHidden: boolean;
};

const AccountItemMenu = ({
  onRename,
  onHide,
  isHidden,
}: AccountItemMenuProps) => {
  const handleRename = () => {
    onRename();
  };

  const handleHide = () => {
    onHide();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="absolute top-2 right-2 cursor-pointer! z-99 hover:bg-[#ffffff1f] rounded-sm p-1 transition-colors"
        >
          <EllipsisVertical size={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card text-white text-xs! p-2">
          <DropdownMenuItem
            className="cursor-pointer! hover:bg-bg-surface-dark-hover! text-white!"
            onSelect={handleRename}
          >
            <FilePenLine color="white" />
            Rename
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
    </>
  );
};

export default AccountItemMenu;
