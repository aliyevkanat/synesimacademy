import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onBack: () => void;
  onHome: () => void;
}

const ITEMS = [
  { id: "rabbit", file: "rabbit.png", label: "Қоян" },
  { id: "star", file: "star.png", label: "Жұлдыз" },
  { id: "ball", file: "ball.png", label: "Доп" },
  { id: "car", file: "carr.png", label: "Машина" },
  { id: "tree", file: "tree.png", label: "Ағаш" },
];

const CLOUDS = [
  { top: "5%", left: "6%", w: 110, h: 50, delay: 0 },
  { top: "10%", left: "55%", w: 95, h: 44, delay: 1.2 },
  { top: "3%", left: "78%", w: 80, h: 38, delay: 2.5 },
];

const SPARKLE_EMOJIS = ["✨", "⭐", "🌟", "✨", "⭐"];

export default function G1SizeLearn({ onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sparkles, setSparkles] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const currentItem = ITEMS[currentIndex];

  const spawnSparkles = () => {
    const newSparkles = SPARKLE_EMOJIS.map((emoji, i) => ({
      id: Date.now() + i,
      emoji,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
    }));
    setSparkles(newSparkles);
  };

  useEffect(() => {
    if (sparkles.length === 0) return;
    const t = setTimeout(() => setSparkles([]), 650);
    return () => clearTimeout(t);
  }, [sparkles]);

  const goNext = () => {
    if (currentIndex < ITEMS.length - 1) {
      playSound("button_click.mp3");
      setCurrentIndex((i) => i + 1);
      spawnSparkles();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      playSound("button_click.mp3");
      setCurrentIndex((i) => i - 1);
      spawnSparkles();
    }
  };

  const handleFinish = () => {
    playSound("correct_answer.mp3");
    onBack();
  };

  const isLast = currentIndex === ITEMS.length - 1;
  const isFirst = currentIndex === 0;
  const isStar = currentItem.id === "star";
  const isBall = currentItem.id === "ball";
  const isCar = currentItem.id === "car";
  const isLargeBigImage = isStar || isCar;
  const isBallLargest = isBall;

  return (
    <motion.div
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #E0F7FA 40%, #C8E6C9 70%, #81C784 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Clouds */}
      {CLOUDS.map((c, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            width: c.w,
            height: c.h,
            background: "white",
            borderRadius: "50%",
            opacity: 0.85,
            filter: "blur(1px)",
            zIndex: 0,
          }}
          animate={{ x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6 + i, ease: "easeInOut", delay: c.delay }}
        />
      ))}

      {/* Green hills */}
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: "-10%",
          width: "60%",
          height: 180,
          background: "#66BB6A",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          right: "-10%",
          width: "65%",
          height: 200,
          background: "#81C784",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <HomeButton onHome={onBack} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "clamp(60px, 8vh, 90px)",
          paddingBottom: 40,
          minHeight: "100vh",
        }}
      >
        {/* Title banner */}
        <motion.div
          style={{
            background: "linear-gradient(135deg, #7B1FA2, #AB47BC)",
            borderRadius: 24,
            padding: "12px 36px",
            boxShadow: "0 6px 20px rgba(123,31,162,0.4)",
            border: "3px solid #9C27B0",
            marginBottom: 12,
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "white",
              textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
          >
            Үлкен және Кіші
          </div>
        </motion.div>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: "clamp(16px, 3vh, 28px)" }}>
          {ITEMS.map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: currentIndex === i ? "#FFD600" : "rgba(255,255,255,0.4)",
                border: currentIndex === i ? "2px solid #FF8F00" : "2px solid transparent",
              }}
              animate={{ scale: currentIndex === i ? 1.3 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>

        {/* Main card with navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(8px, 2vw, 20px)",
            width: "100%",
            padding: "0 12px",
          }}
        >
          {/* Left arrow */}
          <motion.button
            onClick={goPrev}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: isFirst ? "#ccc" : "linear-gradient(135deg, #7B1FA2, #AB47BC)",
              color: "white",
              fontSize: 28,
              fontWeight: 900,
              border: "none",
              boxShadow: isFirst ? "none" : "0 4px 16px rgba(123,31,162,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isFirst ? "default" : "pointer",
              opacity: isFirst ? 0.3 : 1,
              pointerEvents: isFirst ? "none" : "auto",
              flexShrink: 0,
            }}
            whileHover={isFirst ? {} : { scale: 1.1 }}
            whileTap={isFirst ? {} : { scale: 0.9 }}
          >
            ‹
          </motion.button>

          {/* Main comparison card */}
          <motion.div
            style={{
              background: "white",
              borderRadius: 32,
              boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
              border: "4px solid #E1BEE7",
              padding: "clamp(12px, 1.5vw, 20px) clamp(24px, 3vw, 48px)",
              width: "clamp(600px, 85vw, 1300px)",
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              {/* LEFT — ҮЛКЕН */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(36px, 5vw, 60px)",
                    fontWeight: 900,
                    color: "#E65100",
                    textShadow: "2px 2px 0px rgba(0,0,0,0.15)",
                    letterSpacing: 4,
                    marginBottom: 8,
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  ҮЛКЕН
                </div>

                <div
                  style={{
                    height: isBallLargest
                      ? "clamp(420px, 52vh, 760px)"
                      : isLargeBigImage
                        ? "clamp(380px, 47vh, 680px)"
                        : "clamp(340px, 42vh, 620px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentItem.id + "-big"}
                      src={`/assets/big_small_images/${currentItem.file}`}
                      alt={`Үлкен ${currentItem.label}`}
                      style={{
                        width: isBallLargest
                          ? "clamp(420px, 52vh, 760px)"
                          : isLargeBigImage
                            ? "clamp(380px, 47vh, 680px)"
                            : "clamp(340px, 42vh, 620px)",
                        height: isBallLargest
                          ? "clamp(420px, 52vh, 760px)"
                          : isLargeBigImage
                            ? "clamp(380px, 47vh, 680px)"
                            : "clamp(340px, 42vh, 620px)",
                        objectFit: "contain",
                        filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.2))",
                      }}
                      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    />
                  </AnimatePresence>
                </div>

              </div>

              {/* CENTER DIVIDER */}
              <div
                style={{
                  width: 3,
                  height: "clamp(340px, 42vh, 620px)",
                  background:
                    "repeating-linear-gradient(to bottom, #CE93D8, #CE93D8 8px, transparent 8px, transparent 16px)",
                  alignSelf: "center",
                  margin: "0 clamp(8px, 2vw, 16px)",
                  flexShrink: 0,
                }}
              />

              {/* RIGHT — кіші */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(36px, 5vw, 60px)",
                    fontWeight: 900,
                    color: "#1565C0",
                    textShadow: "2px 2px 0px rgba(0,0,0,0.15)",
                    letterSpacing: 4,
                    marginBottom: 8,
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  кіші
                </div>

                <div
                  style={{
                    height: isBallLargest ? "clamp(420px, 52vh, 760px)" : "clamp(340px, 42vh, 620px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentItem.id + "-small"}
                      src={`/assets/big_small_images/${currentItem.file}`}
                      alt={`Кіші ${currentItem.label}`}
                      style={{
                        width: isBallLargest ? "clamp(190px, 24vh, 340px)" : "clamp(150px, 20vh, 280px)",
                        height: isBallLargest ? "clamp(190px, 24vh, 340px)" : "clamp(150px, 20vh, 280px)",
                        objectFit: "contain",
                        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))",
                      }}
                      initial={{ opacity: 0, scale: 0.3, rotate: 10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.3 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
                    />
                  </AnimatePresence>
                </div>

              </div>
            </div>

            {/* Sparkle effects */}
            <AnimatePresence>
              {sparkles.map((s) => (
                <motion.span
                  key={s.id}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    fontSize: 22,
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {s.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Right arrow / finish button */}
          {isLast ? (
            <motion.button
              onClick={handleFinish}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #43A047, #66BB6A)",
                color: "white",
                fontSize: 28,
                fontWeight: 900,
                border: "none",
                boxShadow: "0 4px 16px rgba(67,160,71,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🎉
            </motion.button>
          ) : (
            <motion.button
              onClick={goNext}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7B1FA2, #AB47BC)",
                color: "white",
                fontSize: 28,
                fontWeight: 900,
                border: "none",
                boxShadow: "0 4px 16px rgba(123,31,162,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </motion.button>
          )}
        </div>

        {/* Item counter */}
        <div
          style={{
            marginTop: "clamp(16px, 3vh, 24px)",
            fontSize: 18,
            fontWeight: 800,
            color: "#7B1FA2",
            background: "rgba(255,255,255,0.8)",
            borderRadius: 20,
            padding: "6px 20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {currentIndex + 1} / {ITEMS.length}
        </div>
      </div>
    </motion.div>
  );
}
