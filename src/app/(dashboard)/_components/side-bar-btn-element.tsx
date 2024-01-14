import React from "react";
import { FormElement } from "./form-elements";
import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface Props {
  formElement: FormElement;
}

const SideBarBtnElement: React.FC<Props> = ({ formElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement;

  const draggable = useDraggable({
    id: `designed-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignedBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px]",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export const SideBarBtnElementDragOverlay: React.FC<Props> = ({
  formElement,
}) => {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button
      variant="outline"
      className="flex flex-col gap-2 h-[120px] w-[120px]"
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SideBarBtnElement;
