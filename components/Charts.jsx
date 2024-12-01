"use client";

import CompactCharts from "./CompactCharts";
import MiniChartSkeleton from "./ui/MiniChartSkeleton";
import dynamic from "next/dynamic";
const FullscreenCharts = dynamic(() => import("./FullscreenCharts"), {
  loading: () => (
    <div className="mt-20">
      <MiniChartSkeleton />
    </div>
  ),
});
import { useChartsStore } from "@/store/charts.store";

const Charts = () => {
  const { details } = useChartsStore();
  return <div>{!details ? <CompactCharts /> : <FullscreenCharts />}</div>;
};

export default Charts;
