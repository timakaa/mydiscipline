"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer } from "recharts";

const MiniChart = ({ chart, animationActive = true }) => {
  return (
    <div
      className={`bg-card border hover:drop-shadow-lg duration-200 border-base-content/10 rounded-xl p-4 mx-auto`}
    >
      <div className='text-base font-bold'>{chart.globalSettings.title}</div>
      <ResponsiveContainer
        width='100%'
        height={100}
        className='pointer-events-none'
      >
        <AreaChart data={chart.data}>
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
            horizontal={false}
            vertical={false}
          />
          {chart.globalSettings.lines.map((line, index) => (
            <Area
              key={index}
              type={chart.miniChartSettings.type}
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

export default MiniChart;
