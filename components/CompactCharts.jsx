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
import { updateChartsOrder } from "@/app/actions/chartActions";

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

const CompactCharts = ({ charts, isLoading, onOrderUpdate }) => {
  const { changeOrder } = useChartsStore();
  const [chartItems, setChartItems] = useState([]);
  const [isOrderingDisabled, setIsOrderingDisabled] = useState(false);

  useEffect(() => {
    if (charts) {
      setChartItems(charts.map((_, index) => index));
    }
  }, [charts]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || !changeOrder || isOrderingDisabled) return;

    if (active.id !== over.id) {
      setIsOrderingDisabled(true);

      const newItems = [...chartItems];
      const oldIndex = newItems.indexOf(Number(active.id));
      const newIndex = newItems.indexOf(Number(over.id));
      const reorderedItems = arrayMove(newItems, oldIndex, newIndex);

      setChartItems(reorderedItems);

      try {
        const chartIdsInOrder = reorderedItems.map((index) => charts[index].id);
        await updateChartsOrder(chartIdsInOrder);
        await onOrderUpdate();

        setTimeout(() => {
          setIsOrderingDisabled(false);
        }, 3000);
      } catch (error) {
        console.error("Failed to update order:", error);
        setChartItems(chartItems);
        setIsOrderingDisabled(false);
      }
    }
  };

  const ChartBlock = ({ dataIndex }) => {
    return (
      <div
        className={`transition-opacity duration-200 ${isOrderingDisabled ? "opacity-70 hover:opacity-100" : "opacity-100"}`}
      >
        <MiniChart chart={charts[dataIndex]} animationActive={false} />
      </div>
    );
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
                  isOrderingEnabled={changeOrder && !isOrderingDisabled}
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
