import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onBack: () => void;
  /** Same pattern as G1SizeLearn: HomeButton returns to mode hub (not main menu). */
  onHome: () => void;
}

const BASE = "/assets/short_long_images";

const SLIDES = [
  { id: "pencils", longFile: "big_pencil.png", shortFile: "small_pencil.png" },
  { id: "carrots", longFile: "big_carrot.png", shortFile: "small_carrot.png" },
  { id: "snakes", longFile: "big_snake.png", shortFile: "small_snake.png" },
  { id: "people", longFile: "big_girl.png", shortFile: "small_boy.png" },
];

const CLOUDS = [
  { top: "7%", left: "7%", w: 118, h: 52, delay: 0 },
  { top: "12%", left: "52%", w: 98, h: 46, delay: 1.4 },
  { top: "4%", left: "76%", w: 84, h: 40, delay: 2.6 },
];

const SPARKLE_EMOJIS = ["✨", "⭐", "🌟", "✨"];

export default function G1LengthLearn({ onBack, onHome: _onHome }: Props) {
  void _onHome;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sparkles, setSparkles] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const slide = SLIDES[currentIndex];

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
    if (currentIndex < SLIDES.length - 1) {
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
    playSound("button_click.mp3");
    playSound("correct_answer.mp3");
    onBack();
  };

  const isLast = currentIndex === SLIDES.length - 1;
  const isFirst = currentIndex === 0;
  /** Taller image row for mostly-vertical «ұзын» assets (pencil, carrot, tall girl). */
  const isTallLongSlide =
    slide.id === "pencils" || slide.id === "carrots" || slide.id === "people";
  /** Horizontal «ұзын» asset: let it span the column width (was capped at 420px). */
  const isWideLongSlide = slide.id === "snakes";
  const isPeopleSlide = slide.id === "people";
  const isPencilsSlide = slide.id === "pencils";
  const imageAreaHeight = isTallLongSlide
    ? isPencilsSlide
      ? "clamp(320px, 56vh, 660px)"
      : "clamp(300px, 48vh, 580px)"
    : isWideLongSlide
      ? "clamp(260px, 38vh, 480px)"
      : "clamp(240px, 32vh, 440px)";
  /** Snakes: short snake stays bottom-aligned; long column always centers its image vertically. */
  const shortImageAreaAlign = isWideLongSlide ? ("flex-end" as const) : ("center" as const);

  return (
    <motion.div
      style={{
        background: "linear-gradient(180deg, #FFAB91 0%, #FFCCBC 30%, #FFE0B2 58%, #FFCC80 82%, #A5D6A7 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {CLOUDS.map((c, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            width: c.w,
            height: c.h,
            background: "rgba(255,255,255,0.9)",
            borderRadius: "50%",
            opacity: 0.86,
            filter: "blur(1px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
          animate={{ x: [0, 22, 0] }}
          transition={{ repeat: Infinity, duration: 6.5 + i * 0.5, ease: "easeInOut", delay: c.delay }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          bottom: -65,
          left: "-10%",
          width: "58%",
          height: 185,
          background: "#81C784",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -82,
          right: "-10%",
          width: "62%",
          height: 205,
          background: "#A5D6A7",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
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
        <motion.div
          style={{
            background: "linear-gradient(135deg, #FF7043, #FF8A65)",
            borderRadius: 24,
            padding: "12px 36px",
            boxShadow: "0 8px 24px rgba(255,112,67,0.4)",
            border: "3px solid #FF5722",
            marginBottom: 12,
          }}
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "white",
              textShadow: "2px 2px 0px rgba(0,0,0,0.22)",
              textAlign: "center",
            }}
          >
            Ұзын және Қысқа
          </div>
        </motion.div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: "clamp(16px, 3vh, 28px)" }}>
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: currentIndex === i ? "#FF7043" : "rgba(255,255,255,0.45)",
                border: currentIndex === i ? "2px solid #E64A19" : "2px solid transparent",
              }}
              animate={{ scale: currentIndex === i ? 1.3 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(8px, 2vw, 20px)",
            width: "100%",
            padding: "0 clamp(12px, 2vw, 28px)",
          }}
        >
          <motion.button
            type="button"
            onClick={goPrev}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: isFirst ? "#ccc" : "linear-gradient(135deg, #FF7043, #FF8A65)",
              color: "white",
              fontSize: 28,
              fontWeight: 900,
              border: "none",
              boxShadow: isFirst ? "none" : "0 4px 16px rgba(255,112,67,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isFirst ? "default" : "pointer",
              opacity: isFirst ? 0.25 : 1,
              pointerEvents: isFirst ? "none" : "auto",
              flexShrink: 0,
            }}
            whileHover={isFirst ? {} : { scale: 1.1 }}
            whileTap={isFirst ? {} : { scale: 0.9 }}
            aria-label="Алдыңғы"
          >
            ‹
          </motion.button>

          <motion.div
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #FFF5F0 100%)",
              borderRadius: 32,
              boxShadow: "0 14px 48px rgba(255,112,67,0.2), 0 4px 0 rgba(255,138,101,0.15)",
              border: "5px solid #FFAB91",
              padding: "clamp(20px, 2.8vw, 32px) clamp(28px, 3.2vw, 52px)",
              width: "clamp(580px, 88vw, 1320px)",
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(32px, 4.8vw, 56px)",
                    fontWeight: 900,
                    color: "#D84315",
                    textShadow: "2px 2px 0px rgba(255,255,255,0.5)",
                    letterSpacing: 2,
                    marginBottom: 10,
                    minHeight: "clamp(48px, 7vh, 64px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  Ұзын
                </div>
                <div
                  style={{
                    height: imageAreaHeight,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${slide.id}-long`}
                      src={`${BASE}/${slide.longFile}`}
                      alt=""
                      style={{
                        maxWidth: isWideLongSlide
                          ? "100%"
                          : isPencilsSlide
                            ? "min(98%, 700px)"
                            : isTallLongSlide
                              ? "min(96%, 560px)"
                              : "min(92%, 420px)",
                        maxHeight: "100%",
                        width: "auto",
                        height: isTallLongSlide ? "100%" : "auto",
                        objectFit: "contain",
                        filter: "drop-shadow(4px 8px 16px rgba(0,0,0,0.22))",
                      }}
                      initial={{ opacity: 0, x: -28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 28 }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    />
                  </AnimatePresence>
                </div>
              </div>

              <div
                style={{
                  width: 4,
                  alignSelf: "stretch",
                  minHeight: imageAreaHeight,
                  margin: "clamp(48px, 7vh, 64px) clamp(6px, 1.5vw, 14px) 0",
                  background:
                    "repeating-linear-gradient(to bottom, #FFAB91, #FFAB91 8px, transparent 8px, transparent 16px)",
                  flexShrink: 0,
                  borderRadius: 2,
                }}
              />

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(32px, 4.8vw, 56px)",
                    fontWeight: 900,
                    color: "#E65100",
                    textShadow: "2px 2px 0px rgba(255,255,255,0.5)",
                    letterSpacing: 2,
                    marginBottom: 10,
                    minHeight: "clamp(48px, 7vh, 64px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  Қысқа
                </div>
                <div
                  style={{
                    height: imageAreaHeight,
                    width: "100%",
                    display: "flex",
                    alignItems: shortImageAreaAlign,
                    justifyContent: "center",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${slide.id}-short`}
                      src={`${BASE}/${slide.shortFile}`}
                      alt=""
                      style={{
                        maxWidth: isPeopleSlide
                          ? "min(84%, 320px)"
                          : isPencilsSlide
                            ? "min(84%, 325px)"
                            : "min(78%, 280px)",
                        maxHeight: isWideLongSlide
                          ? "100%"
                          : isPeopleSlide
                            ? "min(100%, 380px)"
                            : isPencilsSlide
                              ? "min(100%, 385px)"
                              : "min(100%, 320px)",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        filter: "drop-shadow(3px 6px 14px rgba(0,0,0,0.2))",
                        marginBottom: isWideLongSlide ? "clamp(10px, 1.6vh, 20px)" : undefined,
                      }}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -28 }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>

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

          {isLast ? (
            <motion.button
              type="button"
              onClick={handleFinish}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #66BB6A, #81C784)",
                color: "white",
                fontSize: 28,
                fontWeight: 900,
                border: "none",
                boxShadow: "0 4px 16px rgba(102,187,106,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Аяқтау"
            >
              🎉
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={goNext}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF7043, #FF8A65)",
                color: "white",
                fontSize: 28,
                fontWeight: 900,
                border: "none",
                boxShadow: "0 4px 16px rgba(255,112,67,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Келесі"
            >
              ›
            </motion.button>
          )}
        </div>

        <div
          style={{
            marginTop: "clamp(16px, 3vh, 24px)",
            fontSize: 18,
            fontWeight: 800,
            color: "#BF360C",
            background: "rgba(255,255,255,0.88)",
            borderRadius: 20,
            padding: "6px 20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          {currentIndex + 1} / {SLIDES.length}
        </div>
      </div>
    </motion.div>
  );
}
