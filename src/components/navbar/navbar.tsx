import React from "react";
import { ThemeDropDown } from "./theme-drop-down";
import ThemeSwticher from "./theme-switcher";
import Link from "next/link";
import LoginButton from "../auth/login-button";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between border-b border-border h-[60px] items-center">
      <Link href="/" className="font-bold text-xl">
        YourForms
      </Link>
      <div className="flex space-x-1">
        <ThemeSwticher />
        {/* <LoginButton>
          <Button>Login</Button>
        </LoginButton> */}
      </div>
    </div>
  );
};

export default Navbar;
