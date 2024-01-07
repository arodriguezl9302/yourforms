import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface Props {
  message?: string;
}

const FormError: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 gap-x-2 rounded-md flex items-center text-sm text-destructive">
      <AiOutlineExclamationCircle className="h-5 w-5" />

      {message}
    </div>
  );
};

export default FormError;
