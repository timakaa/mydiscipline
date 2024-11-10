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
        <div
          className='bg-card border shadow-sm hover:drop-shadow-lg duration-200 border-base-content/10 rounded-xl pl-0 p-6'
          key={index}
        >
          <div className='text-xl font-bold mb-4 text-center'>Revenue</div>
          <ResponsiveContainer width='100%' height={400}>
            <AreaChart data={chart}>
              <defs>
                <linearGradient id='colorUv2' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#ff3737' stopOpacity={0.3} />
                  <stop offset='80%' stopColor='#ff3737' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='colorUv1' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#3794FF' stopOpacity={0.3} />
                  <stop offset='80%' stopColor='#3794FF' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='3 3'
                strokeWidth={2}
                // horizontal={false}
              />
              <XAxis
                dataKey='name'
                strokeWidth={2}
                angle={-45}
                textAnchor='end'
                height={100}
                interval={"auto"}
                tick={{
                  fontSize: 14,
                  dy: 10,
                  fontWeight: "bold",
                }}
              />
              <YAxis
                strokeWidth={2}
                width={80}
                tick={{
                  fontSize: 14,
                  fontWeight: "bold",
                }}
                domain={[0, "auto"]}
                tickFormatter={formatDollar}
              />
              <Tooltip
                content={({ payload, label }) => {
                  if (payload && payload.length) {
                    return (
                      <div className='bg-card rounded-lg border-neutral-500/50 p-2 border-[2px]'>
                        <div className='text-sm font-bold'>{label}</div>
                        {payload.map((entry, index) => (
                          <div key={index}>
                            <span>{entry.name}:</span>{" "}
                            <span
                              style={{ color: entry.color }}
                              className='font-bold'
                            >
                              {formatDollar(entry.value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                // type='monotone'
                dataKey='max'
                stroke='#ff3737'
                strokeWidth={3}
                fillOpacity={1}
                fill='url(#colorUv2)'
              />
              <Area
                // type='monotone'
                dataKey='actual'
                stroke='#3794FF'
                strokeWidth={3}
                fillOpacity={1}
                fill='url(#colorUv1)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default FullscreenCharts;
