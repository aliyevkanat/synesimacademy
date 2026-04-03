import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { playSound } from "../../../utils/audio";

type QuizItemId = string;

interface QuizRound {
  colorName: string; // used in final message
  title: string;
  correctItemIds: QuizItemId[];
  items: { id: QuizItemId; emoji: string }[];
}

interface G1QuizProps {
  onHome: () => void;
  onBackToMode: () => void;
}

const purpleBackButtonClass =
  "w-16 h-16 rounded-full bg-purple-500 shadow-lg text-white text-4xl flex items-center justify-center";

const ROUNDS: QuizRound[] = [
  {
    colorName: "САРЫ",
    title: "САРЫ ТҮСТІ ЗАТТАРДЫ ТАП",
    // ✓: 🐥 балапан, 🍋 лимон, 🍌 банан
    correctItemIds: ["r1_chick", "r1_lemon", "r1_banana"],
    items: [
      { id: "r1_pig", emoji: "🐷" },
      { id: "r1_top", emoji: "🪀" },
      { id: "r1_chick", emoji: "🐥" },
      { id: "r1_kettle", emoji: "🫖" },
      { id: "r1_lemon", emoji: "🍋" },
      { id: "r1_mushroom", emoji: "🍄" },
      { id: "r1_banana", emoji: "🍌" },
      { id: "r1_balloon", emoji: "🎈" },
      { id: "r1_pumpkin", emoji: "🎃" },
    ],
  },
  {
    colorName: "ҚЫЗЫЛ",
    title: "ҚЫЗЫЛ ТҮСТІ ЗАТТАРДЫ ТАП",
    // ✓: 🍎 алма, 🍅 қызанақ, 🌹 раушан
    correctItemIds: ["r2_apple", "r2_tomato", "r2_rose"],
    items: [
      { id: "r2_apple", emoji: "🍎" },
      { id: "r2_frog", emoji: "🐸" },
      { id: "r2_tomato", emoji: "🍅" },
      { id: "r2_lemon", emoji: "🍋" },
      { id: "r2_cap", emoji: "🧢" },
      { id: "r2_berry", emoji: "🫐" },
      { id: "r2_rose", emoji: "🌹" },
      { id: "r2_cloud", emoji: "☁️" },
      { id: "r2_grape", emoji: "🍇" },
    ],
  },
  {
    colorName: "КӨК",
    title: "КӨК ТҮСТІ ЗАТТАРДЫ ТАП",
    // ✓: 👖 шалбар, 🧢 бас киім, ✈️ ұшақ
    correctItemIds: ["r3_pants", "r3_cap", "r3_plane"],
    items: [
      { id: "r3_pants", emoji: "👖" },
      { id: "r3_orange", emoji: "🍊" },
      { id: "r3_balloon", emoji: "🎈" },
      { id: "r3_flower", emoji: "🌸" },
      { id: "r3_cap", emoji: "🧢" },
      { id: "r3_banana", emoji: "🍌" },
      { id: "r3_pig", emoji: "🐷" },
      { id: "r3_mushroom", emoji: "🍄" },
      { id: "r3_plane", emoji: "✈️" },
    ],
  },
  {
    colorName: "ЖАСЫЛ",
    title: "ЖАСЫЛ ТҮСТІ ЗАТТАРДЫ ТАП",
    // ✓: 🐸 бақа, 🍃 жапырақ, 🥦 брокколи
    correctItemIds: ["r4_frog", "r4_leaf", "r4_broccoli"],
    items: [
      { id: "r4_frog", emoji: "🐸" },
      { id: "r4_lemon", emoji: "🍋" },
      { id: "r4_leaf", emoji: "🍃" },
      { id: "r4_tomato", emoji: "🍅" },
      { id: "r4_pumpkin", emoji: "🎃" },
      { id: "r4_broccoli", emoji: "🥦" },
      { id: "r4_chocolate", emoji: "🍫" },
      { id: "r4_heart", emoji: "💜" },
      { id: "r4_chick", emoji: "🐥" },
    ],
  },
  {
    colorName: "ҚЫЗҒЫЛТ САРЫ",
    title: "ҚЫЗҒЫЛТ САРЫ ТҮСТІ ЗАТТАРДЫ ТАП",
    // ✓: 🥕 сәбіз, 🎃 асқабақ, 🦊 түлкі
    correctItemIds: ["r5_carrot", "r5_pumpkin", "r5_fox"],
    items: [
      { id: "r5_carrot", emoji: "🥕" },
      { id: "r5_frog", emoji: "🐸" },
      { id: "r5_pumpkin", emoji: "🎃" },
      { id: "r5_grape", emoji: "🍇" },
      { id: "r5_lemon", emoji: "🍋" },
      { id: "r5_fox", emoji: "🦊" },
      { id: "r5_cloud", emoji: "☁️" },
      { id: "r5_tomato", emoji: "🍅" },
      { id: "r5_balloon", emoji: "🎈" },
    ],
  },
];

