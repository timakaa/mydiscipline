"use client";

import CompactCharts from "./CompactCharts";
import FullscreenCharts from "./FullscreenCharts";
import { useChartsStore } from "@/app/store/charts.store";

const Charts = () => {
  const { details } = useChartsStore();
  return <div>{!details ? <CompactCharts /> : <FullscreenCharts />}</div>;
};

export default Charts;
