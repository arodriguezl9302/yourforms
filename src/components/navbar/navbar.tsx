import React from "react";
import { ThemeDropDown } from "./theme-drop-down";
import ThemeSwticher from "./theme-switcher";
import Link from "next/link";
import LoginButton from "../auth/login-button";
import { Button } from "../ui/button";
import UserButton from "../auth/user-button";

const Navbar = () => {
  return (
    <div className="w-full flex border-b border-border h-[60px]">
      <nav className="w-full flex justify-center sm:justify-between items-center px-20">
        <Link href="/" className="font-bold text-xl ">
          YourForms
        </Link>
        <div className="space-x-1 items-center hidden sm:flex">
          <ThemeSwticher />
          <UserButton />
          {/* <LoginButton>
          <Button>Login</Button>
        </LoginButton> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
