"use client";
import { Eraser } from "lucide-react";

const GlobalChartSettings = ({
  globalSettings,
  setGlobalSettings,
  handleLineChange,
  handleLineColorChange,
  handleLineRemove,
  handleLineAdd,
  handleTooltipFormatterChange,
}) => {
  return (
    <div>
      <div className='text-xl font-bold mb-4'>Global Settings</div>
      <div className='flex flex-col gap-y-4 items-center'>
        <div className='flex flex-col items-start'>
          <div className='text-base font-semibold mb-1'>Title</div>
          <input
            type='text'
            value={globalSettings.title}
            onChange={(e) =>
              setGlobalSettings((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className='input input-bordered w-screen max-w-xs'
          />
        </div>
        <div>
          <div className='text-base font-semibold mb-1'>Formatter</div>
          <select
            className='select select-bordered w-screen max-w-xs'
            value={globalSettings.tooltipFormatter}
            onChange={(e) => handleTooltipFormatterChange(e)}
          >
            <option value='formatNone'>None</option>
            <option value='formatDollar'>$ Dollar</option>
            <option value='formatPercentage'>% Percentage</option>
          </select>
        </div>
        <div>
          <div className='text-base font-semibold mb-1'>Lines</div>
          <div className='flex flex-col gap-y-2 max-w-xs w-screen'>
            {globalSettings.lines.map((line, index) => (
              <div key={index} className='flex items-center gap-x-2'>
                <input
                  type='text'
                  value={line.name}
                  onChange={(e) => handleLineChange(e, index)}
                  className='input input-bordered w-full min-h-5 h-auto py-2'
                />
                <input
                  type='color'
                  value={line.color}
                  onChange={(e) => handleLineColorChange(e, index)}
                  className='btn py-4'
                  style={{
                    backgroundColor: line.color,
                  }}
                />
                <button
                  onClick={() => handleLineRemove(index)}
                  className='btn text-white btn-error py-2'
                >
                  <Eraser />
                </button>
              </div>
            ))}
            {globalSettings.lines.length < 3 && (
              <div>
                <button
                  onClick={() => handleLineAdd()}
                  className='btn btn-primary py-3 w-full'
                >
                  Add Line
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalChartSettings;
