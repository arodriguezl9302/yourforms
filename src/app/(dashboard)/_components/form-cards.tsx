import { getForms } from "@/actions/form";
import React from "react";
import FormCard from "./form-card";

const FormCards = async () => {
  const forms = await getForms();
  return (
    <>
      {forms.map((form) => {
        return <FormCard key={form.id} form={form} />;
      })}
    </>
  );
};

export default FormCards;
