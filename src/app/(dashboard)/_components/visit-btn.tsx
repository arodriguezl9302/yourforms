"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface Props {
  sharedUrl: string;
}
const VisitBtn: React.FC<Props> = ({ sharedUrl }) => {
  const [mounted, setMounted] = useState(false);

  if (typeof window !== "undefined") {
    // Your client-side code that uses window goes here
    var shareLink = `${window.location.origin}/submit/${sharedUrl}`;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className="w-[100px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visitar
    </Button>
  );
};

export default VisitBtn;
