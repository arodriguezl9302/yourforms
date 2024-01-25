"use client";

import { MdTextFields } from "react-icons/md";
import * as z from "zod";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../form-elements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesaignerContext from "../../hooks/use-designer-context";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
  text: "Texto aquí",
};

const propertiesSchema = z.object({
  text: z
    .string()
    .min(2, { message: "El título debe contener al menos 2 caracteres" })
    .max(500),
});

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsTextParagraph,
    label: "Parágrafo",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement } = useDesaignerContext();
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      text: text,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [form, element]);

  function applyChange(values: z.infer<typeof propertiesSchema>) {
    const { text } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onBlur={form.handleSubmit(applyChange)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            // disabled={isPending}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  La etiqueta que se va a mostrar en el campo de texto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirmar" : "Entrar"}
          </Button> */}
      </form>
    </Form>
  );
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  return (
    <div className="flex flex-col w-full gap-2">
      <p className="text-muted-foreground">Párrafo</p>
      <p>{text}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
}) {
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;

  return <p>{text}</p>;
}
