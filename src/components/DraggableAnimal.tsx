import React from "react";
import { motion } from "framer-motion";

interface DraggableAnimalProps {
  image: string;
  label: string;
  size: "big" | "small";
  onDragEnd: (info: any, size: "big" | "small") => void;
  disabled?: boolean;
  placed?: boolean;
}

const DraggableAnimal: React.FC<DraggableAnimalProps> = ({
  image,
  label,
  size,
  onDragEnd,
  disabled,
  placed,
}) => {
  const isBig = size === "big";
  const imgSize = isBig ? "w-28 h-28 md:w-36 md:h-36" : "w-16 h-16 md:w-24 md:h-24";

  if (placed) {
    return <div className={imgSize} />;
  }

  return (
    <motion.div
      drag={!disabled}
      dragSnapToOrigin
      onDragEnd={(_, info) => onDragEnd(info, size)}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 animal-draggable select-none"
    >
      <img
        src={image}
        alt={label}
        className={`${imgSize} object-contain pointer-events-none`}
        draggable={false}
      />
      <span className="text-sm md:text-lg font-bold text-foreground">{label}</span>
    </motion.div>
  );
};

export default DraggableAnimal;
