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
import { useState, useEffect } from "react";
import { getCharts } from "@/app/actions/chartActions";

const Charts = () => {
  const { details } = useChartsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setIsLoading(true);
        const { charts } = await getCharts();
        setData(charts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharts();
  }, []);
  return (
    <div>
      {!details ? (
        <CompactCharts charts={data} isLoading={isLoading} />
      ) : (
        <FullscreenCharts charts={data} isLoading={isLoading} />
      )}
    </div>
  );
};

export default Charts;
