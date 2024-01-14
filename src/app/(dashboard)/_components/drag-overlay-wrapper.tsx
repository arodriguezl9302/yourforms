import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SideBarBtnElementDragOverlay } from "./side-bar-btn-element";
import { ElementsType, FormElements } from "./form-elements";
import useDesaignerContext from "../hooks/use-designer-context";

const DragOverlayWrapper = () => {
  const { elements } = useDesaignerContext();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isSideBarBtnElement = draggedItem?.data?.current?.isDesignedBtnElement;

  if (isSideBarBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = <SideBarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements.find((element) => element.id === elementId);
    if (!element) {
      node = <div>Elemento no encontrado</div>;
    } else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent w-full h-[120px] py-2 px-4 rounded-md opacity-80 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
