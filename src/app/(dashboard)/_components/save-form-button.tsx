import { Button } from "@/components/ui/button";
import React from "react";
import { HiSaveAs } from "react-icons/hi";

const SaveFormButton = () => {
  return (
    <Button variant="outline" className="gap-2">
      <HiSaveAs className="w-6 h-6" />
      Guardar
    </Button>
  );
};

export default SaveFormButton;
