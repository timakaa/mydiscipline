"use client";

import { useState, useEffect } from "react";
import { getChartById } from "@/app/actions/chartActions";
import EditChartSkeleton from "./ui/EditChartSkeleton";
import DetailChart from "./ui/DetailChart";
import MiniChart from "./ui/MiniChart";
import DetailChartSettings from "./DetailChartSettings";
import MiniChartSettings from "./MiniChartSettings";
import ChartDataSettings from "./ChartDataSettings";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import GlobalChartSettings from "./GlobalChartSettings";

import {
  handleLineChange as handleLineChangeUtils,
  handleLineColorChange as handleLineColorChangeUtils,
  handleLineRemove as handleLineRemoveUtils,
  handleLineAdd as handleLineAddUtils,
  handleTooltipFormatterChange as handleTooltipFormatterChangeUtils,
} from "@/lib/chartUtils";
import { changeChart } from "@/app/actions/chartActions";

const EditChartForm = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [globalSettings, setGlobalSettings] = useState(null);
  const [chartSettings, setChartSettings] = useState(null);
  const [miniChartSettings, setMiniChartSettings] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleLineChange = (e, index) =>
    handleLineChangeUtils(e, index, setGlobalSettings);

  const handleLineColorChange = (e, index) =>
    handleLineColorChangeUtils(e, index, globalSettings, setGlobalSettings);

  const handleLineRemove = (index) =>
    handleLineRemoveUtils(index, globalSettings, setData, setGlobalSettings);

  const handleLineAdd = () =>
    handleLineAddUtils(globalSettings, setData, setGlobalSettings);

  const handleTooltipFormatterChange = (e) =>
    handleTooltipFormatterChangeUtils(e, setGlobalSettings);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        setIsLoading(true);
        const { chart } = await getChartById(id);
        setData(chart.data);
        setGlobalSettings(chart.globalSettings);
        setChartSettings(chart.chartSettings);
        setMiniChartSettings(chart.miniChartSettings);
        setFromDate(chart.fromDate);
        setToDate(chart.toDate);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChart();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await changeChart({
        id,
        chart: {
          data,
          globalSettings,
          chartSettings,
          miniChartSettings,
        },
      });
      router.push("/discipline");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <EditChartSkeleton />
      ) : globalSettings ? (
        <>
          <button
            onClick={() => router.push("/discipline")}
            className="btn-simple group btn mb-4 flex items-center gap-x-1 py-2"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={16} />
            </span>
            <span>Back</span>
          </button>
          <div className="mb-4">
            <DetailChart
              chart={{
                globalSettings,
                chartSettings,
                data,
              }}
              animationActive={false}
            />
          </div>
          <div className="flex justify-center">
            <div className="w-screen max-w-xs">
              <MiniChart
                chart={{
                  globalSettings,
                  miniChartSettings,
                  data,
                }}
                animationActive={false}
              />
            </div>
          </div>
          <form onSubmit={onSubmit} className="mt-6 flex justify-center">
            <button className="btn btn-primary px-8 py-2 text-lg">
              Update
            </button>
          </form>
          <div className="mt-10 grid max-w-full grid-cols-1 gap-20 px-2 lg:grid-cols-2 lg:px-32">
            <ChartDataSettings
              setData={setData}
              data={data}
              globalSettings={globalSettings}
              fromDate={fromDate}
              toDate={toDate}
              autoPickDate={true}
            />
            <div className="lg:justify-self-end">
              <GlobalChartSettings
                globalSettings={globalSettings}
                setGlobalSettings={setGlobalSettings}
                handleLineChange={handleLineChange}
                handleLineColorChange={handleLineColorChange}
                handleLineRemove={handleLineRemove}
                handleLineAdd={handleLineAdd}
                handleTooltipFormatterChange={handleTooltipFormatterChange}
              />
            </div>
            <DetailChartSettings
              chartSettings={chartSettings}
              setChartSettings={setChartSettings}
            />
            <div className="lg:justify-self-end">
              <MiniChartSettings
                miniChartSettings={miniChartSettings}
                setMiniChartSettings={setMiniChartSettings}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-20 text-center text-xl font-bold">
          No Chart Found
        </div>
      )}
    </>
  );
};

export default EditChartForm;
