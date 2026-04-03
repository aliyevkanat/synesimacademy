import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../components/HomeButton";
import WellDone from "../../components/WellDone";
import PopupLabel from "../../components/PopupLabel";
import { playSound } from "../../utils/audio";
import type { SortItem, SortBin } from "../../types/game";

interface SortGameProps {
  onHome: () => void;
  onReplay: () => void;
  title: string;
  instruction?: string;
  items: SortItem[];
  bins: SortBin[];
  audioPrefix?: string;
  bgClass?: string;
}

export default function SortGame({
  onHome,
  onReplay,
  title,
  instruction = "Затты таңда, содан соң дұрыс себетке орналастыр!",
  items,
  bins,
  audioPrefix = "",
  bgClass = "from-sky-50 to-indigo-100",
}: SortGameProps) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);
  const [popup, setPopup] = useState<string | null>(null);
  const [popupColor, setPopupColor] = useState("#4ade80");

  const allPlaced = items.every((item) => placed[item.id]);

  const showPopup = (text: string, color: string) => {
    setPopup(text);
    setPopupColor(color);
    setTimeout(() => setPopup(null), 2000);
  };

  const handleItemClick = (id: string) => {
    if (placed[id]) return;
    setSelectedId(id === selectedId ? null : id);
  };

  const handleBinClick = (binId: string) => {
    if (!selectedId) return;
    const item = items.find((i) => i.id === selectedId);
    if (!item) return;

    if (item.correctBin === binId) {
      setPlaced((prev) => ({ ...prev, [selectedId]: binId }));
      const bin = bins.find((b) => b.id === binId);
      showPopup(item.description, bin?.color ?? "#4ade80");
      playSound(`${audioPrefix}${selectedId}.mp3`);
      playSound("correct_answer.mp3");
      setSelectedId(null);
    } else {
      setShake(binId);
      playSound("wrong_answer.mp3");
      setTimeout(() => setShake(null), 500);
    }
  };

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${bgClass} flex flex-col items-center justify-center p-6`}
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <HomeButton onHome={onHome} />
      <h1 className="text-3xl font-bold text-slate-700 mb-1">{title}</h1>
      <p className="text-slate-500 font-semibold mb-8 text-center text-sm">{instruction}</p>

      {/* Bins */}
      <div className="flex gap-4 mb-8 relative">
        {bins.map((bin) => {
          const placedItems = items.filter((i) => placed[i.id] === bin.id);
          return (
            <motion.button
              key={bin.id}
              onClick={() => handleBinClick(bin.id)}
              className={`w-36 min-h-[120px] rounded-2xl shadow-md flex flex-col items-center justify-start gap-2 p-4 ${
                selectedId ? "border-2 border-dashed" : ""
              }`}
              style={{
                backgroundColor: `${bin.color}22`,
                borderColor: selectedId ? bin.color : "transparent",
              }}
              animate={shake === bin.id ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
              whileHover={selectedId ? { scale: 1.05 } : {}}
              whileTap={selectedId ? { scale: 0.95 } : {}}
            >
              <span className="text-4xl">{bin.emoji}</span>
              <span className="text-xs font-bold" style={{ color: bin.color }}>
                {bin.label}
              </span>
              <div className="flex flex-wrap gap-1 justify-center">
                {placedItems.map((item) => (
                  <span key={item.id} className="text-2xl">{item.emoji}</span>
                ))}
              </div>
            </motion.button>
          );
        })}

        <AnimatePresence>
          {popup && <PopupLabel text={popup} color={popupColor} />}
        </AnimatePresence>
      </div>

      {/* Items */}
      <div className="flex flex-wrap gap-3 justify-center max-w-sm">
        {items.map((item) => {
          if (placed[item.id]) return null;
          return (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-1 min-w-[80px] ${
                selectedId === item.id ? "ring-4 ring-amber-400" : ""
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
            >
              <span className="text-4xl">{item.emoji}</span>
              <span className="text-xs font-bold text-slate-600">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {allPlaced && <WellDone onReplay={onReplay} onHome={onHome} />}
      </AnimatePresence>
    </motion.div>
  );
}
