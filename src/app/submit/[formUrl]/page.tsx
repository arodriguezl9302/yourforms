import { getFormContentFromUrl } from "@/actions/form";
import { FormElementInstance } from "@/app/(dashboard)/_components/form-elements";
import FormSubmitComponent from "@/app/(dashboard)/_components/form-submit-component";
import React from "react";

interface Props {
  params: {
    formUrl: string;
  };
}

const SubmitPage: React.FC<Props> = async ({ params }) => {
  const form = await getFormContentFromUrl(params.formUrl);

  if (!form) {
    throw new Error("Formulario no encontrado");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <div className="w-full pt-4 px-2 sm:px-20">
      <FormSubmitComponent formUrl={params.formUrl} content={formContent} />
    </div>
  );
};

export default SubmitPage;
