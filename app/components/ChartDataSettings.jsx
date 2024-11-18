"use client";

import { DayPicker } from "react-day-picker";
import { useState, useRef } from "react";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickAway } from "../hooks/useClickAway";

const ChartDataSettings = () => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useClickAway({
    func: () => setIsOpen(false),
    refs: [containerRef, buttonRef],
  });

  return (
    <div>
      <div className='text-xl font-bold mb-4'>Data Settings</div>
      <div className='flex flex-col gap-y-4'>
        <div>
          <button
            ref={buttonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className='btn p-2 btn-simple'
          >
            <Calendar size={20} />
          </button>
        </div>
        <div className='relative'>
          <AnimatePresence mode='wait'>
            {isOpen ? (
              <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.1 }}
                className='absolute top-0 left-0 bg-base-200 border max-w-full border-base-content/10 rounded-xl'
              >
                <DayPicker
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  captionLayout='dropdown'
                  fromYear={new Date().getFullYear() - 10}
                  toYear={new Date().getFullYear() + 10}
                  weekStartsOn={1}
                  className='bg-base-200 rounded-xl p-4'
                  classNames={{
                    today: "text-amber-700",
                    selected: `bg-amber-500 text-white rounded-full`,
                    chevron: `fill-amber-500`,
                  }}
                />
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className='btn btn-primary mx-6 mb-6 mt-2 py-3'
                >
                  Submit
                </button>
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChartDataSettings;
