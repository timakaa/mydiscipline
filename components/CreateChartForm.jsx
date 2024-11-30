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

  return (
    <>
      <button
        onClick={() => router.push("/discipline")}
        className='btn group flex items-center gap-x-1 btn-simple py-2 mb-4'
      >
        <span className='group-hover:-translate-x-1 transition-transform'>
          <ArrowLeft size={16} />
        </span>
        <span>Back</span>
      </button>
      <div className='mb-4'>
        <DetailChart
          chart={{
            globalSettings,
            chartSettings,
            data,
          }}
          animationActive={false}
        />
      </div>
      <div className='flex justify-center'>
        <div className='max-w-xs w-screen'>
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
      <div className='flex justify-center mt-6'>
        <button className='btn btn-primary py-2 px-8 text-lg'>Create</button>
      </div>
      <div className='mt-10 grid grid-cols-1 gap-20 lg:grid-cols-2 max-w-full px-2 lg:px-32'>
        <ChartDataSettings
          setData={setData}
          data={data}
          globalSettings={globalSettings}
        />
        <div className='lg:justify-self-end'>
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
        <div className='lg:justify-self-end'>
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
