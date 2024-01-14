import React from "react";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import { LuView } from "react-icons/lu";
import { FaEdit, FaWpforms } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BiRightArrowAlt } from "react-icons/bi";

interface Props {
  form: Form;
}

const FormCard: React.FC<Props> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Publicado</Badge>}
          {!form.published && <Badge variant="destructive">Borrador</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          Creado{" "}
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
            locale: es,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-blue-500" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-yellow-500" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] translate text-sm text-muted-foreground">
        {form.description || "Sin descripción"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 gap-4">
            <Link href={`/forms/${form.id}`}>
              Ver datos <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild className="w-full mt-2 gap-4">
            <Link href={`/builder/${form.id}`}>
              Editar <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCard;
