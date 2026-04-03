import React from "react";

interface HouseProps {
  label: string;
  size: "big" | "small";
  isOver?: boolean;
  hasAnimal?: boolean;
  animalImage?: string;
}

const House: React.FC<HouseProps> = ({ label, size, isOver, hasAnimal, animalImage }) => {
  const isBig = size === "big";
  const houseScale = isBig ? "w-40 h-36 md:w-52 md:h-44" : "w-28 h-24 md:w-36 md:h-32";
  const roofSize = isBig ? "w-48 h-20 md:w-60 md:h-24" : "w-36 h-14 md:w-44 md:h-18";
  const bgColor = isBig ? "bg-house-big" : "bg-house-small";
  const roofColor = isBig ? "bg-house-big/80" : "bg-house-small/80";

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-lg md:text-2xl font-black text-foreground">
        {label}
      </span>
      <div className="relative flex flex-col items-center">
        {/* Roof */}
        <div
          className={`${roofSize} ${roofColor} rounded-t-full -mb-2 z-10`}
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
        {/* House body */}
        <div
          className={`${houseScale} ${bgColor} rounded-lg relative flex items-center justify-center transition-all duration-200 ${
            isOver ? "drop-zone-glow scale-105" : ""
          }`}
        >
          {/* Door */}
          <div className="w-8 h-12 md:w-10 md:h-14 bg-foreground/20 rounded-t-full" />
          {/* Placed animal */}
          {hasAnimal && animalImage && (
            <img
              src={animalImage}
              alt=""
              className={`absolute -top-8 md:-top-10 ${
                isBig ? "w-20 h-20 md:w-24 md:h-24" : "w-12 h-12 md:w-16 md:h-16"
              } object-contain animate-bounce-in`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default House;
