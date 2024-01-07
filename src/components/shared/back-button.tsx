import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  label: string;
  href: string;
}

const BackButton: React.FC<Props> = ({ label, href }) => {
  return (
    <Button variant="link" className="font-normal w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
