import React from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import StatsCard from "./stats-card";
import { getFormsStats } from "@/actions/form";

interface Props {
  data?: Awaited<ReturnType<typeof getFormsStats>>;
  loading: boolean;
}

const StatsCards: React.FC<Props> = ({ data, loading }) => {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Visitas totales"
        icon={<LuView className="text-blue-500" />}
        helperText="Todas las visitas hasta el momento"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total de enviado"
        icon={<FaWpforms className="text-yellow-500" />}
        helperText="Todas las envios hasta el momento"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Enviados por visitas"
        icon={<HiCursorClick className="text-gree-500" />}
        helperText="Todas los enviado por visitas hasta el momento"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="No enviados"
        icon={<TbArrowBounce className="text-red-500" />}
        helperText="Visitas en las que no se envio el formulario"
        value={data?.bouceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
};
export default StatsCards;
