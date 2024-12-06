"use client";

import { useChartsStore } from "@/store/charts.store";
import DetailChartSkeleton from "./ui/DetailChartSkeleton";
import DetailChart from "./ui/DetailChart";
import useWindowSize from "@/hooks/useWindowSize";

const FullscreenCharts = ({ charts, isLoading }) => {
  const { split } = useChartsStore();
  const windowSize = useWindowSize();

  return (
    <>
      {isLoading ? (
        <DetailChartSkeleton />
      ) : (
        <div
          className={`mt-20 grid gap-4 ${
            split && windowSize.width > 768 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {charts.map((chart, index) => (
            <DetailChart
              key={index}
              chart={{
                id: chart.id,
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
