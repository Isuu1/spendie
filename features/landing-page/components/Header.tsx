"use client";

import Link from "next/link";
//Icons
import { Menu } from "lucide-react";
//Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "@/shared/components/ui/Button";

const Header = () => {
  return (
    <div className="z-10 fixed top-0 left-0 right-0 p-4 bg-background flex justify-between items-center">
      <h2 className="text-accent">
        <Link href="/">Spendie.</Link>
      </h2>
      <nav className="max-sm:hidden flex gap-4">
        <span className="cursor-pointer text-lg hover:text-accent transition-colors">
          Home
        </span>
        <span className="cursor-pointer text-lg hover:text-accent transition-colors">
          About
        </span>
        <span className="cursor-pointer text-lg hover:text-accent transition-colors">
          Contact
        </span>
      </nav>

      <Link className="max-sm:hidden" href="/login">
        Login
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="max-sm:block hidden cursor-pointer z-10"
        >
          <Button variant="secondary">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit" align="end">
          <DropdownMenuItem className="text-lg">
            <Link href="/">Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg">
            <Link href="/about">About</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg">
            <Link href="/contact">Contact</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg">
            <Link href="/login">Login</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
