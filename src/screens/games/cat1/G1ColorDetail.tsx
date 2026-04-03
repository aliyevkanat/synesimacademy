import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { playSound } from "../../../utils/audio";

type ColorId =
  | "red"
  | "green"
  | "purple"
  | "yellow"
  | "white"
  | "orange"
  | "skyblue"
  | "pink"
  | "blue"
  | "brown";

type Popup = { objectId: string; text: string; color: string } | null;

interface G1ColorDetailProps {
  colorId: string;
  onBack: () => void;
  onHome: () => void;
}

const DETAILS: Record<
  ColorId,
  {
    kazakhUpper: string;
    color: string;
    objects: { objectId: string; emoji: string; phrase: string }[];
  }
> = {
  red: {
    kazakhUpper: "ҚЫЗЫЛ",
    color: "#E53935",
    objects: [
      { objectId: "apple", emoji: "🍎", phrase: "Қызыл алма! 🍎" },
      { objectId: "tomato", emoji: "🍅", phrase: "Қызыл қызанақ! 🍅" },
      { objectId: "rose", emoji: "🌹", phrase: "Қызыл раушан гүл! 🌹" },
      { objectId: "strawberry", emoji: "🍓", phrase: "" },
    ],
  },
  green: {
    kazakhUpper: "ЖАСЫЛ",
    color: "#43A047",
    objects: [
      { objectId: "broccoli", emoji: "🥦", phrase: "Жасыл брокколи! 🥦" },
      { objectId: "frog", emoji: "🐸", phrase: "Жасыл бақа! 🐸" },
      { objectId: "leaf", emoji: "🍃", phrase: "Жасыл жапырақ! 🍃" },
      { objectId: "kiwi", emoji: "🥝", phrase: "" },
    ],
  },
  purple: {
    kazakhUpper: "КҮЛГІН",
    color: "#7B1FA2",
    objects: [
      { objectId: "grape", emoji: "🍇", phrase: "Күлгін жүзім! 🍇" },
      { objectId: "eggplant", emoji: "🍆", phrase: "Күлгін баклажан! 🍆" },
      { objectId: "umbrella", emoji: "☂️", phrase: "Күлгін қолшатыр! ☂️" },
      { objectId: "fireworks", emoji: "🎆", phrase: "" },
    ],
  },
  yellow: {
    kazakhUpper: "САРЫ",
    color: "#FDD835",
    objects: [
      { objectId: "lemon", emoji: "🍋", phrase: "Сары лимон! 🍋" },
      { objectId: "chick", emoji: "🐥", phrase: "Сары балапан! 🐥" },
      { objectId: "banana", emoji: "🍌", phrase: "Сары банан! 🍌" },
      { objectId: "star", emoji: "⭐", phrase: "" },
    ],
  },
  white: {
    kazakhUpper: "АҚ",
    color: "#FFFFFF",
    objects: [
      { objectId: "cloud", emoji: "☁️", phrase: "Ақ бұлт! ☁️" },
      { objectId: "rabbit", emoji: "🐇", phrase: "Ақ қоян! 🐇" },
      { objectId: "snowman", emoji: "⛄", phrase: "Ақ қар адам! ⛄" },
      { objectId: "milk", emoji: "🥛", phrase: "" },
    ],
  },
  orange: {
    kazakhUpper: "ҚЫЗҒЫЛТ САРЫ",
    color: "#FB8C00",
    objects: [
      { objectId: "orange", emoji: "🍊", phrase: "Қызғылт сары апельсин! 🍊" },
      { objectId: "carrot", emoji: "🥕", phrase: "Қызғылт сары сәбіз! 🥕" },
      { objectId: "pumpkin", emoji: "🎃", phrase: "Қызғылт сары асқабақ! 🎃" },
      { objectId: "fox", emoji: "🦊", phrase: "" },
    ],
  },
  skyblue: {
    kazakhUpper: "КӨГІЛДІР",
    color: "#29B6F6",
    objects: [
      { objectId: "butterfly", emoji: "🦋", phrase: "Көгілдір көбелек! 🦋" },
      { objectId: "drop", emoji: "💧", phrase: "Көгілдір тамшы! 💧" },
      { objectId: "whale", emoji: "🐳", phrase: "Көгілдір кит! 🐳" },
      { objectId: "ice", emoji: "🧊", phrase: "" },
    ],
  },
  pink: {
    kazakhUpper: "ҚЫЗҒЫЛТ",
    color: "#F06292",
    objects: [
      { objectId: "flower", emoji: "🌸", phrase: "Қызғылт гүл! 🌸" },
      { objectId: "pig", emoji: "🐷", phrase: "Қызғылт шошқа! 🐷" },
      { objectId: "bow", emoji: "🎀", phrase: "Қызғылт бант! 🎀" },
      { objectId: "flamingo", emoji: "🦩", phrase: "" },
    ],
  },
  blue: {
    kazakhUpper: "КӨК",
    color: "#1565C0",
    objects: [
      { objectId: "pants", emoji: "👖", phrase: "Көк шалбар! 👖" },
      { objectId: "plane", emoji: "✈️", phrase: "Көк ұшақ! ✈️" },
      { objectId: "cap", emoji: "🧢", phrase: "Көк бас киім! 🧢" },
      { objectId: "thread", emoji: "🧵", phrase: "" },
    ],
  },
  brown: {
    kazakhUpper: "ҚОҢЫР",
    color: "#6D4C41",
    objects: [
      { objectId: "chocolate", emoji: "🍫", phrase: "Қоңыр шоколад! 🍫" },
      { objectId: "bear", emoji: "🐻", phrase: "Қоңыр аю! 🐻" },
      { objectId: "hedgehog", emoji: "🦔", phrase: "Қоңыр кірпі! 🦔" },
      { objectId: "leaf", emoji: "🍂", phrase: "" },
    ],
  },
};

