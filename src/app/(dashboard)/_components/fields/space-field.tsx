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
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "@/components/ui/slider";

const type: ElementsType = "SpaceField";

const extraAttributes = {
  height: 20, //"Título",
};

const propertiesSchema = z.object({
  height: z
    .number()
    .min(5, { message: "El alto debe de ser de al menos 2px" })
    .max(200),
});

export const SpaceFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    label: "Espacio",
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
  const { title } = element.extraAttributes;

  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      height: 20,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [form, element]);

  function applyChange(values: z.infer<typeof propertiesSchema>) {
    const { height } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height,
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
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alto {form.watch("height")}(px)</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    min={5}
                    max={200}
                    onValueChange={(value) => {
                      field.onChange(value[0]);
                    }}
                  />
                  {/* <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  /> */}
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
  const { height } = element.extraAttributes;

  return (
    <div className="flex flex-col w-full gap-2 items-center">
      <p className="text-muted-foreground">Epsacio {height}px</p>
      <LuSeparatorHorizontal className="w-8 h-8" />
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

  const { height } = element.extraAttributes;

  return <div style={{ height, width: "100%" }}></div>;
}
