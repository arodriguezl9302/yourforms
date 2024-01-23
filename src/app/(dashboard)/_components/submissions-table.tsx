import React, { ReactNode } from "react";
import { getFormWithSubmissions } from "@/actions/form";
import { ElementsType, FormElementInstance } from "./form-elements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";

interface Props {
  id: string;
}

type Row = { [key: string]: string } & {
  submittedAt: Date;
};
const SubmissionsTable: React.FC<Props> = async ({ id }) => {
  const form = await getFormWithSubmissions(id);

  if (!form) {
    throw new Error("Formulario no econtrado");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: string;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;

      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.formSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold py-4">Datos recopilados</h1>
      <div className="rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead className="uppercase" key={column.id}>
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Enviado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SubmissionsTable;

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  return <TableCell>{node}</TableCell>;
}
