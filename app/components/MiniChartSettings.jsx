"use client";

const MiniChartSettings = ({ miniChartSettings, setMiniChartSettings }) => {
  return (
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
  );
};

export default MiniChartSettings;
