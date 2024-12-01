import React from "react";

const DetailChartSkeleton = () => {
  return (
    <div className={`mt-20 grid grid-cols-2 gap-4`}>
      <div className="flex flex-col items-center rounded-xl border border-base-content/10 bg-card pt-6 shadow-sm duration-200 hover:drop-shadow-lg">
        <div className="skeleton mb-4 h-[32px] w-[100px] rounded-lg bg-base-200 text-center text-base font-bold"></div>
        <div className="w-full px-[40px]">
          <div className="skeleton my-[30px] block h-[400px] w-full rounded-lg bg-base-200"></div>
        </div>
      </div>
      <div className="flex flex-col items-center rounded-xl border border-base-content/10 bg-card pt-6 shadow-sm duration-200 hover:drop-shadow-lg">
        <div className="skeleton mb-4 h-[32px] w-[100px] rounded-lg bg-base-200 text-center text-base font-bold"></div>
        <div className="w-full px-[40px]">
          <div className="skeleton my-[30px] block h-[400px] w-full rounded-lg bg-base-200"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailChartSkeleton;
