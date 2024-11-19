import { useState, useRef } from "react";
import { useClickAway } from "../hooks/useClickAway";
import { Calendar } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DayPicker } from "react-day-picker";

const PickDataInterval = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  setIsPicked,
}) => {
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const fromContainerRef = useRef(null);
  const toContainerRef = useRef(null);

  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  useClickAway({
    func: () => setIsToOpen(false),
    refs: [toRef, toContainerRef],
  });

  useClickAway({
    func: () => setIsFromOpen(false),
    refs: [fromRef, fromContainerRef],
  });

  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const getDateLimits = (baseDate, isFrom) => {
    if (!baseDate) return {};

    const date = new Date(baseDate);
    if (isFrom) {
      const minDate = new Date(date);
      minDate.setFullYear(date.getFullYear() - 1);
      minDate.setDate(minDate.getDate() + 1);
      return {
        minDate,
        maxDate: addDays(toDate, -1),
        disabled: {
          before: minDate,
          after: addDays(toDate, -1),
        },
      };
    } else {
      const maxDate = new Date(date);
      maxDate.setFullYear(date.getFullYear() + 1);
      maxDate.setDate(maxDate.getDate() - 1);
      return {
        minDate: addDays(fromDate, 1),
        maxDate,
        disabled: {
          before: addDays(fromDate, 1),
          after: maxDate,
        },
      };
    }
  };

  return (
    <div>
      <div className='text-lg font-bold text-center mb-3'>
        Pick data interval
      </div>
      <div className='flex flex-col relative items-center justify-center gap-2'>
        <div>
          <button
            ref={fromRef}
            onClick={() => setIsFromOpen((prev) => !prev)}
            className={`btn ${fromDate ? "p-3" : "p-2"} btn-simple`}
          >
            {!fromDate ? (
              <Calendar size={22} />
            ) : (
              <span>{fromDate.toLocaleDateString()}</span>
            )}
          </button>
          <AnimatePresence mode='wait'>
            {isFromOpen ? (
              <motion.div
                ref={fromContainerRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.1 }}
                className='absolute top-12 left-0 bg-base-200 border max-w-full border-base-content/10 rounded-xl'
              >
                <DayPicker
                  mode='single'
                  selected={fromDate}
                  onSelect={(date) => {
                    setFromDate(date);
                    setIsFromOpen(false);
                  }}
                  captionLayout='dropdown'
                  defaultMonth={fromDate || toDate || new Date()}
                  fromYear={new Date().getFullYear() - 10}
                  toYear={new Date().getFullYear() + 10}
                  weekStartsOn={1}
                  {...(toDate && getDateLimits(toDate, true))}
                  className='bg-base-200 rounded-xl p-4'
                  classNames={{
                    today: "text-amber-700",
                    selected: `bg-amber-500 text-white rounded-full`,
                    chevron: `fill-amber-500`,
                  }}
                />
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
        <div>-</div>
        <div>
          <button
            ref={toRef}
            onClick={() => setIsToOpen((prev) => !prev)}
            className={`btn ${toDate ? "p-3" : "p-2"} btn-simple`}
          >
            {!toDate ? (
              <Calendar size={22} />
            ) : (
              <span>{toDate.toLocaleDateString()}</span>
            )}
          </button>
          <AnimatePresence mode='wait'>
            {isToOpen ? (
              <motion.div
                ref={toContainerRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.1 }}
                className='absolute top-32 left-0 bg-base-200 border max-w-full border-base-content/10 rounded-xl'
              >
                <DayPicker
                  mode='single'
                  selected={toDate}
                  onSelect={(date) => {
                    setToDate(date);
                    setIsToOpen(false);
                  }}
                  defaultMonth={toDate || fromDate || new Date()}
                  captionLayout='dropdown'
                  fromYear={new Date().getFullYear() - 10}
                  toYear={new Date().getFullYear() + 10}
                  weekStartsOn={1}
                  {...(fromDate && getDateLimits(fromDate, false))}
                  className='bg-base-200 rounded-xl p-4'
                  classNames={{
                    today: "text-amber-700",
                    selected: `bg-amber-500 text-white rounded-full`,
                    chevron: `fill-amber-500`,
                  }}
                />
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
        <div>
          <button
            onClick={() => {
              if (!fromDate || !toDate) {
                return;
              }

              setIsPicked(true);
            }}
            className='btn btn-primary py-2 px-8'
          >
            Pick
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickDataInterval;
