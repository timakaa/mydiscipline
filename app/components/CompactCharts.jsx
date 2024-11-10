"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer } from "recharts";
import { useChartsStore } from "@/app/store/charts.store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { moneyChartData } from "@/app/mocks/data";

const SortableItem = ({ id, children, isOrderingEnabled }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !isOrderingEnabled,
    transition: {
      duration: 400,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isOrderingEnabled ? transition : "200ms",
    width: "calc(33.333% - 1.667rem)",
    flexShrink: 0,
    zIndex: isDragging ? 1000 : 0,
    position: isDragging ? "relative" : "static",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-card border !w-full shadow-sm hover:drop-shadow-lg border-base-content/10 rounded-xl p-4 
        ${isOrderingEnabled ? "cursor-grab active:cursor-grabbing" : ""}
        ${isDragging ? "opacity-90" : ""}`}
    >
      {children}
    </div>
  );
};

const CompactCharts = () => {
  const { changeOrder } = useChartsStore();
  const [chartItems, setChartItems] = useState([0, 1, 2, 3]);

  const chartsData = useMemo(() => {
    return chartItems.map(() => moneyChartData());
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || !changeOrder) return;

    if (active.id !== over.id) {
      setChartItems((items) => {
        const oldIndex = items.indexOf(Number(active.id));
        const newIndex = items.indexOf(Number(over.id));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const ChartBlock = ({ dataIndex }) => (
    <ResponsiveContainer
      width='100%'
      height={100}
      className='pointer-events-none'
    >
      <AreaChart data={chartsData[dataIndex]}>
        <defs>
          <linearGradient id='colorUv2' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#ff3737' stopOpacity={0.3} />
            <stop offset='80%' stopColor='#ff3737' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='colorUv1' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#3794FF' stopOpacity={0.3} />
            <stop offset='80%' stopColor='#3794FF' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray='3 3'
          strokeWidth={2}
          horizontal={false}
          vertical={false}
        />
        <Area
          type='monotone'
          dataKey='max'
          stroke='#ff3737'
          strokeWidth={3}
          fillOpacity={1}
          fill='url(#colorUv2)'
          isAnimationActive={false}
        />
        <Area
          type='monotone'
          dataKey='actual'
          stroke='#3794FF'
          strokeWidth={3}
          fillOpacity={1}
          fill='url(#colorUv1)'
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={chartItems.map(String)}
        strategy={rectSortingStrategy}
      >
        <div className='grid grid-cols-3 relative w-full place-items-center gap-4 mt-20'>
          {chartItems.map((item) => (
            <SortableItem
              key={item}
              id={item.toString()}
              isOrderingEnabled={changeOrder}
            >
              <ChartBlock dataIndex={item} />
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default CompactCharts;
