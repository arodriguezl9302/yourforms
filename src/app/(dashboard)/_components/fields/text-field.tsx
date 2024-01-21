"use client";

import { MdTextFields } from "react-icons/md";
import * as z from "zod";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../form-elements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Campo de texto",
  helperText: "Texto de ayuda",
  required: false,
  placeHolder: "Placeholder",
};

const propertiesSchema = z.object({
  label: z
    .string()
    .min(2, { message: "El label debe contener al menos 2 caracteres" })
    .max(50),
  helperText: z.string().max(200, {
    message: "El texto de ayuda debe contener máximo 200 caracteres",
  }),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50, {
    message: "El texto de ayuda debe contener máximo 50 caracteres",
  }),
});

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Campo de texto",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
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
  const { label, placeHolder, required, helperText } = element.extraAttributes;

  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: label,
      helperText: helperText,
      placeHolder: placeHolder,
      required: required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [form, element]);

  function applyChange(values: z.infer<typeof propertiesSchema>) {
    const { label, helperText, required, placeHolder } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        placeHolder,
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
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
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
          <FormField
            control={form.control}
            // disabled={isPending}
            name="placeHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PlaceHolder</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  El placeHolder que se va a mostrar en el campo de texto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            // disabled={isPending}
            name="helperText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Texto de ayuda</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  El texto de ayuda que se va a mostrar debajo del campo de
                  texto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            // disabled={isPending}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg p-3 shadow-sm border">
                <div className="space-y-0.5">
                  <FormLabel>Requerido</FormLabel>
                  <FormDescription>
                    Este campo de texto sera requerido cuando se muestre el
                    formulario?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
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
  const { label, placeHolder, required, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-primary">
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, placeHolder, required, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-primary">
        {label}
        {required && "*"}
      </Label>
      <Input placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}
