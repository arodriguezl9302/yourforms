import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ImSpinner2 className="animate-spin w-12 h-12" />
    </div>
  );
};

export default Loading;
