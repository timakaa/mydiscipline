import React from "react";

const EditChartSkeleton = () => {
  return (
    <div className="flex min-h-60 flex-col gap-y-4 rounded-lg bg-base-200 p-4">
      <div className="skeleton h-8 w-full rounded-lg bg-base-300"></div>
      <div className="skeleton h-screen max-h-64 w-full rounded-lg bg-base-300"></div>
    </div>
  );
};

export default EditChartSkeleton;
