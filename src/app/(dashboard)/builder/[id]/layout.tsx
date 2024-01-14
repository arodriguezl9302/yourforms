import React from "react";

interface Props {
  children: React.ReactNode;
}

const BuilderLayout: React.FC<Props> = ({ children }) => {
  return <div className="w-full flex flex-grow mx-auto">{children}</div>;
};

export default BuilderLayout;
