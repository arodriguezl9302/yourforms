import React from "react";
import BackButton from "./back-button";
import CustomCardHeader from "./custom-card-header";
import { Card, CardFooter, CardHeader } from "../ui/card";

const ErrorCard = () => {
  return (
    <Card>
      <CardHeader>
        <CustomCardHeader
          label="Inicio de session"
          subLabel="Ops! algo salio mal"
        />
      </CardHeader>
      <CardFooter>
        <BackButton href="/auth/login" label="Regresar al login" />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
