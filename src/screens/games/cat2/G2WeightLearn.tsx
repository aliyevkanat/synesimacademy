import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onBack: () => void;
  onHome: () => void;
}

const BASE_URL = "/assets/heavy_light_images/";

const SLIDES = [
  {
    id: "watermelon_key",
    heavyFile: "watermelon_heavy.png",
    lightFile: "key_light.png",
  },
  {
    id: "sofa_notebook",
    heavyFile: "sofa_heavy.png",
    lightFile: "notebook_light.png",
  },
  {
    id: "brick_cotton",
    heavyFile: "brick_heavy.png",
    lightFile: "cotton_light.png",
  },
];

export default function G2WeightLearn({ onBack, onHome }: Props) {
  const [index, setIndex] = useState(0);
  const isFirst = index === 0;
  const isLast = index === SLIDES.length - 1;
  const current = SLIDES[index];

  const handlePrev = () => {
    if (isFirst) return;
    playSound("button_click.mp3");
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    playSound("button_click.mp3");
    setIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  };

  const handleFinish = () => {
    playSound("correct_answer.mp3");
    onBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
        background: "linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 40%, #FFCC80 70%, #FFA726 100%)",
      }}
    >
      <HomeButton onHome={onHome} />
      <motion.button
        type="button"
        onClick={() => {
          playSound("button_click.mp3");
          onBack();
        }}
        className="fixed top-4 left-20 z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl font-black text-orange-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Back to weight mode"
      >
        ‹
      </motion.button>

      <motion.div
        style={{ position: "absolute", top: "10%", left: "8%", width: 160, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.55)", filter: "blur(1px)" }}
        animate={{ x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
      />
      <motion.div
        style={{ position: "absolute", top: "17%", right: "10%", width: 120, height: 62, borderRadius: "50%", background: "rgba(255,255,255,0.46)", filter: "blur(1px)" }}
        animate={{ x: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.div
        style={{ position: "absolute", left: "42%", top: "8%", width: 145, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.34)", filter: "blur(1px)" }}
        animate={{ x: [0, 14, 0] }}
        transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut", delay: 0.4 }}
      />

      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "82px 14px 28px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 190, damping: 16 }}
          style={{
            marginBottom: 18,
            padding: "16px 48px",
            borderRadius: 30,
            color: "white",
            background: "linear-gradient(135deg, #E65100, #FF6F00)",
            border: "4px solid #BF360C",
            boxShadow: "0 8px 24px rgba(230,81,0,0.4)",
            fontWeight: 900,
            fontSize: "clamp(24px, 4vw, 36px)",
            letterSpacing: 0.3,
            textAlign: "center",
          }}
        >
          ⚖️ Ауыр және Жеңіл
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 18 }}>
          {SLIDES.map((slide, dotIndex) => {
            const isActive = dotIndex === index;
            const isCompleted = dotIndex < index;

            return (
              <motion.div
                key={slide.id}
                animate={{ scale: isActive ? 1.3 : isCompleted ? 1 : 0.8 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: isActive ? "#FFD600" : isCompleted ? "rgba(255,255,255,0.4)" : "rgba(120,120,120,0.32)",
                  border: isActive ? "3px solid #FF8F00" : isCompleted ? "2px solid white" : "2px solid rgba(255,255,255,0.35)",
                  boxShadow: isActive ? "0 0 0 5px rgba(255,143,0,0.18)" : "none",
                }}
              />
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 185, damping: 17 }}
          style={{
            width: "clamp(600px, 85vw, 1300px)",
            maxWidth: "100%",
            borderRadius: 32,
            border: "4px solid #FFB300",
            background: "white",
            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
            padding: "26px clamp(16px, 3vw, 34px)",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto 1fr auto",
            alignItems: "center",
            gap: "clamp(10px, 1.8vw, 22px)",
          }}
        >
          <motion.button
            type="button"
            whileHover={isFirst ? {} : { scale: 1.08 }}
            whileTap={isFirst ? {} : { scale: 0.94 }}
            onClick={handlePrev}
            disabled={isFirst}
            style={{
              border: "none",
              cursor: isFirst ? "default" : "pointer",
              width: 72,
              height: 72,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 40,
              color: "#fff",
              background: "linear-gradient(135deg, #6f7cff, #7d63ef)",
              boxShadow: "0 8px 18px rgba(95,110,229,0.35)",
              opacity: isFirst ? 0.3 : 1,
              flexShrink: 0,
            }}
            aria-label="Previous example"
          >
            ‹
          </motion.button>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 0 }}>
            <div
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 900,
                color: "#BF360C",
                letterSpacing: 4,
                marginBottom: 8,
                lineHeight: 1,
              }}
            >
              ауыр
            </div>
            <AnimatePresence mode="wait">
              <motion.img
                key={`${current.id}-heavy`}
                src={`${BASE_URL}${current.heavyFile}`}
                alt="Ауыр зат"
                draggable={false}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                style={{
                  height: "clamp(280px, 35vh, 500px)",
                  maxWidth: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 12px 22px rgba(91,54,35,0.22))",
                }}
              />
            </AnimatePresence>
          </div>

          <div
            style={{
              width: 3,
              height: "clamp(280px, 35vh, 500px)",
              background: "repeating-linear-gradient(to bottom, #FFB300, #FFB300 8px, transparent 8px, transparent 16px)",
              margin: "0 clamp(8px, 2vw, 16px)",
              flexShrink: 0,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 0 }}>
            <div
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 900,
                color: "#1565C0",
                letterSpacing: 4,
                marginBottom: 8,
                lineHeight: 1,
              }}
            >
              жеңіл
            </div>
            <AnimatePresence mode="wait">
              <motion.img
                key={`${current.id}-light`}
                src={`${BASE_URL}${current.lightFile}`}
                alt="Жеңіл зат"
                draggable={false}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                style={{
                  height: "clamp(280px, 35vh, 500px)",
                  maxWidth: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 12px 22px rgba(38,84,142,0.2))",
                }}
              />
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={isLast ? handleFinish : handleNext}
            style={{
              border: "none",
              cursor: "pointer",
              width: 72,
              height: 72,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: isLast ? 34 : 40,
              color: "#fff",
              background: isLast ? "linear-gradient(135deg, #2E7D32, #66BB6A)" : "linear-gradient(135deg, #6f7cff, #7d63ef)",
              boxShadow: isLast ? "0 8px 18px rgba(46,125,50,0.33)" : "0 8px 18px rgba(95,110,229,0.35)",
              flexShrink: 0,
            }}
            aria-label={isLast ? "Finish learning" : "Next example"}
          >
            {isLast ? "🎉" : "›"}
          </motion.button>
        </motion.div>

        <div
          style={{
            marginTop: 16,
            padding: "8px 22px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.86)",
            boxShadow: "0 6px 16px rgba(230,81,0,0.16)",
            fontWeight: 800,
            color: "#E65100",
            fontSize: 18,
          }}
        >
          {index + 1} / {SLIDES.length}
        </div>
      </div>
    </motion.div>
  );
}
