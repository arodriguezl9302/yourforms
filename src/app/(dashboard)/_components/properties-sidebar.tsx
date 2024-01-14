import React from "react";
import useDesaignerContext from "../hooks/use-designer-context";
import { FormElements } from "./form-elements";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";

const PropertiesSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesaignerContext();

  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p>Propiedades</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesSidebar;
