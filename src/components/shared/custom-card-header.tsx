"use client";

import React from "react";

interface Props {
  label: string;
  subLabel?: string;
}

const CustomCardHeader: React.FC<Props> = ({ label, subLabel }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-semibold">{label}</h1>
      {subLabel && <p className="text-md text-gray-400">{subLabel}</p>}
    </div>
  );
};

export default CustomCardHeader;
