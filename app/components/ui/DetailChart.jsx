"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatters } from "@/app/lib/chartTooltipFormatters";
import { useState, useEffect } from "react";

const DetailChart = ({ chart, animationActive = true }) => {
  const [marginLeft, setMarginLeft] = useState(10);
  const maxValue = Math.max(
    ...chart.data.flatMap((item) =>
      chart.globalSettings.lines.map((line) => item[line.name] || 0),
    ),
  );

  useEffect(() => {
    switch (chart.globalSettings.tooltipFormatter) {
      case "formatDollar":
        setMarginLeft(20);
        break;
      case "formatPercentage":
        setMarginLeft(20);
        break;
      default:
        setMarginLeft(10);
    }
  }, [chart.globalSettings.tooltipFormatter]);

  // Group data points by month for X-axis
  const monthLabels = [...new Set(chart.data.map((item) => item.name))];

  return (
    <div className='bg-card border shadow-sm hover:drop-shadow-lg duration-200 border-base-content/10 rounded-xl p-4 pt-6 flex flex-col items-center'>
      <div className='text-xl font-bold mb-4 text-center'>
        {chart.globalSettings.title}
      </div>
      <ResponsiveContainer width='100%' height={400}>
        <AreaChart
          data={chart.data}
          margin={{
            top: 10,
            right: 30,
            left: marginLeft,
            bottom: 50,
          }}
        >
          <defs>
            {chart.globalSettings.lines.map((line, index) => (
              <linearGradient
                key={index}
                id={`colorUv${index + 1}`}
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='0%' stopColor={line.color} stopOpacity={0.3} />
                <stop offset='80%' stopColor={line.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            strokeDasharray='3 3'
            strokeWidth={2}
            opacity={0.4}
            horizontal={chart.chartSettings.horizontal}
            vertical={chart.chartSettings.vertical}
          />
          <XAxis
            dataKey='name'
            strokeWidth={2}
            angle={-45}
            textAnchor='end'
            interval='preserveStartEnd'
            tick={{
              fontSize: 12,
              dy: 20,
              fontWeight: "bold",
            }}
            height={60}
            ticks={monthLabels}
          />
          <YAxis
            strokeWidth={2}
            tick={{
              fontSize: 12,
              fontWeight: "bold",
            }}
            domain={[0, maxValue * 2]}
            allowDataOverflow={false}
            ticks={[
              0,
              Math.round((maxValue * 0.5) / 10) * 10,
              Math.round((maxValue * 1) / 10) * 10,
              Math.round((maxValue * 1.5) / 10) * 10,
              Math.round((maxValue * 2) / 10) * 10,
            ]}
            interval='preserveEnd'
            tickFormatter={formatters[chart.globalSettings.tooltipFormatter]}
          />
          <Tooltip
            content={({ payload, label }) => {
              if (payload && payload.length) {
                return (
                  <div className='bg-card rounded-lg border-neutral-500/30 p-4 border-[1px]'>
                    <div className='text-sm font-bold'>
                      {payload[0]?.payload.fullDate}
                    </div>
                    {payload.map((entry, index) => (
                      <div key={index}>
                        <span>{entry.name}:</span>{" "}
                        <span
                          style={{ color: entry.color }}
                          className='font-bold'
                        >
                          {formatters[chart.globalSettings.tooltipFormatter](
                            entry.value,
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          {chart.globalSettings.lines.map((line, index) => (
            <Area
              key={index}
              type={chart.chartSettings.type}
              dataKey={line.name}
              stroke={line.color}
              strokeWidth={3}
              fillOpacity={1}
              fill={`url(#colorUv${index + 1})`}
              isAnimationActive={animationActive}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DetailChart;
