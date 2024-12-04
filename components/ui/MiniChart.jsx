"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

const MiniChart = ({ chart, animationActive = true }) => {
  const router = useRouter();
  const { trimmedData, maxValue } = useMemo(() => {
    const lastIndex = chart.data.reduce((lastIndex, item, index) => {
      const hasValue = chart.globalSettings.lines.some(
        (line) => item[line.id || line.name] > 0
      );
      return hasValue ? index : lastIndex;
    }, -1);

    const trimmed = chart.data.slice(0, lastIndex + 1);
    const max = Math.max(
      ...trimmed.flatMap((item) =>
        chart.globalSettings.lines.map(
          (line) => item[line.id || line.name] || 0
        )
      )
    );

    return { trimmedData: trimmed, maxValue: max };
  }, [chart.data, chart.globalSettings.lines]);

  const gradientDefs = useMemo(
    () =>
      chart.globalSettings.lines
        .filter((line) => line.name !== null)
        .map((line) => (
          <linearGradient
            key={`${chart.id}-${line.id}`}
            id={`colorUv-${chart.id}-${line.id}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={line.color} stopOpacity={0.3} />
            <stop offset="80%" stopColor={line.color} stopOpacity={0} />
          </linearGradient>
        )),
    [chart.globalSettings.lines, chart.id]
  );

  return (
    <div
      onClick={() => router.push(`/chart/edit/${chart.id}`)}
      className={`mx-auto rounded-xl border border-base-content/10 bg-card p-4 duration-200 hover:drop-shadow-lg`}
    >
      <div className="text-base font-bold">{chart.globalSettings.title}</div>
      <ResponsiveContainer
        width="100%"
        height={100}
        className="pointer-events-none"
      >
        <AreaChart data={trimmedData}>
          <defs>{gradientDefs}</defs>
          <CartesianGrid
            strokeDasharray="3 3"
            strokeWidth={2}
            horizontal={false}
            vertical={false}
          />
          <YAxis hide domain={[0, maxValue * 1.5]} />
          {chart.globalSettings.lines
            .filter((line) => line.name !== null)
            .map((line) => (
              <Area
                key={`${chart.id}-${line.id}`}
                type={chart.miniChartSettings.type}
                dataKey={line.id}
                stroke={line.color}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#colorUv-${chart.id}-${line.id})`}
                isAnimationActive={animationActive}
              />
            ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniChart;
