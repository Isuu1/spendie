import React, { ReactNode, useRef, useState } from "react";
//Icons
import { IoMdMore } from "react-icons/io";
//Animations
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
//Styles
import styles from "./DropdownMenu.module.scss";
//Hooks
import { useClickOutside } from "../hooks/useClickOutside";

const DropdownContext = React.createContext<{
  close: () => void;
} | null>(null);

type BaseDropdownProps = {
  trigger: (props: { isOpen: boolean; toggle: () => void }) => ReactNode;
  children: ReactNode;
};

const BaseDropdown = ({ trigger, children }: BaseDropdownProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggle = () => setMenuOpen((prev) => !prev);
  const close = () => setMenuOpen(false);

  useClickOutside(dropdownRef, () => {
    if (menuOpen) close();
  });

  return (
    <div className={clsx(styles.menu, menuOpen && styles.active)}>
      {trigger({ isOpen: menuOpen, toggle })}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className={styles.dropdown}
            ref={dropdownRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DropdownContext.Provider value={{ close }}>
              {children}
            </DropdownContext.Provider>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

type DropdownItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const DropdownItem = ({ children, onClick }: DropdownItemProps) => {
  const context = React.useContext(DropdownContext);

  return (
    <li
      className={styles.item}
      onClick={() => {
        onClick?.();
        context?.close();
      }}
    >
      {children}
    </li>
  );
};

type DropdownMenuProps = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

const DropdownMenu = ({ children, variant }: DropdownMenuProps) => {
  return (
    <BaseDropdown
      trigger={({ toggle, isOpen }) => (
        <button
          className={clsx(
            styles.icon,
            styles[variant || "primary"],
            isOpen && styles.active,
          )}
          onClick={toggle}
        >
          <IoMdMore />
        </button>
      )}
    >
      {children}
    </BaseDropdown>
  );
};

DropdownMenu.Item = DropdownItem;

export default DropdownMenu;
