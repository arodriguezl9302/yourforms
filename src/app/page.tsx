import LoginButton from "@/components/auth/login-button";
import ThemeSwticher from "@/components/navbar/theme-switcher";
import { Button } from "@/components/ui/button";
import React from "react";

const IndexPage = () => {
  return (
    <div>
      <ThemeSwticher />
      <LoginButton>
        <Button>login</Button>
      </LoginButton>
      landing
    </div>
  );
};

export default IndexPage;
