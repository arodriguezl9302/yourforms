import { getFormById } from "@/actions/form";
import React from "react";
import FormBuilder from "../../_components/form-builder";

interface Props {
  params: {
    id: string;
  };
}

const Builder: React.FC<Props> = async ({ params }) => {
  const { id } = params;
  const form = await getFormById(id);

  if (!form) {
    throw new Error("Formulario no encontrado");
  }

  return <FormBuilder form={form} />;
};

export default Builder;
