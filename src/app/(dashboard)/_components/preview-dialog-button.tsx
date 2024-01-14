import React from "react";
import { Button } from "@/components/ui/button";
import { MdPreview } from "react-icons/md";

const PreviewDialogButton = () => {
  return (
    <Button variant="outline" className="gap-2">
      <MdPreview className="w-6 h-6" />
      Previsualizar
    </Button>
  );
};

export default PreviewDialogButton;
