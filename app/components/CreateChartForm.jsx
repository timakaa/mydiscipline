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
import { moneyChartData } from "@/app/mocks/data";
import { formatDollar } from "@/app/lib/chartTooltipFormatters";
import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, Eraser, Square } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateChartForm = () => {
  const [data, setData] = useState(moneyChartData());
  const router = useRouter();
  const [title, setTitle] = useState("Chart");
  const [globalSettings, setGlobalSettings] = useState({
    lines: [
      { name: "max", color: "#ff3737" },
      { name: "actual", color: "#3794FF" },
    ],
  });
  const [chartSettings, setChartSettings] = useState({
    horizontal: true,
    vertical: true,
    type: "linear",
  });
  const [miniChartSettings, setMiniChartSettings] = useState({
    type: "linear",
  });

  const handleLineChange = (e, index) => {
    setGlobalSettings((prev) => ({
      ...prev,
      lines: prev.lines.map((line, i) =>
        i === index ? { ...line, name: e.target.value } : line,
      ),
    }));
  };

  const handleLineColorChange = (e, index) => {
    setGlobalSettings((prev) => ({
      ...prev,
      lines: prev.lines.map((line, i) =>
        i === index ? { ...line, color: e.target.value } : line,
      ),
    }));
  };

  const handleLineRemove = (index) => {
    setGlobalSettings((prev) => ({
      ...prev,
      lines: prev.lines.filter((_, i) => i !== index),
    }));
  };

  const handleLineAdd = () => {
    if (globalSettings.lines.length >= 3) return;

    setGlobalSettings((prev) => ({
      ...prev,
      lines: [...prev.lines, { name: "New Line", color: "#f59e0b" }],
    }));
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        className='btn group flex items-center gap-x-1 btn-simple py-2 mb-4'
      >
        <span className='group-hover:-translate-x-1 transition-transform'>
          <ArrowLeft size={16} />
        </span>
        <span>Back</span>
      </button>
      <div className='bg-card mb-6 border shadow-sm hover:drop-shadow-lg duration-200 border-base-content/10 rounded-xl pl-0 p-6'>
        <div className='text-xl font-bold mb-4 text-center'>{title}</div>
        <ResponsiveContainer width='100%' height={400}>
          <AreaChart data={data}>
            <defs>
              {globalSettings.lines.map((line, index) => (
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
              horizontal={chartSettings.horizontal}
              vertical={chartSettings.vertical}
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
            {globalSettings.lines.map((line, index) => (
              <Area
                key={index}
                type={chartSettings.type}
                dataKey={line.name}
                stroke={line.color}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#colorUv${index + 1})`}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div
        className={`bg-card border hover:drop-shadow-lg duration-200 border-base-content/10 rounded-xl p-4 max-w-[300px] mx-auto`}
      >
        <div className='text-base font-bold'>{title}</div>
        <ResponsiveContainer
          width='100%'
          height={100}
          className='pointer-events-none'
        >
          <AreaChart data={data}>
            <defs>
              {globalSettings.lines.map((line, index) => (
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
            {globalSettings.lines.map((line, index) => (
              <Area
                key={index}
                type={miniChartSettings.type}
                dataKey={line.name}
                stroke={line.color}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#colorUv${index + 1})`}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className='text-xl font-bold mt-10 text-center mb-4'>
        Global Settings
      </div>
      <div className='flex flex-col gap-y-4 items-center'>
        <div className='flex flex-col items-start'>
          <div className='text-base font-semibold mb-1'>Title</div>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input input-bordered w-screen max-w-xs'
          />
        </div>
        <div>
          <div className='text-base font-semibold mb-1'>Lines</div>
          <div className='flex flex-col gap-y-2 max-w-xs w-screen'>
            {globalSettings.lines.map((line, index) => (
              <div key={index} className='flex items-center gap-x-2'>
                <input
                  type='text'
                  value={line.name}
                  onChange={(e) => handleLineChange(e, index)}
                  className='input input-bordered w-full min-h-5 h-auto py-2'
                />
                <input
                  type='color'
                  value={line.color}
                  onChange={(e) => handleLineColorChange(e, index)}
                  className='btn py-4'
                  style={{
                    backgroundColor: line.color,
                  }}
                />
                <button
                  onClick={() => handleLineRemove(index)}
                  className='btn text-white btn-error py-2'
                >
                  <Eraser />
                </button>
              </div>
            ))}
            {globalSettings.lines.length < 3 && (
              <div>
                <button
                  onClick={() => handleLineAdd()}
                  className='btn btn-primary py-3 w-full'
                >
                  Add Line
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 place-items-center items-start mt-4 w-full'>
        <div>
          <h2 className='text-xl font-bold'>Detail Chart</h2>
          <div className='mt-4'>
            <ul className='space-y-3'>
              <li className='flex items-center gap-x-2'>
                <span>
                  <input
                    type='checkbox'
                    className='toggle'
                    onChange={() =>
                      setChartSettings((prev) => ({
                        ...prev,
                        horizontal: !prev.horizontal,
                      }))
                    }
                    checked={chartSettings.horizontal}
                  />
                </span>
                <span
                  className={`font-semibold ${
                    !chartSettings.horizontal ? "text-neutral-500" : ""
                  }`}
                >
                  Horizontal
                </span>
              </li>
              <li className='flex items-center gap-x-2'>
                <span>
                  <input
                    type='checkbox'
                    className='toggle'
                    onChange={() =>
                      setChartSettings((prev) => ({
                        ...prev,
                        vertical: !prev.vertical,
                      }))
                    }
                    checked={chartSettings.vertical}
                  />
                </span>
                <span
                  className={`font-semibold ${
                    !chartSettings.vertical ? "text-neutral-500" : ""
                  }`}
                >
                  Vertical
                </span>
              </li>
              <li className='flex flex-col gap-y-1'>
                <div className='text-sm font-semibold'>Type</div>
                <select
                  className='select select-bordered w-40 text-sm'
                  value={chartSettings.type}
                  onChange={(e) =>
                    setChartSettings((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                >
                  <option value='linear'>Linear</option>
                  <option value='monotone'>Monotone</option>
                  <option value='natural'>Natural</option>
                  <option value='stepAfter'>Step</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className='text-xl font-bold'>Mini Chart</h2>
          <div className='mt-4'>
            <ul className='space-y-3'>
              <li className='flex flex-col gap-y-1'>
                <div className='text-sm font-semibold'>Type</div>
                <select
                  className='select select-bordered w-40 text-sm'
                  value={miniChartSettings.type}
                  onChange={(e) =>
                    setMiniChartSettings((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                >
                  <option value='linear'>Linear</option>
                  <option value='monotone'>Monotone</option>
                  <option value='natural'>Natural</option>
                  <option value='stepAfter'>Step</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChartForm;
