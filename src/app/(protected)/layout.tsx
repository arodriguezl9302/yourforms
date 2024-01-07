import React from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import { font } from "@/components/shared/custom-font";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-scree w-full max-h-screen bg-background px-4">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
