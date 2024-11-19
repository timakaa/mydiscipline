"use client";

const DetailChartSettings = ({ chartSettings, setChartSettings }) => {
  return (
    <div>
      <h2 className='text-xl font-bold'>Detail Chart</h2>
      <div className='mt-4'>
        <ul className='space-y-3'>
          <li className='flex flex-col gap-y-1'>
            <div className='text-sm font-semibold'>Type</div>
            <select
              className='select select-bordered w-40 text-sm'
              value={chartSettings.type}
              onChange={(e) =>
                setChartSettings((prev) => ({
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
          <li className='flex items-center gap-x-2'>
            <span>
              <input
                type='checkbox'
                className='toggle'
                onChange={() =>
                  setChartSettings((prev) => ({
                    ...prev,
                    horizontal: !prev.horizontal,
                  }))
                }
                checked={chartSettings.horizontal}
              />
            </span>
            <span
              className={`font-semibold ${
                !chartSettings.horizontal ? "text-neutral-500" : ""
              }`}
            >
              Horizontal
            </span>
          </li>
          <li className='flex items-center gap-x-2'>
            <span>
              <input
                type='checkbox'
                className='toggle'
                onChange={() =>
                  setChartSettings((prev) => ({
                    ...prev,
                    vertical: !prev.vertical,
                  }))
                }
                checked={chartSettings.vertical}
              />
            </span>
            <span
              className={`font-semibold ${
                !chartSettings.vertical ? "text-neutral-500" : ""
              }`}
            >
              Vertical
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailChartSettings;