function ColorDetailBack({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute top-6 right-6 flex flex-col items-center gap-2">
      <motion.button
        onClick={onBack}
        className="w-16 h-16 rounded-full bg-purple-500 shadow-lg text-white text-4xl flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back"
      >
        →
      </motion.button>
      <div className="font-black text-slate-900 text-sm leading-tight text-center whitespace-pre-line">
        ТҮСТЕРГЕ
        <br />
        ҚАЙТУ
      </div>
    </div>
  );
}

export default function G1ColorDetail({ colorId, onBack }: G1ColorDetailProps) {
  const [popup, setPopup] = useState<Popup>(null);

  const safeColorId = useMemo(() => {
    if (colorId in DETAILS) return colorId as ColorId;
    return "red";
  }, [colorId]);

  const firstThree = useMemo(() => DETAILS[safeColorId].objects.slice(0, 3), [safeColorId]);

  useEffect(() => {
    setPopup(null);
  }, [colorId]);

  return (
    <motion.div
      className="min-h-screen bg-[#fde8c8] relative flex flex-col items-center p-6 overflow-hidden"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-6xl relative">
        <div className="absolute top-6 left-6 w-36 h-36 rounded-full shadow-sm" style={{ backgroundColor: DETAILS[safeColorId].color }} />

        <div className="pt-4 text-center">
          <div className="text-5xl md:text-6xl font-black text-black leading-none tracking-tight">
            {DETAILS[safeColorId].kazakhUpper}
          </div>
        </div>

        <ColorDetailBack onBack={onBack} />

        <div className="mt-20 w-full flex justify-between items-end px-8 sm:px-16 gap-6">
          {firstThree.map((obj, idx) => (
            <div
              key={obj.objectId}
              className="relative flex flex-col items-center flex-1 min-w-0"
            >
              <motion.button
                onClick={() => {
                  playSound(`${colorId}_${obj.objectId}.mp3`);
                  setPopup({
                    objectId: obj.objectId,
                    text: obj.phrase,
                    color: DETAILS[safeColorId].color,
                  });
                  setTimeout(() => setPopup(null), 2000);
                }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="min-h-[96px] flex flex-col items-center justify-end w-full"
              >
                <span
                  className={`${
                    idx === 1
                      ? "text-9xl md:text-[100px]"
                      : "text-8xl md:text-9xl"
                  }`}
                >
                  {obj.emoji}
                </span>
              </motion.button>

              {popup?.objectId === obj.objectId && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-10 bg-white rounded-2xl shadow-lg px-4 py-3 font-black text-black border-4"
                  style={{ borderColor: popup.color }}
                >
                  {popup.text}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

