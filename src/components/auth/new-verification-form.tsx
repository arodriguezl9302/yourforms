"use client";

import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "../shared/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useEffectOnce } from "use-effect-once";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/data/new-verification";
import FormError from "../shared/form-error";
import FormSuccess from "../shared/form-success";

const NewVerificationForm = () => {
  const searchparame = useSearchParams();
  const token = searchparame.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) return;

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch((err) => {
        setError("Algo salio mal, no pudimos verificar su cuenta");
      });
  }, [token, success, error]);

  useEffectOnce(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Cuenta verificada"
      backButtonLabel="Entrar"
      backButtonHref="/auth/login"
      showScocial={false}
    >
      <div className="flex flex-col gap-y-4 items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {!success && <FormError message={error} />}
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
