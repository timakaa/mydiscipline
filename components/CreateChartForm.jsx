"use client";

import GlobalChartSettings from "./GlobalChartSettings";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import DetailChart from "./ui/DetailChart";
import MiniChart from "./ui/MiniChart";
import useCreateChart from "../hooks/useCreateChart";
import DetailChartSettings from "./DetailChartSettings";
import MiniChartSettings from "./MiniChartSettings";
import ChartDataSettings from "./ChartDataSettings";
import { createChart } from "@/app/actions/chartActions";

const CreateChartForm = () => {
  const router = useRouter();
  const {
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
  } = useCreateChart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { chart } = await createChart({
        data,
        globalSettings,
        chartSettings,
        miniChartSettings,
      });
      console.log(chart);
      router.push(`/discipline`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
      <form onSubmit={handleSubmit} className="mt-6 flex justify-center">
        <button className="btn btn-primary px-8 py-2 text-lg">Create</button>
      </form>
      <div className="mt-10 grid max-w-full grid-cols-1 gap-20 px-2 lg:grid-cols-2 lg:px-32">
        <ChartDataSettings
          setData={setData}
          data={data}
          globalSettings={globalSettings}
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
  );
};

export default CreateChartForm;
