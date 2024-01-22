import React from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import { font } from "@/components/shared/custom-font";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import DesignerContextProvider from "@/app/(dashboard)/context/designer-context";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    // <DesignerContextProvider>
    <div className="flex flex-col min-h-screen w-full max-h-screen">
      <Navbar />
      <main className="flex h-full w-full flex-grow">{children}</main>
    </div>
    // </DesignerContextProvider>
  );
};

export default Layout;
