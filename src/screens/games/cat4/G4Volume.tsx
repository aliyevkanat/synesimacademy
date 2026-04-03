import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props { onHome: () => void; onReplay: () => void; }

function VolumeBar({ count, active }: { count: number; active: boolean }) {
  return (
    <div className="flex items-end gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`rounded-sm transition-colors ${active ? "bg-amber-500" : "bg-slate-300"}`}
          style={{ width: 8, height: 8 + i * 6 }}
        />
      ))}
    </div>
  );
}

const cards = [
  { id: "lion", emoji: "🦁", label: "Арыстан — Қатты", barCount: 4, sound: "lion_sound.mp3" },
  { id: "chick", emoji: "🐣", label: "Балапан — Ақырын", barCount: 2, sound: "chick_sound.mp3" },
];

export default function G4Volume({ onHome, onReplay }: Props) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const done = cards.every((c) => answers[c.id]);

  const handleClick = (id: string, sound: string) => {
    if (answers[id]) return;
    setAnswers((prev) => ({ ...prev, [id]: true }));
    playSound(sound);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <HomeButton onHome={onHome} />
      <h1 className="text-3xl font-bold text-amber-700 mb-1">🔊 Қатты және Ақырын</h1>
      <p className="text-slate-500 font-semibold mb-8 text-center">Дыбысты тыңда, суретті бас!</p>

      <div className="flex gap-6">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleClick(card.id, card.sound)}
            className={`bg-white rounded-3xl shadow-lg p-7 flex flex-col items-center gap-4 min-w-[140px] ${
              answers[card.id] ? "ring-4 ring-green-400" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
          >
            <span className="text-6xl">{card.emoji}</span>
            <VolumeBar count={card.barCount} active={answers[card.id]} />
            <span className="text-sm font-bold text-slate-700 text-center">{card.label}</span>
            {answers[card.id] && <span className="text-green-500 text-xl">✓</span>}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {done && <WellDone onReplay={onReplay} onHome={onHome} />}
      </AnimatePresence>
    </motion.div>
  );
}
