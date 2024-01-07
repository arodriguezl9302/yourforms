"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import CustomCardHeader from "./custom-card-header";
import Social from "../auth/social";
import BackButton from "./back-button";

interface Props {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showScocial: boolean;
}

const CardWrapper: React.FC<Props> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showScocial,
}) => {
  return (
    <Card className="w-[380px] sm:w-[400px] shadow-md">
      <CardHeader>
        <CustomCardHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showScocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {backButtonHref && backButtonLabel && (
        <CardFooter>
          <BackButton href={backButtonHref} label={backButtonLabel} />
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
