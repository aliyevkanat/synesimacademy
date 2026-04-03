import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface QuizItem {
  id: string;
  file: string;
  label: string;
  category: "hot" | "cold";
}

const ALL_ITEMS: QuizItem[] = [
  { id: "cup",         file: "cup.png",         label: "Ыстық шай",    category: "hot" },
  { id: "fire",        file: "fire.png",        label: "От",           category: "hot" },
  { id: "kettle",      file: "kettle.png",      label: "Шәйнек",      category: "hot" },
  { id: "sun",         file: "sun.png",         label: "Күн",          category: "hot" },
  { id: "iron",        file: "iron.png",        label: "Үтік",         category: "hot" },
  { id: "candle",      file: "candle.png",      label: "Шам",          category: "hot" },
  { id: "battery",     file: "battery.png",     label: "Батарея",      category: "hot" },
  { id: "match",       file: "match.png",       label: "Сіріңке",     category: "hot" },
  { id: "lamp",        file: "lamp.png",        label: "Электр шамы", category: "hot" },
  { id: "ice_cream",   file: "ice_cream.png",   label: "Балмұздақ",   category: "cold" },
  { id: "drink",       file: "drink.png",       label: "Суық сусын",  category: "cold" },
  { id: "ice",         file: "ice.png",         label: "Мұз",         category: "cold" },
  { id: "snow",        file: "snow.png",        label: "Қар",         category: "cold" },
  { id: "fridge",      file: "fridge.png",      label: "Тоңазытқыш", category: "cold" },
  { id: "fan",         file: "fan.png",         label: "Желдеткіш",  category: "cold" },
  { id: "snowman",     file: "snowman.png",     label: "Аққала",      category: "cold" },
  { id: "conditioner", file: "conditioner.png", label: "Кондиционер", category: "cold" },
  { id: "cold_water",  file: "cold_water.png",  label: "Суық су",     category: "cold" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  onBack: () => void;
  onHome: () => void;
  onReplay: () => void;
}

export default function G2TempQuiz({ onBack, onHome, onReplay }: Props) {
  const shuffled = useMemo(() => shuffle(ALL_ITEMS), []);

  const [placed, setPlaced] = useState<Record<string, "hot" | "cold">>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shakeCol, setShakeCol] = useState<string | null>(null);
  const [popup, setPopup] = useState<{ text: string; color: string } | null>(null);

  const hotPlaced = shuffled.filter((i) => placed[i.id] === "hot");
  const coldPlaced = shuffled.filter((i) => placed[i.id] === "cold");
  const remaining = shuffled.filter((i) => !placed[i.id]);
  const allDone = remaining.length === 0;

  const handleItemClick = (id: string) => {
    if (placed[id]) return;
    playSound("button_click.mp3");
    setSelectedId(id === selectedId ? null : id);
  };

  const handleColumnClick = (col: "hot" | "cold") => {
    if (!selectedId) return;
    const item = shuffled.find((i) => i.id === selectedId);
    if (!item) return;

    if (item.category === col) {
      setPlaced((prev) => ({ ...prev, [selectedId]: col }));
      playSound("correct_answer.mp3");
      const colLabel = col === "hot" ? "🔥 Дұрыс!" : "❄️ Дұрыс!";
      setPopup({ text: `${colLabel} ${item.label}`, color: col === "hot" ? "#e53935" : "#1565c0" });
      setTimeout(() => setPopup(null), 1500);
      setSelectedId(null);
    } else {
      playSound("wrong_answer.mp3");
      setShakeCol(col);
      setTimeout(() => setShakeCol(null), 500);
    }
  };

  return (
    <motion.div
      style={{
        backgroundImage: "url('/assets/hot_cold_images/hot_cold%20background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-black/30 min-h-screen flex flex-col items-center p-4 pt-6 pb-24 relative">
        <HomeButton onHome={onBack} />

        <h1
          className="font-extrabold text-2xl md:text-3xl text-white mb-1 text-center"
          style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.5)" }}
        >
          Біліміңді тексеріп көр!
        </h1>
        <p
          className="text-white/80 text-sm font-semibold mb-4 text-center"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}
        >
          Затты таңда, содан соң дұрыс бағанға орналастыр
        </p>

        {/* Two columns */}
        <div className="flex gap-4 md:gap-8 w-full max-w-5xl mb-5 relative">
          {/* Hot column */}
          <motion.div
            onClick={() => handleColumnClick("hot")}
            animate={shakeCol === "hot" ? { x: [-8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.92)",
              borderRadius: 24,
              border: selectedId ? "3px dashed #e53935" : "3px solid rgba(229,57,53,0.3)",
              padding: "20px 16px",
              minHeight: 340,
              cursor: selectedId ? "pointer" : "default",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/assets/hot_cold_images/red_temp.png"
              alt="hot"
              style={{ width: 64, height: 96, objectFit: "contain" }}
            />
            <div style={{ fontWeight: 900, color: "#e53935", fontSize: 26, marginTop: 8, marginBottom: 16 }}>
              ЫСТЫҚ 🔥
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
                width: "100%",
              }}
            >
              {hotPlaced.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 16,
                    background: "rgba(255,205,210,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`/assets/hot_cold_images/${item.file}`}
                    alt={item.label}
                    style={{ width: 56, height: 56, objectFit: "contain" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cold column */}
          <motion.div
            onClick={() => handleColumnClick("cold")}
            animate={shakeCol === "cold" ? { x: [-8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.92)",
              borderRadius: 24,
              border: selectedId ? "3px dashed #1565c0" : "3px solid rgba(21,101,192,0.3)",
              padding: "20px 16px",
              minHeight: 340,
              cursor: selectedId ? "pointer" : "default",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/assets/hot_cold_images/blue_temp.png"
              alt="cold"
              style={{ width: 64, height: 96, objectFit: "contain" }}
            />
            <div style={{ fontWeight: 900, color: "#1565c0", fontSize: 26, marginTop: 8, marginBottom: 16 }}>
              СУЫҚ ❄️
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
                width: "100%",
              }}
            >
              {coldPlaced.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 16,
                    background: "rgba(187,222,251,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`/assets/hot_cold_images/${item.file}`}
                    alt={item.label}
                    style={{ width: 56, height: 56, objectFit: "contain" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Popup feedback */}
          <AnimatePresence>
            {popup && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: popup.color,
                  color: "white",
                  borderRadius: 20,
                  padding: "10px 20px",
                  fontWeight: 800,
                  fontSize: 16,
                  zIndex: 40,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  pointerEvents: "none",
                }}
              >
                {popup.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Items grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "center",
            maxWidth: 1100,
            width: "100%",
          }}
        >
          {remaining.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: 150,
                height: 150,
                background: selectedId === item.id
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.85)",
                borderRadius: 22,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: selectedId === item.id
                  ? "4px solid #ffa000"
                  : "3px solid rgba(255,255,255,0.5)",
                boxShadow: selectedId === item.id
                  ? "0 6px 20px rgba(255,160,0,0.5)"
                  : "0 3px 12px rgba(0,0,0,0.15)",
                padding: "8px",
              }}
            >
              <img
                src={`/assets/hot_cold_images/${item.file}`}
                alt={item.label}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Score indicator */}
        {!allDone && (
          <div
            style={{
              marginTop: 12,
              background: "rgba(255,255,255,0.8)",
              borderRadius: 16,
              padding: "6px 16px",
              fontWeight: 700,
              fontSize: 14,
              color: "#555",
            }}
          >
            {Object.keys(placed).length} / {shuffled.length}
          </div>
        )}

        <AnimatePresence>
          {allDone && <WellDone onReplay={onReplay} onHome={onHome} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
