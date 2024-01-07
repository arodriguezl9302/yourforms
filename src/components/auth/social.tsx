"use client";

import React from "react";
import { BiLogoGoogle, BiLogoFacebook } from "react-icons/bi";
import { Button } from "../ui/button";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button className="w-full" size="lg" variant="outline" onClick={() => {}}>
        <BiLogoGoogle className="h-5 w-5" />
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={() => {}}>
        <BiLogoFacebook className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
