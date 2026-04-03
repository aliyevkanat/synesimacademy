import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props { onHome: () => void; onReplay: () => void; }

export default function G1Width({ onHome, onReplay }: Props) {
  const [matched, setMatched] = useState({ bear: false, squirrel: false });
  const [selected, setSelected] = useState<"thick" | "thin" | null>(null);
  const [shake, setShake] = useState<"bear" | "squirrel" | null>(null);

  const done = matched.bear && matched.squirrel;

  const handleAnimal = (animal: "bear" | "squirrel") => {
    if (!selected) return;
    const correct = animal === "bear" ? "thick" : "thin";
    if (selected === correct) {
      setMatched((prev) => ({ ...prev, [animal]: true }));
      playSound(`${animal}_width.mp3`);
      playSound("correct_answer.mp3");
      setSelected(null);
    } else {
      setShake(animal);
      playSound("wrong_answer.mp3");
      setTimeout(() => setShake(null), 500);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-amber-50 to-brown-50 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <HomeButton onHome={onHome} />
      <h1 className="text-3xl font-bold text-amber-800 mb-1">🪵 Жуан және Жіңішке</h1>
      <p className="text-slate-500 font-semibold mb-8 text-center">Затты таңда, содан соң хайуанатты басып тапсыр!</p>

      {/* Animals */}
      <div className="flex gap-12 mb-10">
        {([
          { id: "bear" as const, emoji: "🐻", label: "Аю — Жуан", hint: "(жуан бұтақ керек)" },
          { id: "squirrel" as const, emoji: "🐿️", label: "Тиін — Жіңішке", hint: "(жіңішке таяқша керек)" },
        ]).map((animal) => (
          <motion.button
            key={animal.id}
            onClick={() => handleAnimal(animal.id)}
            className={`bg-white rounded-2xl shadow-md p-5 flex flex-col items-center ${
              matched[animal.id] ? "ring-4 ring-green-400" : selected ? "border-2 border-dashed border-amber-400" : ""
            }`}
            animate={shake === animal.id ? { x: [-8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-5xl">{animal.emoji}</span>
            <span className="text-xs font-bold text-slate-600 mt-2 text-center">{animal.label}</span>
            {matched[animal.id] && <span className="text-green-500 text-xl mt-1">✓</span>}
          </motion.button>
        ))}
      </div>

      {/* Items */}
      <div className="flex gap-8">
        {!matched.bear && (
          <motion.button
            onClick={() => setSelected(selected === "thick" ? null : "thick")}
            className={`bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-3 ${
              selected === "thick" ? "ring-4 ring-amber-400" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-20 h-12 rounded-xl bg-amber-800" />
            <span className="text-sm font-bold text-slate-600">Жуан бұтақ 🪵</span>
          </motion.button>
        )}
        {!matched.squirrel && (
          <motion.button
            onClick={() => setSelected(selected === "thin" ? null : "thin")}
            className={`bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-3 ${
              selected === "thin" ? "ring-4 ring-amber-400" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-20 h-3 rounded-xl bg-amber-700 self-center" />
            <span className="text-sm font-bold text-slate-600">Жіңішке таяқша</span>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {done && <WellDone onReplay={onReplay} onHome={onHome} />}
      </AnimatePresence>
    </motion.div>
  );
}
