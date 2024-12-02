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
import MiniChartSkeleton from "./ui/MiniChartSkeleton";
import { restrictToParentElement } from "@dnd-kit/modifiers";

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

const CompactCharts = ({ charts, isLoading }) => {
  const { changeOrder } = useChartsStore();
  const [chartItems, setChartItems] = useState([]);

  useEffect(() => {
    if (charts) {
      setChartItems(charts.map((_, index) => index));
    }
  }, [charts]);

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

  const ChartBlock = ({ dataIndex }) => {
    console.log(charts);
    return <MiniChart chart={charts[dataIndex]} animationActive={false} />;
  };

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
