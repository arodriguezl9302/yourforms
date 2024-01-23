"use client";

import React, {
  startTransition,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";
import { FormElementInstance, FormElements } from "./form-elements";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { formSubmission } from "@/actions/form";

interface Props {
  formUrl: string;
  content: FormElementInstance[];
}

const FormSubmitComponent: React.FC<Props> = ({ formUrl, content }) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Formulario no válido",
        description: "Por favor, comprueba los datos del formulario",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await formSubmission(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error al enviasr el formulario",
        description: "Ups! el formulario no pude ser enviado",
        variant: "destructive",
      });
    }

    // console.log("form values: ", formValues.current);
  };

  if (submitted) {
    return (
      <div className="w-full h-full flex justify-center items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded">
          <h1 className="text-2xl font-bold">Formulario enviado</h1>
          <p className="text-muted-foreground">
            ¡Gracias por completar el formulario!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full items-center justify-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;

          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}

        <Button
          disabled={pending}
          className="mt-8"
          onClick={(e) => {
            e.preventDefault();
            startTransition(submitForm);
          }}
        >
          {pending ? <ImSpinner2 className="animate-spin" /> : "Enviar"}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
