import React from "react";
import SideBarBtnElement from "./side-bar-btn-element";
import { FormElements } from "./form-elements";
import { Separator } from "@/components/ui/separator";

const FormsElementSidebar = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">Elementos</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 gap-y-5 place-items-center">
        {" "}
        {/* place-items-center */}
        <p className="text-sm text-muted-foreground place-self-start col-span-2 my-2">
          Elementos generales
        </p>
        <SideBarBtnElement formElement={FormElements.TitleField} />
        <SideBarBtnElement formElement={FormElements.SubTitleField} />
        <SideBarBtnElement formElement={FormElements.ParagraphField} />
        <p className="text-sm text-muted-foreground place-self-start col-span-2 my-2">
          Elementos de formularios
        </p>
        <SideBarBtnElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
};

export default FormsElementSidebar;
