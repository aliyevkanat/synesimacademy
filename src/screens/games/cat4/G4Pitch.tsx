import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props { onHome: () => void; onReplay: () => void; }

const cards = [
  { id: "bear", emoji: "🐻", fontSize: 72, label: "Аю — Жуан дауыс", sound: "bear_voice.mp3" },
  { id: "mouse", emoji: "🐭", fontSize: 48, label: "Тышқан — Жіңішке дауыс", sound: "mouse_voice.mp3" },
];

export default function G4Pitch({ onHome, onReplay }: Props) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const done = cards.every((c) => answers[c.id]);

  const handleClick = (id: string, sound: string) => {
    if (answers[id]) return;
    setAnswers((prev) => ({ ...prev, [id]: true }));
    playSound(sound);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <HomeButton onHome={onHome} />
      <h1 className="text-3xl font-bold text-violet-700 mb-1">🎵 Жуан және Жіңішке дауыс</h1>
      <p className="text-slate-500 font-semibold mb-8 text-center">Кімнің дауысы жуан? Кімнің жіңішке?</p>

      <div className="flex gap-8 items-end">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleClick(card.id, card.sound)}
            className={`bg-white rounded-3xl shadow-lg p-7 flex flex-col items-center gap-3 min-w-[140px] ${
              answers[card.id] ? "ring-4 ring-green-400" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
          >
            <span style={{ fontSize: card.fontSize }}>{card.emoji}</span>
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