export default function G1Quiz({ onHome, onBackToMode }: G1QuizProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const round = ROUNDS[currentRound];
  const correctSet = useMemo(() => new Set(round.correctItemIds), [round.correctItemIds]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const selectedCorrectCount = useMemo(() => {
    let count = 0;
    for (const id of selectedSet) if (correctSet.has(id)) count += 1;
    return count;
  }, [selectedSet, correctSet]);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (submitted) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    // Auto-check when exactly N correct items are selected.
    if (selectedCorrectCount === round.correctItemIds.length) {
      timeoutRef.current = window.setTimeout(() => {
        setSubmitted(true);
      }, 500);
    }
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [selectedCorrectCount, round.correctItemIds.length, submitted]);

  const isAllCorrect = useMemo(() => {
    if (!submitted) return false;
    if (selected.length !== round.correctItemIds.length) return false;
    for (const id of selectedSet) if (!correctSet.has(id)) return false;
    return true;
  }, [submitted, selected.length, round.correctItemIds.length, selectedSet, correctSet]);

  useEffect(() => {
    if (!submitted) return;
    setShowSuccess(isAllCorrect);
    playSound(isAllCorrect ? "correct_answer.mp3" : "wrong_answer.mp3");
    if (isAllCorrect) setScore((s) => s + 1);
  }, [submitted, isAllCorrect]);

  const toggleSelect = (id: string) => {
    if (submitted) return;
    setSelected((prev) => {
      const set = new Set(prev);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return Array.from(set);
    });
    playSound("quiz_select.mp3");
  };

  const tryAgain = () => {
    setSubmitted(false);
    setSelected([]);
    setShowSuccess(false);
  };

  const nextRound = () => {
    setSubmitted(false);
    setSelected([]);
    setShowSuccess(false);
    setCurrentRound((r) => (r + 1 < ROUNDS.length ? r + 1 : 0));
  };

  const goMenu = () => {
    setSubmitted(false);
    setSelected([]);
    setShowSuccess(false);
    setCurrentRound(0);
    setScore(0);
    onHome();
  };

  return (
    <motion.div
      className="min-h-screen bg-[#fde8c8] relative flex flex-col items-center p-6 overflow-hidden"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-5xl relative">
        <div className="text-center font-black text-4xl mt-2">{round.title}</div>

        <div className="absolute top-0 right-0 flex flex-col items-center gap-2">
          <motion.button
            onClick={onBackToMode}
            className={purpleBackButtonClass}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to mode"
          >
            ←
          </motion.button>
          <div className="font-black text-slate-900 text-sm leading-tight text-center whitespace-pre-line">
            МӘЗІРГЕ
            <br />
            ҚАЙТУ
          </div>
        </div>

        <div className="mt-6 text-sm font-black text-slate-600 text-center opacity-90">
          Round {currentRound + 1} / 5
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <div className="flex justify-between px-2">
            {round.items.slice(0, 5).map((it) => (
              <QuizCell
                key={it.id}
                emoji={it.emoji}
                selected={selectedSet.has(it.id)}
                submitted={submitted}
                isCorrect={correctSet.has(it.id)}
                onClick={() => toggleSelect(it.id)}
              />
            ))}
          </div>
          <div className="flex justify-between px-2">
            {round.items.slice(5).map((it) => (
              <QuizCell
                key={it.id}
                emoji={it.emoji}
                selected={selectedSet.has(it.id)}
                submitted={submitted}
                isCorrect={correctSet.has(it.id)}
                onClick={() => toggleSelect(it.id)}
              />
            ))}
          </div>
        </div>

        {!submitted ? null : showSuccess ? null : (
          <div className="mt-8 flex justify-center">
            <motion.button
              onClick={tryAgain}
              className="px-6 py-3 bg-rose-400 text-white font-black rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Қайтадан көр
            </motion.button>
          </div>
        )}
      </div>

      {submitted && showSuccess && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center gap-5"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="text-6xl">🎉</div>
            <div className="text-2xl font-black text-slate-800 text-center leading-tight">
              Жарайсың! Барлық {round.colorName} заттарды таптыңыз!
            </div>
            <div className="flex gap-4">
              <motion.button
                onClick={nextRound}
                className="px-5 py-3 bg-amber-400 text-white font-black rounded-2xl shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Келесі
              </motion.button>
              <motion.button
                onClick={goMenu}
                className="px-5 py-3 bg-amber-400 text-white font-black rounded-2xl shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Мәзірге
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

function QuizCell({
  emoji,
  selected,
  submitted,
  isCorrect,
  onClick,
}: {
  emoji: string;
  selected: boolean;
  submitted: boolean;
  isCorrect: boolean;
  onClick: () => void;
}) {
  const badge = submitted && selected ? (isCorrect ? "✓" : "✗") : null;

  return (
    <motion.button
      onClick={onClick}
      className={`relative rounded-2xl select-none ${
        selected && !submitted ? "ring-4 ring-green-400 scale-110" : ""
      }`}
      whileHover={!submitted ? { scale: 1.1 } : undefined}
      whileTap={!submitted ? { scale: 0.95 } : undefined}
      animate={
        submitted && selected
          ? isCorrect
            ? { y: [0, -6, 0], scale: [1, 1.08, 1] }
            : { x: [0, -8, 8, -8, 0] }
          : undefined
      }
      transition={{ duration: 0.4 }}
    >
      <div className="text-7xl">{emoji}</div>
      {badge && (
        <motion.div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border-2 font-black shadow-md ${
            isCorrect ? "bg-green-100 border-green-400 text-green-700" : "bg-rose-100 border-rose-400 text-rose-700"
          }`}
        >
          {badge}
        </motion.div>
      )}
    </motion.button>
  );
}

