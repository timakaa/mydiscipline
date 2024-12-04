"use client";

import { DayPicker } from "react-day-picker";
import { useState, useRef } from "react";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickAway } from "../hooks/useClickAway";
import PickDataInterval from "./PickDataInterval";

const ChartDataSettings = ({
  setData,
  globalSettings,
  data,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  autoPickDate = false,
}) => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isPicked, setIsPicked] = useState(
    autoPickDate ? toDate && fromDate : false
  );

  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useClickAway({
    func: () => setIsOpen(false),
    refs: [containerRef, buttonRef],
  });

  console.log(data);

  return (
    <div>
      <div className="mb-4 text-xl font-bold">Data Settings</div>
      <div className="flex flex-col gap-y-4">
        {isPicked ? (
          <div className="relative">
            <div>
              <div>
                <button
                  ref={buttonRef}
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={`btn ${date ? "p-3" : "p-2"} btn-simple`}
                >
                  {date ? (
                    <span>{date.toLocaleDateString()}</span>
                  ) : (
                    <Calendar size={22} />
                  )}
                </button>
              </div>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute left-0 top-12 max-w-full rounded-xl border border-base-content/10 bg-base-200"
                  >
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        setDate(date);
                        setIsOpen(false);
                      }}
                      defaultMonth={date || fromDate}
                      captionLayout="dropdown"
                      weekStartsOn={1}
                      disabled={{
                        before: fromDate,
                        after: toDate,
                      }}
                      fromYear={fromDate.getFullYear()}
                      toYear={toDate.getFullYear()}
                      className="rounded-xl bg-base-200 p-4"
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
            <div className="mt-6 flex flex-col gap-y-4">
              {date &&
                globalSettings.lines.map(
                  (line) =>
                    line.name && (
                      <div
                        key={line.name}
                        className="flex items-center gap-x-2"
                      >
                        <span>{line.name}</span>
                        <input
                          maxLength={7}
                          type="text"
                          className="input input-bordered"
                          value={(() => {
                            const day = data.find((day) => {
                              const dayDate = new Date(day.dateValue);
                              return (
                                dayDate?.toLocaleDateString() ===
                                date?.toLocaleDateString()
                              );
                            });
                            return day?.[line.id] || "";
                          })()}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!/^\d*$/.test(value)) return;

                            setData((prevData) =>
                              prevData.map((day) => {
                                const dayDate = new Date(day.dateValue);

                                if (
                                  dayDate?.toLocaleDateString() ===
                                  date?.toLocaleDateString()
                                ) {
                                  return {
                                    ...day,
                                    [line.id]: value ? Number(value) : null,
                                  };
                                }
                                return day;
                              })
                            );
                          }}
                        />
                      </div>
                    )
                )}
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <PickDataInterval
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              setIsPicked={setIsPicked}
              setData={setData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartDataSettings;
