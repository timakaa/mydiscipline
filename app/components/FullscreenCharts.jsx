"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useChartsStore } from "@/app/store/charts.store";
import { moneyChartData } from "@/app/mocks/data";
import DetailChart from "./ui/DetailChart";
import { formatDollar } from "@/app/lib/chartTooltipFormatters";

const FullscreenCharts = () => {
  const { split } = useChartsStore();
  const [charts, setCharts] = useState([
    moneyChartData(),
    moneyChartData(),
    moneyChartData(),
    moneyChartData(),
    moneyChartData(),
  ]);

  console.log(charts);

  return (
    <div
      className={`gap-4 mt-20 grid ${split ? "grid-cols-2" : "grid-cols-1"}`}
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
  );
};

export default FullscreenCharts;
