"use client";

import { useState } from "react";
import { moneyChartData } from "@/mocks/data";
import {
  handleLineChange as handleLineChangeUtils,
  handleLineAdd as handleLineAddUtils,
  handleLineColorChange as handleLineColorChangeUtils,
  handleLineRemove as handleLineRemoveUtils,
  handleTooltipFormatterChange as handleTooltipFormatterChangeUtils,
} from "@/lib/chartUtils";

export default function useCreateChart() {
  const [lineKeys] = useState({
    1: "actual",
    2: "max",
    3: "custom",
  });

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(
    (() => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      date.setDate(date.getDate() - 1);
      return date;
    })()
  );

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

  const handleLineChange = (e, index) =>
    handleLineChangeUtils(e, index, setGlobalSettings);

  const handleTooltipFormatterChange = (e) =>
    handleTooltipFormatterChangeUtils(e, setGlobalSettings);

  const handleLineColorChange = (e, index) =>
    handleLineColorChangeUtils(e, index, globalSettings, setGlobalSettings);

  const handleLineRemove = (index) =>
    handleLineRemoveUtils(index, globalSettings, setData, setGlobalSettings);

  const handleLineAdd = () =>
    handleLineAddUtils(globalSettings, setData, setGlobalSettings);

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
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  };
}
