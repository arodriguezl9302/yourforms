"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { ImShare } from "react-icons/im";

interface Props {
  sharedUrl: string;
}
const FormLinkShare: React.FC<Props> = ({ sharedUrl }) => {
  const [mounted, setMounted] = useState(false);

  if (typeof window !== "undefined") {
    var shareLink = `${window.location.origin}/submit/${sharedUrl}`;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-grow items-center gap-4">
      <Input readOnly value={shareLink!} />
      <Button
        className="max-w-[200px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink!);
          toast({
            title: "Enlace copiado",
            description: "Se ha copiado el enlace al portapapeles",
          });
        }}
      >
        <ImShare className="w-4 h-4 mr-2" />
        Compartir enlace
      </Button>
    </div>
  );
};

export default FormLinkShare;
