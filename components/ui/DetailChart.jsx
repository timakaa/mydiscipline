"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Brush,
} from "recharts";
import { formatters } from "@/lib/chartTooltipFormatters";
import { useState, useMemo } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

const DetailChart = ({ chart, animationActive = true }) => {
  const router = useRouter();
  const marginLeft = useMemo(() => {
    switch (chart.globalSettings.tooltipFormatter) {
      case "formatDollar":
      case "formatPercentage":
        return 30;
      default:
        return 20;
    }
  }, [chart.globalSettings.tooltipFormatter]);

  const defaultBrushIndices = useMemo(
    () => ({
      startIndex: 0,
      endIndex: Math.floor(chart.data.length * 0.99999999),
    }),
    [chart.data.length]
  );

  const [brushIndices, setBrushIndices] = useState(defaultBrushIndices);

  const { maxValue, monthLabels } = useMemo(() => {
    const max = Math.max(
      ...chart.data.flatMap((item) =>
        chart.globalSettings.lines.map(
          (line) => item[line.id || line.name] || 0
        )
      )
    );

    const labels = [...new Set(chart.data.map((item) => item.name))];

    return { maxValue: max, monthLabels: labels };
  }, [chart.data, chart.globalSettings.lines]);

  const yAxisTicks = useMemo(() => {
    const roundedMax = Math.round((maxValue * 1.5) / 10) * 10;
    return [
      0,
      Math.round((maxValue * 0.5) / 10) * 10,
      Math.round(maxValue / 10) * 10,
      roundedMax,
    ];
  }, [maxValue]);

  return (
    <div className="flex flex-col items-center rounded-xl border border-base-content/10 bg-card pt-6 shadow-sm duration-200 hover:drop-shadow-lg">
      <div className="mb-4 flex items-center gap-x-2">
        <div className="text-center text-xl font-bold">
          {chart.globalSettings.title}
        </div>
        {chart.id && (
          <button
            className="btn-simple btn p-3"
            onClick={() => router.push(`/chart/edit/${chart.id}`)}
          >
            <Pencil size={16} />
          </button>
        )}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chart.data}
          margin={{
            top: 10,
            right: 50,
            left: marginLeft,
            bottom: 50,
          }}
        >
          <defs>
            {chart.globalSettings.lines
              .filter((line) => line.name !== null)
              .map((line, index) => (
                <linearGradient
                  key={index}
                  id={`colorUv${index + 1}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={line.color} stopOpacity={0.3} />
                  <stop offset="80%" stopColor={line.color} stopOpacity={0} />
                </linearGradient>
              ))}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            strokeWidth={2}
            opacity={0.4}
            horizontal={chart.chartSettings.horizontal}
            vertical={chart.chartSettings.vertical}
          />
          <XAxis
            dataKey="name"
            strokeWidth={2}
            textAnchor="middle"
            tick={{
              fontSize: 12,
              fontWeight: "bold",
            }}
            ticks={monthLabels}
          />
          <YAxis
            key={maxValue}
            strokeWidth={2}
            tick={{
              fontSize: 12,
              fontWeight: "bold",
            }}
            domain={[0, yAxisTicks[3]]}
            allowDataOverflow={false}
            ticks={yAxisTicks}
            interval={0}
            tickFormatter={formatters[chart.globalSettings.tooltipFormatter]}
          />
          <Tooltip
            content={({ payload, label }) => {
              if (payload && payload.length) {
                return (
                  <div className="rounded-lg border-[1px] border-neutral-500/30 bg-card p-4">
                    <div className="text-sm font-bold">
                      {payload[0]?.payload.fullDate}
                    </div>
                    {payload.map((entry, index) => (
                      <div key={index}>
                        <span>{chart.globalSettings.lines[index].name}:</span>{" "}
                        <span
                          style={{ color: entry.color }}
                          className="font-bold"
                        >
                          {formatters[chart.globalSettings.tooltipFormatter](
                            entry.value
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
          {chart.globalSettings.lines
            .filter((line) => line.name !== null)
            .map((line, index) => (
              <Area
                key={index}
                type={chart.chartSettings.type}
                dataKey={line.id}
                stroke={line.color}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#colorUv${index + 1})`}
                isAnimationActive={animationActive}
              />
            ))}
          <Brush
            dataKey="name"
            height={20}
            startIndex={brushIndices.startIndex}
            endIndex={brushIndices.endIndex}
            onChange={({ startIndex, endIndex }) =>
              setBrushIndices({ startIndex, endIndex })
            }
            tickFormatter={() => ""}
            fill="var(--base-100)"
            fillOpacity={0.3}
          >
            <AreaChart data={chart.data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                horizontal={false}
              />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              {chart.globalSettings.lines
                .filter((line) => line.name !== null)
                .map((line, index) => (
                  <Area
                    key={index}
                    type={chart.chartSettings.type}
                    dataKey={line.id}
                    stroke={line.color}
                    strokeWidth={1}
                    fillOpacity={1}
                    fill={`url(#colorUv${index + 1})`}
                    isAnimationActive={animationActive}
                  />
                ))}
            </AreaChart>
          </Brush>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DetailChart;
