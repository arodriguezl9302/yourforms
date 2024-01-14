"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { FormElementInstance } from "../_components/form-elements";

type DesignerContextDesigner = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  updateElement: (id: string, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

export const DesignerContext = createContext<DesignerContextDesigner | null>(
  null
);

export default function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  const removeElement = (index: string) => {
    setElements((prev) => prev.filter((element) => element.id != index));
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
