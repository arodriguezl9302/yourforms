"use client";

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
import { Bs123 } from "react-icons/bs";

const type: ElementsType = "NumberField";

const extraAttributes = {
  label: "Campo numérico",
  helperText: "Texto de ayuda",
  required: false,
  placeHolder: "0",
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
    message: "El placeholder debe contener máximo 50 caracteres",
  }),
});

export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: Bs123,
    label: "Campo numérico",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
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
      <Input readOnly disabled type="number" placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const { label, placeHolder, required, helperText } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col w-full gap-2">
      <Label className={cn("text-primary", error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Input
        className={cn(error && "border-red-500")}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = NumberFieldFormElement.validate(
            element,
            e.target.value
          );
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
        type="number"
      />
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
