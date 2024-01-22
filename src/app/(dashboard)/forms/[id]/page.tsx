import { getFormById } from "@/actions/form";
import React from "react";
import FormBuilder from "../../_components/form-builder";
import VisitBtn from "../../_components/visit-btn";
import FormLinkShare from "../../_components/form-link-share";
import StatsCard from "../../_components/stats-card";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import SubmissionsTable from "../../_components/submissions-table";

interface Props {
  params: {
    id: string;
  };
}

const Detail: React.FC<Props> = async ({ params }) => {
  const { id } = params;
  const form = await getFormById(id);

  if (!form) {
    throw new Error("Formulario no encontrado");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bouceRate = 100 - submissionRate;

  return (
    <div className="w-full pt-4 px-2 sm:px-20">
      <>
        <div className="py-2 border-b border-muted">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold truncate">{form.name}</h1>
            <VisitBtn sharedUrl={form.sharedUrl} />
          </div>
        </div>
        <div className="py-2 border-b border-muted">
          <div className="flex gap-2 items-center justify-between">
            <FormLinkShare sharedUrl={form.sharedUrl} />
          </div>
        </div>
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Visitas totales"
            icon={<LuView className="text-blue-500" />}
            helperText="Todas las visitas hasta el momento"
            value={visits.toLocaleString() || ""}
            loading={false}
            className="shadow-md shadow-blue-600"
          />
          <StatsCard
            title="Total de enviado"
            icon={<FaWpforms className="text-yellow-500" />}
            helperText="Todas las envios hasta el momento"
            value={submissions.toLocaleString() || ""}
            loading={false}
            className="shadow-md shadow-yellow-600"
          />
          <StatsCard
            title="Enviados por visitas"
            icon={<HiCursorClick className="text-gree-500" />}
            helperText="Todas los enviado por visitas hasta el momento"
            value={submissionRate.toLocaleString() + "%" || ""}
            loading={false}
            className="shadow-md shadow-green-600"
          />
          <StatsCard
            title="No enviados"
            icon={<TbArrowBounce className="text-red-500" />}
            helperText="Visitas en las que no se envio el formulario"
            value={bouceRate.toLocaleString() + "%" || ""}
            loading={false}
            className="shadow-md shadow-red-600"
          />
        </div>
        <div className="pt-10">
          <SubmissionsTable id={form.id} />
        </div>
      </>
    </div>
  );
};

export default Detail;
