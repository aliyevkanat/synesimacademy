import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onBack: () => void;
  onHome: () => void;
}

const BASE = "/assets/hard_soft_images/";

const SLIDES = [
  { id: "pillow_iron",   softFile: "pillow_soft.png",   hardFile: "iron_hard.png"    },
  { id: "toy_rings",     softFile: "toy_soft.png",      hardFile: "rings_hard.png"   },
  { id: "cupcake_lolly", softFile: "cupcake_soft.png",  hardFile: "lolipop_hard.png" },
  { id: "sofa_chair",    softFile: "sofa_soft.png",     hardFile: "chair_hard.png"   },
];

export default function G2TextureLearn({ onBack, onHome }: Props) {
  const [index, setIndex] = useState(0);
  const isFirst = index === 0;
  const isLast = index === SLIDES.length - 1;
  const current = SLIDES[index];

  const handlePrev = () => {
    if (isFirst) return;
    playSound("button_click.mp3");
    setIndex((p) => p - 1);
  };

  const handleNext = () => {
    playSound("button_click.mp3");
    setIndex((p) => Math.min(p + 1, SLIDES.length - 1));
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
        background:
          "linear-gradient(180deg, #F3E5F5 0%, #E1BEE7 40%, #CE93D8 70%, #BA68C8 100%)",
      }}
    >
      <HomeButton onHome={onHome} />

      {/* Floating clouds */}
      {[
        { top: "6%",  left: "7%",  width: 190, height: 90, delay: 0 },
        { top: "12%", right: "12%", width: 140, height: 66, delay: 1 },
        { top: "18%", left: "40%", width: 110, height: 56, delay: 2 },
      ].map((cloud, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: cloud.top,
            left: (cloud as { left?: string }).left,
            right: (cloud as { right?: string }).right,
            width: cloud.width,
            height: cloud.height,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.7)",
            filter: "blur(1px)",
            zIndex: 0,
          }}
          animate={{ x: [0, 18, 0] }}
          transition={{
            repeat: Infinity,
            duration: 8 + i,
            ease: "easeInOut",
            delay: cloud.delay,
          }}
        />
      ))}

      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 14px 24px",
          gap: 0,
        }}
      >
        {/* Title banner */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{
            background: "linear-gradient(135deg, #9C27B0, #CE93D8)",
            borderRadius: 30,
            padding: "14px 44px",
            boxShadow: "0 8px 24px rgba(156,39,176,0.4)",
            border: "4px solid #7B1FA2",
            marginBottom: "clamp(20px, 3vh, 36px)",
            fontWeight: 900,
            fontSize: "clamp(22px, 3.5vw, 32px)",
            color: "white",
            textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
            letterSpacing: 2,
          }}
        >
          🛏️ Жұмсақ және Қатты
        </motion.div>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 10, marginBottom: "clamp(14px, 2.5vh, 24px)" }}>
          {SLIDES.map((slide, dotIndex) => (
            <motion.div
              key={slide.id}
              animate={
                dotIndex === index
                  ? { scale: 1.3, background: "#FFD600" }
                  : dotIndex < index
                  ? { scale: 1, background: "rgba(255,255,255,0.4)" }
                  : { scale: 0.85, background: "rgba(160,160,160,0.5)" }
              }
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                border:
                  dotIndex === index
                    ? "2px solid #FF8F00"
                    : "2px solid rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>

        {/* Main comparison card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            borderRadius: 32,
            border: "4px solid #CE93D8",
            background: "white",
            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
            width: "clamp(600px, 85vw, 1300px)",
            padding: "28px clamp(20px, 3vw, 40px) 24px",
            overflow: "hidden",
          }}
        >
          {/* Column headers */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              padding: "0 6px",
            }}
          >
            <div
              style={{
                fontWeight: 900,
                color: "#7B1FA2",
                fontSize: "clamp(36px, 5vw, 60px)",
                letterSpacing: 4,
                lineHeight: 1,
                height: 64,
                display: "flex",
                alignItems: "center",
              }}
            >
              жұмсақ
            </div>
            <div
              style={{
                fontWeight: 900,
                color: "#37474F",
                fontSize: "clamp(36px, 5vw, 60px)",
                letterSpacing: 4,
                lineHeight: 1,
                height: 64,
                display: "flex",
                alignItems: "center",
              }}
            >
              қатты
            </div>
          </div>

          {/* Images row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 24px)",
            }}
          >
            {/* Soft image */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "clamp(280px, 35vh, 500px)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id + "_soft"}
                  src={BASE + current.softFile}
                  alt="жұмсақ"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: "clamp(200px, 28vw, 440px)",
                    height: "clamp(200px, 28vw, 440px)",
                    objectFit: "contain",
                    filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.2))",
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 3,
                height: "clamp(280px, 35vh, 500px)",
                background:
                  "repeating-linear-gradient(to bottom, #CE93D8, #CE93D8 8px, transparent 8px, transparent 16px)",
                margin: "0 clamp(8px, 2vw, 16px)",
                flexShrink: 0,
              }}
            />

            {/* Hard image */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "clamp(280px, 35vh, 500px)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id + "_hard"}
                  src={BASE + current.hardFile}
                  alt="қатты"
                  initial={{ opacity: 0, scale: 0.3, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  style={{
                    width: "clamp(200px, 28vw, 440px)",
                    height: "clamp(200px, 28vw, 440px)",
                    objectFit: "contain",
                    filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.2))",
                  }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              marginTop: 20,
            }}
          >
            {/* Prev */}
            <motion.button
              whileHover={isFirst ? {} : { scale: 1.1 }}
              whileTap={isFirst ? {} : { scale: 0.9 }}
              onClick={handlePrev}
              style={{
                border: "none",
                cursor: isFirst ? "default" : "pointer",
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 32,
                color: "#fff",
                background: "linear-gradient(135deg, #7B1FA2, #AB47BC)",
                boxShadow: "0 6px 16px rgba(123,31,162,0.4)",
                opacity: isFirst ? 0.45 : 1,
                flexShrink: 0,
              }}
              aria-label="Previous"
            >
              ‹
            </motion.button>

            {/* Item counter */}
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#7B1FA2",
                background: "rgba(255,255,255,0.8)",
                borderRadius: 20,
                padding: "6px 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {index + 1} / {SLIDES.length}
            </div>

            {/* Next / Finish */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={isLast ? handleFinish : handleNext}
              style={{
                border: "none",
                cursor: "pointer",
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: isLast ? 26 : 32,
                color: "#fff",
                background: isLast
                  ? "linear-gradient(135deg, #43A047, #66BB6A)"
                  : "linear-gradient(135deg, #7B1FA2, #AB47BC)",
                boxShadow: isLast
                  ? "0 6px 16px rgba(67,160,71,0.4)"
                  : "0 6px 16px rgba(123,31,162,0.4)",
                flexShrink: 0,
              }}
              aria-label={isLast ? "Finish" : "Next"}
            >
              {isLast ? "🎉" : "›"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
