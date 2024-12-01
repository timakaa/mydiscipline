"use client";

import { useState, useEffect, useMemo } from "react";
import { useChartsStore } from "@/store/charts.store";
import { moneyChartData } from "@/mocks/data";
import DetailChartSkeleton from "./ui/DetailChartSkeleton";
import DetailChart from "./ui/DetailChart";

const FullscreenCharts = () => {
  const { split } = useChartsStore();
  const [isLoading, setIsLoading] = useState(true);
  const charts = useMemo(
    () => [
      moneyChartData(),
      moneyChartData(),
      moneyChartData(),
      moneyChartData(),
      moneyChartData(),
    ],
    []
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
                data: chart,
                globalSettings: {
                  lines: [
                    { id: "2", name: "Maximum", color: "#ff3737" },
                    { id: "1", name: "Actual", color: "#3794FF" },
                    { id: "3", name: null, color: "#379400" },
                  ],
                  title: "Chart",
                  tooltipFormatter: "formatNone",
                },
                chartSettings: {
                  horizontal: false,
                  vertical: false,
                  type: "monotone",
                },
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
