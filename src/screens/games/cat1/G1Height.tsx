import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props { onHome: () => void; onReplay: () => void; }

export default function G1Height({ onHome, onReplay }: Props) {
  const [clicked, setClicked] = useState({ tall: false, short: false });

  const done = clicked.tall && clicked.short;

  const handleClick = (type: "tall" | "short") => {
    if (clicked[type]) return;
    setClicked((prev) => ({ ...prev, [type]: true }));
    playSound(`tower_${type}.mp3`);
    playSound("correct_answer.mp3");
  };

  const towers = [
    { id: "tall" as const, floors: 5, label: "Биік мұнара", color: "bg-indigo-500" },
    { id: "short" as const, floors: 2, label: "Аласа мұнара", color: "bg-violet-400" },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <HomeButton onHome={onHome} />
      <h1 className="text-3xl font-bold text-indigo-700 mb-1">🏗️ Биік және Аласа</h1>
      <p className="text-slate-500 font-semibold mb-8 text-center">Мұнараларды басып жандандыр!</p>

      <div className="flex gap-16 items-end">
        {towers.map((tower) => (
          <motion.button
            key={tower.id}
            onClick={() => handleClick(tower.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${
              clicked[tower.id] ? "ring-4 ring-green-400 bg-green-50" : "bg-white"
            } shadow-md`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col-reverse gap-1">
              {Array.from({ length: tower.floors }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-16 h-10 rounded-md ${clicked[tower.id] ? tower.color : "bg-slate-300"} border border-white/30`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-600 mt-2">{tower.label}</span>
            {clicked[tower.id] && <span className="text-green-500 text-xl">✓</span>}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {done && <WellDone onReplay={onReplay} onHome={onHome} />}
      </AnimatePresence>
    </motion.div>
  );
}
