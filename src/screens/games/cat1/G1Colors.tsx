import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import PopupLabel from "../../../components/PopupLabel";
import { playSound } from "../../../utils/audio";

interface Props { onHome: () => void; onReplay: () => void; }

export default function G1Colors({ onHome, onReplay }: Props) {
  const [sunColor, setSunColor] = useState<string | null>(null);
  const [grassColor, setGrassColor] = useState<string | null>(null);
  const [activePaint, setActivePaint] = useState<"yellow" | "green" | null>(null);
  const [popup, setPopup] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sunColor && grassColor) {
      setTimeout(() => setDone(true), 600);
    }
  }, [sunColor, grassColor]);

  const showPopup = (text: string) => {
    setPopup(text);
    setTimeout(() => setPopup(null), 2000);
  };

  const handleSunClick = () => {
    if (activePaint === "yellow" && !sunColor) {
      setSunColor("#FDD835");
      showPopup("Күн — сары! ☀️");
      playSound("sun_yellow.mp3");
    }
  };

  const handleGrassClick = () => {
    if (activePaint === "green" && !grassColor) {
      setGrassColor("#43A047");
      showPopup("Шөп — жасыл! 🌿");
      playSound("grass_green.mp3");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-100 to-green-50 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <HomeButton onHome={onHome} />
      <h1 className="text-3xl font-bold text-sky-700 mb-1">🎨 Түстерді жандандыр</h1>
      <p className="text-slate-500 font-semibold mb-6 text-center">Түс таңда, содан соң затты басып боя!</p>

      <div className="relative">
        <svg viewBox="0 0 400 280" width="360" height="252" className="rounded-2xl shadow-lg">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
          </defs>
          <rect width="400" height="280" fill="url(#skyGrad)" />

          {/* Grass */}
          <motion.rect
            x="0" y="220" width="400" height="60"
            animate={{ fill: grassColor ?? "#d1d5db" }}
            transition={{ duration: 0.5 }}
            onClick={handleGrassClick}
            className="cursor-pointer"
            style={{ cursor: activePaint === "green" && !grassColor ? "pointer" : "default" }}
          />
          {[30, 80, 150, 220, 290, 350].map((x, i) => (
            <motion.path
              key={i}
              d={`M${x},220 Q${x + 6},200 ${x + 12},220`}
              animate={{ fill: grassColor ?? "#d1d5db" }}
              transition={{ duration: 0.5 }}
              onClick={handleGrassClick}
              stroke="none"
              style={{ cursor: activePaint === "green" && !grassColor ? "pointer" : "default" }}
            />
          ))}

          {/* Sun rays */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <motion.line
                key={i}
                x1={300 + Math.cos(angle) * 52}
                y1={70 + Math.sin(angle) * 52}
                x2={300 + Math.cos(angle) * 68}
                y2={70 + Math.sin(angle) * 68}
                animate={{ stroke: sunColor ?? "#d1d5db" }}
                transition={{ duration: 0.5 }}
                strokeWidth="4" strokeLinecap="round"
              />
            );
          })}

          {/* Sun */}
          <motion.circle
            cx="300" cy="70" r="48"
            animate={{ fill: sunColor ?? "#d1d5db" }}
            transition={{ duration: 0.5 }}
            onClick={handleSunClick}
            style={{ cursor: activePaint === "yellow" && !sunColor ? "pointer" : "default" }}
          />
          {/* Smiley */}
          <circle cx="288" cy="64" r="4" fill={sunColor ? "#7B5E00" : "#9ca3af"} style={{ pointerEvents: "none" }} />
          <circle cx="312" cy="64" r="4" fill={sunColor ? "#7B5E00" : "#9ca3af"} style={{ pointerEvents: "none" }} />
          <path d="M288,80 Q300,92 312,80" stroke={sunColor ? "#7B5E00" : "#9ca3af"} strokeWidth="3" fill="none" strokeLinecap="round" style={{ pointerEvents: "none" }} />
        </svg>

        <AnimatePresence>
          {popup && <PopupLabel text={popup} color="#4ade80" />}
        </AnimatePresence>
      </div>

      {/* Paint palette */}
      <div className="flex gap-6 mt-8">
        {[
          { id: "yellow" as const, color: "#FDD835", label: "Сары ☀️" },
          { id: "green" as const, color: "#43A047", label: "Жасыл 🌿" },
        ].map((paint) => (
          <motion.button
            key={paint.id}
            onClick={() => setActivePaint(paint.id === activePaint ? null : paint.id)}
            className="flex flex-col items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
          >
            <div
              className={`w-14 h-14 rounded-full shadow-md transition-all ${activePaint === paint.id ? "ring-4 ring-offset-2 ring-slate-600" : ""}`}
              style={{ backgroundColor: paint.color, boxShadow: activePaint === paint.id ? `0 0 0 6px ${paint.color}55` : undefined }}
            />
            <span className="text-sm font-bold text-slate-600">{paint.label}</span>
          </motion.button>
        ))}
      </div>

      {done && <WellDone onReplay={onReplay} onHome={onHome} />}
    </motion.div>
  );
}
