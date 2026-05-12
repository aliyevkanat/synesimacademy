import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onBack: () => void;
  onHome: () => void;
}

const SLIDES = [
  {
    leftImage: "/assets/tasty/zhagumdy/pleasant_rose.png",
    rightImage: "/assets/tasty/zhagumdy/smelly_garbage.png",
  },
  {
    leftImage: "/assets/tasty/zhagumdy/pleasant_bread.png",
    rightImage: "/assets/tasty/zhagumdy/smelly_apple.png",
  },
  {
    leftImage: "/assets/tasty/zhagumdy/pleasant_parfume.png",
    rightImage: "/assets/tasty/zhagumdy/smelly_socks.png",
  },
];

export default function G3SmellLearn({ onBack, onHome }: Props) {
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
    if (isLast) {
      onBack();
    } else {
      setIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
        background: "linear-gradient(160deg, #FCE4EC 0%, #F8BBD0 40%, #FFF9C4 100%)",
      }}
    >
      <HomeButton onHome={onHome} />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px 40px",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(80px, 20vw, 240px)",
            marginTop: 20,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 5vw, 56px)",
              color: "#E91E63",
              textShadow: "2px 3px 0 rgba(0,0,0,0.12)",
              letterSpacing: 2,
            }}
          >
            Жағымды
          </span>
          <span
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 5vw, 56px)",
              color: "#5D4037",
              textShadow: "2px 3px 0 rgba(0,0,0,0.12)",
              letterSpacing: 2,
            }}
          >
            Жағымсыз
          </span>
        </motion.div>

        <div
          style={{
            width: "clamp(700px, 88vw, 1100px)",
            margin: "0 auto",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 36,
            border: "5px solid #F48FB1",
            boxShadow: "0 16px 56px rgba(0,0,0,0.11)",
            padding: "32px clamp(20px, 4vw, 60px) 40px",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0,
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                }}
              >
                <motion.img
                  key={`left-${index}`}
                  initial={{ opacity: 0, scale: 0.55 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  src={current.leftImage}
                  alt=""
                  style={{
                    width: "clamp(180px, 25vw, 320px)",
                    height: "clamp(180px, 25vw, 320px)",
                    objectFit: "contain",
                    filter: "drop-shadow(4px 8px 20px rgba(233,30,99,0.15))",
                  }}
                />
              </div>

              <div
                style={{
                  width: 5,
                  height: "clamp(240px, 35vh, 380px)",
                  background:
                    "repeating-linear-gradient(to bottom, #F48FB1, #F48FB1 10px, transparent 10px, transparent 20px)",
                  borderRadius: 3,
                  flexShrink: 0,
                  alignSelf: "center",
                }}
              />

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                }}
              >
                <motion.img
                  key={`right-${index}`}
                  initial={{ opacity: 0, scale: 0.55 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  src={current.rightImage}
                  alt=""
                  style={{
                    width: "clamp(180px, 25vw, 320px)",
                    height: "clamp(180px, 25vw, 320px)",
                    objectFit: "contain",
                    filter: "drop-shadow(4px 8px 20px rgba(93,64,55,0.18))",
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "clamp(-16px, -2vw, -24px)",
              top: "50%",
              transform: "translateY(-50%)",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F48FB1, #880E4F)",
              border: "4px solid white",
              boxShadow: "0 4px 16px rgba(136,14,79,0.4)",
              cursor: isFirst ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: "white",
              opacity: isFirst ? 0 : 1,
              pointerEvents: isFirst ? "none" : "auto",
            }}
            aria-label="Previous slide"
          >
            ◄
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "clamp(-16px, -2vw, -24px)",
              top: "50%",
              transform: "translateY(-50%)",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F48FB1, #880E4F)",
              border: "4px solid white",
              boxShadow: "0 4px 16px rgba(136,14,79,0.4)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: "white",
            }}
            aria-label="Next slide"
          >
            ►
          </motion.button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 24,
          }}
        >
          {SLIDES.map((_, dotIndex) => (
            <motion.div
              key={dotIndex}
              animate={dotIndex === index ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={
                dotIndex === index
                  ? { duration: 0.8, repeat: Infinity }
                  : { duration: 0.2 }
              }
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background:
                  dotIndex === index
                    ? "#E91E63"
                    : dotIndex < index
                    ? "#F48FB1"
                    : "rgba(0,0,0,0.12)",
                boxShadow:
                  dotIndex === index
                    ? "0 0 0 3px rgba(233,30,99,0.2)"
                    : "none",
              }}
            />
          ))}
        </div>

        {isLast && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound("button_click.mp3");
              onBack();
            }}
            style={{
              marginTop: 16,
              padding: "14px 48px",
              borderRadius: 50,
              background: "linear-gradient(135deg, #F48FB1, #880E4F)",
              color: "white",
              fontWeight: 900,
              fontSize: 20,
              fontFamily: "Fredoka, Nunito, sans-serif",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 5px 0 #560027",
            }}
          >
            Дайын ✓
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
