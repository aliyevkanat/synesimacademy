import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface HotItem {
  id: string;
  file: string;
  label: string;
}

const HOT_ITEMS: HotItem[] = [
  { id: "cup",     file: "cup.png",     label: "Ыстық шай" },
  { id: "fire",    file: "fire.png",    label: "От" },
  { id: "kettle",  file: "kettle.png",  label: "Шәйнек" },
  { id: "sun",     file: "sun.png",     label: "Күн" },
  { id: "iron",    file: "iron.png",    label: "Үтік" },
  { id: "candle",  file: "candle.png",  label: "Шам" },
  { id: "battery", file: "battery.png", label: "Батарея" },
  { id: "match",   file: "match.png",   label: "Сіріңке" },
  { id: "lamp",    file: "lamp.png",    label: "Электр шамы" },
];

interface Props {
  onBack: () => void;
  onHome: () => void;
}

export default function G2TempHot({ onBack, onHome }: Props) {
  void onHome;
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = (item: HotItem) => {
    playSound(`temp_${item.id}.mp3`);
    if (timerRef.current) clearTimeout(timerRef.current);
    setActivePopup(item.id);
    timerRef.current = setTimeout(() => setActivePopup(null), 1500);
  };

  return (
    <motion.div
      style={{ background: "#ffffff", minHeight: "100vh" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HomeButton onHome={onBack} />

      <div className="flex flex-col items-center pt-6 pb-10 px-4">
        {/* Red thermometer at top */}
        <img
          src="/assets/hot_cold_images/red_temp.png"
          alt="hot thermometer"
          style={{ width: 70, height: 114, objectFit: "contain" }}
        />

        {/* Dashed horizontal divider */}
        <div
          style={{
            width: "80%",
            borderTop: "3px dashed #ccc",
            margin: "14px auto",
          }}
        />

        {/* 3×3 items grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            gap: "clamp(16px, 2.5vw, 32px)",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {HOT_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => handleClick(item)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              style={{
                position: "relative",
                width: "clamp(118px, 12vw, 170px)",
                height: "clamp(118px, 12vw, 170px)",
                borderRadius: "50%",
                border: "3px dashed #aaa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "white",
              }}
            >
              <img
                src={`/assets/hot_cold_images/${item.file}`}
                alt={item.label}
                style={{
                  width: "78%",
                  height: "78%",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />

              {/* Popup badge — appears above the circle */}
              <AnimatePresence>
                {activePopup === item.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: "-44px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#e53935",
                      color: "white",
                      borderRadius: "16px",
                      padding: "5px 14px",
                      fontWeight: 700,
                      fontSize: 15,
                      whiteSpace: "nowrap",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
                      zIndex: 10,
                      pointerEvents: "none",
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
