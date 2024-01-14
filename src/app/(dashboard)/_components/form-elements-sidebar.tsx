import React from "react";
import SideBarBtnElement from "./side-bar-btn-element";
import { FormElements } from "./form-elements";

const FormsElementSidebar = () => {
  return (
    <div>
      Elementos
      <SideBarBtnElement formElement={FormElements.TextField} />
    </div>
  );
};

export default FormsElementSidebar;
