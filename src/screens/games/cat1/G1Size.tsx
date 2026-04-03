import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props { onHome: () => void; onReplay: () => void; }

function House({ size, matched }: { size: "big" | "small"; matched: boolean }) {
  const scale = size === "big" ? 1 : 0.65;
  const fill = matched ? "#FBC02D" : "#e2e8f0";
  const w = 120, h = 100;
  return (
    <svg width={w * scale} height={h * scale} viewBox={`0 0 ${w} ${h}`}>
      <polygon points={`${w / 2},0 0,50 ${w},50`} fill={matched ? "#E65100" : "#94a3b8"} />
      <rect x="15" y="50" width={w - 30} height="50" fill={fill} rx="4" />
      <rect x={w / 2 - 15} y="72" width="30" height="28" fill="#7c3aed" rx="4" />
    </svg>
  );
}

export default function G1Size({ onHome, onReplay }: Props) {
  const [matched, setMatched] = useState({ big: false, small: false });
  const [selected, setSelected] = useState<"big" | "small" | null>(null);
  const [shake, setShake] = useState<"big" | "small" | null>(null);

  const done = matched.big && matched.small;

  const handleBear = (bearSize: "big" | "small") => {
    setSelected(bearSize);
  };

  const handleHouse = (houseSize: "big" | "small") => {
    if (!selected) return;
    if (selected === houseSize) {
      setMatched((prev) => ({ ...prev, [houseSize]: true }));
      playSound(`${houseSize}_match.mp3`);
      playSound("correct_answer.mp3");
      setSelected(null);
    } else {
      setShake(houseSize);
      playSound("wrong_answer.mp3");
      setTimeout(() => setShake(null), 500);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <HomeButton onHome={onHome} />
      <h1 className="text-3xl font-bold text-amber-700 mb-1">🐻 Үлкен және Кіші</h1>
      <p className="text-slate-500 font-semibold mb-8 text-center">Аюды дұрыс үйге жеткіз!</p>

      {/* Houses */}
      <div className="flex gap-12 items-end mb-10">
        {(["big", "small"] as const).map((size) => (
          <motion.button
            key={size}
            onClick={() => handleHouse(size)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${
              matched[size] ? "bg-green-100 ring-4 ring-green-400" : selected ? "bg-amber-100 border-2 border-dashed border-amber-400" : "bg-white"
            } shadow-md`}
            animate={shake === size ? { x: [-8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <House size={size} matched={matched[size]} />
            <span className="text-sm font-bold text-slate-600">
              {size === "big" ? "Үлкен үй" : "Кіші үй"}
            </span>
            {matched[size] && <span className="text-green-500 text-xl">✓</span>}
          </motion.button>
        ))}
      </div>

      {/* Bears */}
      <div className="flex gap-10">
        {(["big", "small"] as const).map((size) => (
          !matched[size] && (
            <motion.button
              key={size}
              onClick={() => handleBear(size)}
              className={`bg-white rounded-2xl shadow-md p-4 flex flex-col items-center ${
                selected === size ? "ring-4 ring-amber-400" : ""
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
            >
              <span style={{ fontSize: size === "big" ? 64 : 40 }}>🐻</span>
              <span className="text-sm font-bold text-slate-600 mt-1">
                {size === "big" ? "Үлкен аю" : "Кіші аю"}
              </span>
            </motion.button>
          )
        ))}
      </div>

      <AnimatePresence>
        {done && <WellDone onReplay={onReplay} onHome={onHome} />}
      </AnimatePresence>
    </motion.div>
  );
}
