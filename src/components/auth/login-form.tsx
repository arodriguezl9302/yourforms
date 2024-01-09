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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../shared/form-error";
import { login } from "@/actions/login";
import FormSuccess from "../shared/form-success";
import Link from "next/link";

const LoginForm = () => {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const newParams = new URLSearchParams(searchParams.toString());
  var urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Ya existe otra cuenta con la misma dirección de correo electrónico"
      : "";

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    route.push(pathname);
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Bienvenido"
      backButtonLabel="No tienes cuenta?"
      backButtonHref="/auth/register"
      showScocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              disabled={isPending}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john.doe@yourforms.cu"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
