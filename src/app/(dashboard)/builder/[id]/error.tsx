"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  error: Error;
}

const Error: React.FC<Props> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="w-full flex items-center justify-center flex-col gap-4">
      <p className="text-destructive text-4xl">Ops! ocurrio algún error</p>
      <Button asChild>
        <Link href="/home">Volver al inicio</Link>
      </Button>
    </div>
  );
};

export default Error;
