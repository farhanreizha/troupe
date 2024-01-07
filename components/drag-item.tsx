"use client";

import { cn } from "@/lib/utils";
import { useDrag } from "react-dnd";

interface DragItemProps {
  id: string;
  text: string;
}

const DragItem: React.FC<DragItemProps> = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: id,
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );

  return (
    <div ref={drag} className={cn("cursor-move", isDragging && "opacity-50")}>
      {text}
    </div>
  );
};

export default DragItem;
