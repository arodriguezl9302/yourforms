"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BiExit, BiSolidUser } from "react-icons/bi";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";

const UserButton = () => {
  const user = useCurrentUser();

  const logoutClick = () => {
    logout();
  };

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <BiSolidUser size={20} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={logoutClick}>
          <BiExit className="h-6 w-6 mr-2" />
          Salir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
