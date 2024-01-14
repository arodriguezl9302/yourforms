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
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
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
      login(values)
        .then((data) => {
          if (data?.error) {
            // form.reset();
            setError(data?.error);
          }

          if (data?.success) {
            // form.reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            // form.reset();
            setShowTwoFactor(true);
          }
        })
        .catch((error) => setError("Ups! error inesperado"));
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
            {showTwoFactor && (
              <FormField
                control={form.control}
                disabled={isPending}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código 2Fa</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                        <Input
                          {...field}
                          type="password"
                          placeholder="*******"
                        />
                      </FormControl>
                      <Button variant="link" asChild className="px-0">
                        <Link href="/auth/reset">Recuperar contraseña</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirmar" : "Entrar"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
