import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { HiSaveAs } from "react-icons/hi";
import useDesaignerContext from "../hooks/use-designer-context";
import { updateFormContent } from "@/actions/form";
import { toast } from "@/components/ui/use-toast";
import { FaSpider } from "react-icons/fa";

interface Props {
  id: string;
}

const SaveFormButton: React.FC<Props> = ({ id }) => {
  const { elements } = useDesaignerContext();
  const [loading, startTransition] = useTransition();

  const updateForm = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await updateFormContent(id, jsonElements);
      toast({
        title: "Formulario guardado",
        description: "Se ha guardado el formulario correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se ha podido guardar el formulario",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateForm)}
    >
      <HiSaveAs className="w-6 h-6" />
      Guardar {loading && <FaSpider className="animate-spin" />}
    </Button>
  );
};

export default SaveFormButton;
