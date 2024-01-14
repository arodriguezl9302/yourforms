import { Suspense } from "react";
import CardStatsWrapper from "../_components/card-stats-wrapper";
import StatsCards from "../_components/stats-cards";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "../_components/create-form-button";
import FormCardSkeleton from "../_components/form-card-skeleton";
import FormCards from "../_components/form-cards";

const HomePage = () => {
  return (
    <div className="w-full pt-4 px-2 sm:px-20">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Tus formularios</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
