//Styles
import styles from "./AccountsMenu.module.scss";
//Components
import Button from "@/shared/components/ui/Button";
//Icons
import { FaSyncAlt } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";

const AccountsMenu = () => {
  return (
    <div className={styles.menu}>
      <Button
        text="Sync all accounts"
        variant="secondary"
        size="medium"
        icon={<FaSyncAlt />}
        iconPosition="left"
      />
      <Button
        text="Connect new account"
        variant="secondary"
        size="medium"
        icon={<MdAccountBalance />}
        iconPosition="left"
      />
    </div>
  );
};

export default AccountsMenu;
