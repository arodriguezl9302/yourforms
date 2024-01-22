"use client";

import React from "react";
import { FormElementInstance, FormElements } from "./form-elements";
import { Button } from "@/components/ui/button";

interface Props {
  formUrl: string;
  content: FormElementInstance[];
}

const FormSubmitComponent: React.FC<Props> = ({ formUrl, content }) => {
  return (
    <div className="flex w-full h-full items-center justify-center p-8">
      <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;

          return <FormElement key={element.id} elementInstance={element} />;
        })}

        <Button className="mt-8">Enviar</Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
