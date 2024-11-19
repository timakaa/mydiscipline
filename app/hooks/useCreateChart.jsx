"use client";

import { useState } from "react";
import { moneyChartData } from "@/app/mocks/data";

export default function useCreateChart() {
  const [lineKeys] = useState({
    1: "actual",
    2: "max",
    3: "custom",
  });

  const [data, setData] = useState(() => moneyChartData());
  const [globalSettings, setGlobalSettings] = useState({
    lines: [
      { id: "2", name: "Maximum", color: "#ff3737" },
      { id: "1", name: "Actual", color: "#3794FF" },
      { id: "3", name: null, color: "#379400" },
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
      lines: prev.lines.map((line, i) => {
        if (i === index) {
          return { ...line, name: e.target.value };
        }
        return line;
      }),
    }));
  };

  const handleTooltipFormatterChange = (e) => {
    setGlobalSettings((prev) => ({
      ...prev,
      tooltipFormatter: e.target.value,
    }));
  };

  const handleLineColorChange = (e, index) => {
    const lineToChange = globalSettings.lines[index];

    setGlobalSettings((prev) => ({
      ...prev,
      lines: prev.lines.map((line, i) =>
        line.id === lineToChange.id ? { ...line, color: e.target.value } : line,
      ),
    }));
  };

  const handleLineRemove = (index) => {
    const lineToRemove = globalSettings.lines[index];

    setData((prevData) =>
      prevData.map(({ [lineToRemove.id]: removed, ...rest }) => rest),
    );

    setGlobalSettings((prev) => ({
      ...prev,
      lines: prev.lines.map((line) =>
        line.id === lineToRemove.id ? { ...line, name: null } : line,
      ),
    }));
  };

  const handleLineAdd = () => {
    const hiddenLine = globalSettings.lines.find((line) => line.name === null);
    if (
      !hiddenLine ||
      globalSettings.lines.filter((line) => line.name).length >= 3
    )
      return;

    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        [hiddenLine.id]: null,
      })),
    );

    setGlobalSettings((prev) => ({
      ...prev,
      lines: prev.lines.map((line) =>
        line.id === hiddenLine.id ? { ...line, name: "New line" } : line,
      ),
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
    lineKeys,
  };
}
