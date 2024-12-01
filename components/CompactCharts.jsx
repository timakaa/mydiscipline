"use client";

import MiniChart from "./ui/MiniChart";
import { useChartsStore } from "@/store/charts.store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState, useEffect } from "react";
import { moneyChartData } from "@/mocks/data";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import MiniChartSkeleton from "./ui/MiniChartSkeleton";

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
      className={`h-full !w-full rounded-xl shadow-sm hover:drop-shadow-lg ${isOrderingEnabled ? "cursor-grab active:cursor-grabbing" : ""} ${isDragging ? "opacity-90" : ""}`}
    >
      {children}
    </div>
  );
};

const CompactCharts = () => {
  const { changeOrder } = useChartsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [chartItems, setChartItems] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
          lines: [
            { id: "2", name: "Maximum", color: "#ff3737" },
            { id: "1", name: "Actual", color: "#3794FF" },
            { id: "3", name: null, color: "#379400" },
          ],
        },
        miniChartSettings: {
          type: "monotone",
        },
      }}
      animationActive={false}
    />
  );

  return (
    <div className="mt-20">
      {isLoading ? (
        <MiniChartSkeleton />
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext
            items={chartItems.map(String)}
            strategy={rectSortingStrategy}
          >
            <div className="relative grid w-full grid-cols-3 place-items-center gap-4">
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
      )}
    </div>
  );
};

export default CompactCharts;
