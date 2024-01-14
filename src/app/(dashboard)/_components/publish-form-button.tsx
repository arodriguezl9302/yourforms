import React from "react";
import { Button } from "@/components/ui/button";
import { MdOutlinePublish } from "react-icons/md";

const PublishFormButton = () => {
  return (
    <Button
      variant="outline"
      className="gap-2 text-white bg-gradient-to-t from-indigo-400 to-cyan-400"
    >
      <MdOutlinePublish className="w-6 h-6" />
      Publicar
    </Button>
  );
};

export default PublishFormButton;
