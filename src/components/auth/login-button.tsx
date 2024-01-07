"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  child?: boolean;
}

const LoginButton: React.FC<Props> = ({
  children,
  mode = "redirect",
  child,
}) => {
  const router = useRouter();
  const onClick = () => router.push("/auth/login");

  if (mode === "modal") {
    return <span>TODO: impolementar m,odal</span>;
  }

  return <span onClick={onClick}> {children}</span>;
};

export default LoginButton;
