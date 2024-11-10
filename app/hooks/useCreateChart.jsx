"use client";

import { useState } from "react";
import { moneyChartData } from "@/app/mocks/data";

export default function useCreateChart() {
  const [data, setData] = useState(moneyChartData());
  const [globalSettings, setGlobalSettings] = useState({
    lines: [
      { name: "max", color: "#ff3737" },
      { name: "actual", color: "#3794FF" },
    ],
    title: "Chart",
    tooltipFormatter: "formatNone",
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

  const handleTooltipFormatterChange = (e) => {
    setGlobalSettings((prev) => ({
      ...prev,
      tooltipFormatter: e.target.value,
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

  return {
    globalSettings,
    setGlobalSettings,
    chartSettings,
    setChartSettings,
    miniChartSettings,
    setMiniChartSettings,
    handleLineChange,
    handleLineColorChange,
    handleLineRemove,
    handleLineAdd,
    handleTooltipFormatterChange,
    data,
    setData,
  };
}
