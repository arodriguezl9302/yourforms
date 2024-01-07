"use client";

import React from "react";

interface Props {
  label: string;
}

const CustomCardHeader: React.FC<Props> = ({ label }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-semibold">{label}</h1>
    </div>
  );
};

export default CustomCardHeader;
