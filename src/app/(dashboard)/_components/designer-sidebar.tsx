import React from "react";
import SideBarBtnElement from "./side-bar-btn-element";
import { FormElements } from "./form-elements";
import useDesaignerContext from "../hooks/use-designer-context";
import FormsElementSidebar from "./form-elements-sidebar";
import PropertiesSidebar from "./properties-sidebar";

const DesignedBar = () => {
  const { selectedElement } = useDesaignerContext();

  return (
    <div className="w-full sm:w-[400px] sm:max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full rounded-xl">
      {!selectedElement && <FormsElementSidebar />}
      {selectedElement && <PropertiesSidebar />}
    </div>
  );
};

export default DesignedBar;
