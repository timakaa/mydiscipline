const MiniChartSkeleton = () => {
  return (
    <div className="relative grid w-full grid-cols-3 place-items-center gap-4">
      <div
        className={`mx-auto w-full rounded-xl border border-base-content/10 bg-card p-4 duration-200 hover:drop-shadow-lg`}
      >
        <div className="skeleton mb-1 block h-[24px] w-[100px] rounded-lg bg-base-200 text-base font-bold"></div>
        <div className="skeleton h-[100px] w-full rounded-lg bg-base-200"></div>
      </div>
      <div
        className={`mx-auto w-full rounded-xl border border-base-content/10 bg-card p-4 duration-200 hover:drop-shadow-lg`}
      >
        <div className="skeleton mb-1 block h-[24px] w-[100px] rounded-lg bg-base-200 text-base font-bold"></div>
        <div className="skeleton h-[100px] w-full rounded-lg bg-base-200"></div>
      </div>
      <div
        className={`mx-auto w-full rounded-xl border border-base-content/10 bg-card p-4 duration-200 hover:drop-shadow-lg`}
      >
        <div className="skeleton mb-1 block h-[24px] w-[100px] rounded-lg bg-base-200 text-base font-bold"></div>
        <div className="skeleton h-[100px] w-full rounded-lg bg-base-200"></div>
      </div>
    </div>
  );
};

export default MiniChartSkeleton;
