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

interface G1LearnColorsProps {
  onSelectColor: (colorId: ColorId) => void;
  onBack: () => void;
  onHome: () => void;
}

const COLORS: { id: ColorId; name: string; color: string }[] = [
  { id: "red", name: "Қызыл", color: "#E53935" },
  { id: "green", name: "Жасыл", color: "#43A047" },
  { id: "purple", name: "Күлгін", color: "#7B1FA2" },
  { id: "yellow", name: "Сары", color: "#FDD835" },
  { id: "white", name: "Ақ", color: "#FFFFFF" },
  { id: "orange", name: "Қызғылт сары", color: "#FB8C00" },
  { id: "skyblue", name: "Көгілдір", color: "#29B6F6" },
  { id: "pink", name: "Қызғылт", color: "#F06292" },
  { id: "blue", name: "Көк", color: "#1565C0" },
  { id: "brown", name: "Қоңыр", color: "#6D4C41" },
];

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute top-5 left-5 flex flex-col items-center gap-2">
      <motion.button
        onClick={onClick}
        className="w-16 h-16 rounded-full bg-purple-500 shadow-lg text-white text-3xl flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ←
      </motion.button>
      <div className="font-black text-slate-900 text-sm leading-tight whitespace-pre-line">
        МӘЗІРГЕ
        <br />
        ҚАЙТУ
      </div>
    </div>
  );
}

export default function G1LearnColors({ onSelectColor, onBack }: G1LearnColorsProps) {
  return (
    <motion.div
      className="min-h-screen bg-[#fde8c8] relative flex flex-col items-center p-6 overflow-hidden"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <BackButton onClick={onBack} />

      <div className="mt-6 w-full max-w-3xl">
        <div className="bg-sky-200 rounded-2xl px-6 py-4 font-black text-slate-900 text-lg text-center shadow-md">
          Түсті тыңдау үшін шеңберді басыңыз
        </div>
      </div>

      <div className="mt-10 w-full max-w-3xl grid grid-cols-5 gap-6 justify-items-center">
        {COLORS.map((c) => (
          <motion.button
            key={c.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSound(`color_${c.id}.mp3`);
              setTimeout(() => onSelectColor(c.id), 300);
            }}
            className={`w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg flex items-center justify-center select-none active:ring-4 active:ring-yellow-200 ${
              c.id === "white" ? "border-2 border-gray-300" : ""
            }`}
            style={{ backgroundColor: c.color }}
            aria-label={c.name}
          >
            {/* Intentionally no emoji/objects inside — only pure color circles */}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

