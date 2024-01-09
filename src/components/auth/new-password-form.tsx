"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CardWrapper from "../shared/card-wrapper";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../shared/form-error";
import FormSuccess from "../shared/form-success";
import { NewPasswordSchema } from "@/schemas";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  // const route = useRouter();
  // const pathname = usePathname();
  const searchParams = useSearchParams();
  // const newParams = new URLSearchParams(searchParams.toString());
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    // setError("");
    // setSuccess("");
    // route.push(pathname);
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Nueva contraseña"
      backButtonLabel="Entrar"
      backButtonHref="/auth/login"
      showScocial={false}
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              disabled={isPending}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              disabled={isPending}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="*******" />
                  </FormControl>
                  <Button variant="link" asChild className="px-0">
                    <Link href="/auth/reset">Recuperar contraseña</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Cambiar
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
