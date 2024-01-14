"use client";

import React, { useContext } from "react";
import { DesignerContext } from "../context/designer-context";

const useDesaignerContext = () => {
  const context = useContext(DesignerContext);

  if (!context)
    throw new Error("designer context se debe usar dentro del provider");

  return context;
};

export default useDesaignerContext;
