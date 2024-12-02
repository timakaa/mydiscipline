"use client";

import { useChartsStore } from "@/store/charts.store";
import DetailChartSkeleton from "./ui/DetailChartSkeleton";
import DetailChart from "./ui/DetailChart";

const FullscreenCharts = ({ charts, isLoading }) => {
  const { split } = useChartsStore();

  return (
    <>
      {isLoading ? (
        <DetailChartSkeleton />
      ) : (
        <div
          className={`mt-20 grid gap-4 ${split ? "grid-cols-2" : "grid-cols-1"}`}
        >
          {charts.map((chart, index) => (
            <DetailChart
              key={index}
              chart={{
                data: chart.data,
                globalSettings: chart.globalSettings,
                chartSettings: chart.chartSettings,
                miniChartSettings: chart.miniChartSettings,
              }}
              animationActive={false}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FullscreenCharts;
