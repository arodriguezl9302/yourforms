import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface Props {
  message?: string;
}

const FormSuccess: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 gap-x-2 rounded-md flex items-center text-sm text-emerald-500">
      <AiOutlineCheckCircle className="h-5 w-5" />

      {message}
    </div>
  );
};

export default FormSuccess;
