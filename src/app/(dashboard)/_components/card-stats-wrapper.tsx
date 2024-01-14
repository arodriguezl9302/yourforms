import { getFormsStats } from "@/actions/form";
import React from "react";
import StatsCards from "./stats-cards";

const CardStatsWrapper = async () => {
  const stats = await getFormsStats();
  return <StatsCards data={stats} loading={false} />;
};

export default CardStatsWrapper;
