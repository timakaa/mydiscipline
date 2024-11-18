"use client";

import MiniChart from "./ui/MiniChart";
import { ResponsiveContainer } from "recharts";
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
      className={`!w-full h-full shadow-sm hover:drop-shadow-lg rounded-xl
        ${isOrderingEnabled ? "cursor-grab active:cursor-grabbing" : ""}
        ${isDragging ? "opacity-90" : ""}`}
    >
      {children}
    </div>
  );
};

const CompactCharts = () => {
  const { changeOrder } = useChartsStore();
  const [chartItems, setChartItems] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

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
    <MiniChart
      chart={{
        data: chartsData[dataIndex],
        globalSettings: {
          title: "Test",
          lines: [{ name: "max", color: "#f59e0b" }],
        },
        miniChartSettings: {
          type: "monotone",
        },
      }}
      animationActive={false}
    />
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
