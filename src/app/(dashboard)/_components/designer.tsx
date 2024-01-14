"use client";

import React, { useState } from "react";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import DesignedBar from "./designer-sidebar";
import { cn } from "@/lib/utils";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./form-elements";
import useDesaignerContext from "../hooks/use-designer-context";
import { idGenerator } from "@/lib/id-generator";
import DesignerElementWrapper from "./design-element-wrapper";

const Designer = () => {
  const { elements, addElement, selectedElement, setSelectedElement } =
    useDesaignerContext();

  const droppable = useDroppable({
    id: "designed-drop-area",
    data: {
      isDesignedDropData: true,
    },
  });

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignedBtnElement = active.data?.current?.isDesignedBtnElement;

      if (isDesignedBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(0, newElement);
      }
      // console.log("first ", event);
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center sm:items-start sm:flex-row space-x-2 space-y-2 sm:space-y-0">
      <div
        className="w-full h-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20 justify-start"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="px-20 mx-auto text-2xl text-muted-foreground flex flex-grow items-center font-bold">
              Suelta aca los elementos que vas a utilizar en tu formulario
            </p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className="w-full pr-4 pt-4 pl-4 pb-0">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-4 p-4">
              {elements.map((element, i) => (
                <DesignerElementWrapper key={i} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignedBar />
    </div>
  );
};

export default Designer;
