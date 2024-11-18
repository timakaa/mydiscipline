"use client";

import { ListOrderedIcon, SquareSplitHorizontal, Plus } from "lucide-react";
import { useChartsStore } from "@/app/store/charts.store";
import { useEffect } from "react";
import Link from "next/link";

const DisciplineSettings = () => {
  const { split, setSplit, details, setDetails, changeOrder, setChangeOrder } =
    useChartsStore();

  useEffect(() => {
    const savedSplit = localStorage.getItem("splitView") === "true";
    if (savedSplit !== split) {
      setSplit(savedSplit);
    }

    const savedDetails = localStorage.getItem("details") === "true";
    if (savedDetails !== details) {
      setDetails(savedDetails);
    }

    const savedChangeOrder = localStorage.getItem("changeOrder") === "true";
    if (savedChangeOrder !== changeOrder) {
      setChangeOrder(savedChangeOrder);
    }
  }, []);

  return (
    <div className='flex items-center gap-x-6'>
      <div className='flex items-center gap-x-2'>
        <span className='select-none'>Details</span>
        <input
          type='checkbox'
          className='toggle'
          onChange={() => setDetails(!details)}
          checked={details}
        />
      </div>
      <div className='flex items-center gap-x-2'>
        <button
          disabled={!details}
          className={`btn-simple hidden md:block py-1 px-1 btn ${
            split ? "text-primary-hover" : ""
          }`}
          onClick={() => setSplit(!split)}
        >
          <SquareSplitHorizontal size={24} />
        </button>
        <button
          disabled={details}
          className={`btn-simple ${
            changeOrder ? "text-primary-hover" : ""
          } py-1 px-1 btn`}
          onClick={() => setChangeOrder(!changeOrder)}
        >
          <ListOrderedIcon size={24} />
        </button>
        <Link
          className='flex btn btn-simple py-2 -space-x-1 pl-3 items-center'
          href='/chart/create'
        >
          <Plus size={18} />
          <span>Chart</span>
        </Link>
      </div>
    </div>
  );
};

export default DisciplineSettings;
