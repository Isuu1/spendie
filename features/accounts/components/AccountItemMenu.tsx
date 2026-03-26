//Icons
import { MdEditDocument } from "react-icons/md";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { BiSolidHide } from "react-icons/bi";
//Components
import DropdownMenu from "@/shared/components/DropdownMenu";

type AccountItemMenuProps = {
  onRename: () => void;
};

const AccountItemMenu = ({ onRename }: AccountItemMenuProps) => {
  const handleRename = () => {
    onRename();
  };
  return (
    <DropdownMenu variant="ghost">
      <DropdownMenu.Item onClick={handleRename}>
        <MdEditDocument />
        Rename
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <PiPlugsConnectedFill />
        Disconnect
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <BiSolidHide />
        Hide
      </DropdownMenu.Item>
    </DropdownMenu>
  );
};

export default AccountItemMenu;
