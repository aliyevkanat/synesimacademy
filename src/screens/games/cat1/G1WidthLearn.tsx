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
    id: "tree",
    thickSrc: "/assets/thin_thick_images/thick_tree.png",
    thinSrc: "/assets/thin_thick_images/thin_tree.png",
  },
  {
    id: "pencil",
    thickSrc: "/assets/thin_thick_images/thick_pencil.png",
    thinSrc: "/assets/thin_thick_images/thin_pencil.png",
  },
  {
    id: "thread",
    thickSrc: "/assets/thin_thick_images/thick_thread.png",
    thinSrc: "/assets/thin_thick_images/thin_thread.png",
  },
  {
    id: "book",
    thickSrc: "/assets/thin_thick_images/thick_book.png",
    thinSrc: "/assets/thin_thick_images/thin_book.png",
  },
];

export default function G1WidthLearn({ onBack, onHome }: Props) {
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
    playSound("button_click.mp3");
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
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0%, transparent 35%), linear-gradient(180deg, #bfe8ff 0%, #d7d8ff 50%, #f8f0ff 100%)",
      }}
    >
      <HomeButton onHome={onHome} />

      <motion.div
        style={{ position: "absolute", top: "10%", left: "8%", width: 160, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.6)" }}
        animate={{ x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
      />
      <motion.div
        style={{ position: "absolute", top: "17%", right: "10%", width: 120, height: 62, borderRadius: "50%", background: "rgba(255,255,255,0.55)" }}
        animate={{ x: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.div
        style={{ position: "absolute", left: "5%", top: "42%", fontSize: 24, opacity: 0.3 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.3 }}
      >
        ✨
      </motion.div>
      <motion.div
        style={{ position: "absolute", right: "7%", top: "38%", fontSize: 30, opacity: 0.28 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
      >
        🌟
      </motion.div>

      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "74px 14px 20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 185, damping: 17 }}
          style={{
            width: "min(1420px, 100%)",
            borderRadius: 40,
            background:
              "radial-gradient(circle at 20% 5%, rgba(255,221,159,0.28) 0%, transparent 44%), radial-gradient(circle at 85% 10%, rgba(142,219,255,0.35) 0%, transparent 46%), #fffef8",
            border: "3px solid rgba(255,255,255,0.82)",
            boxShadow: "0 18px 42px rgba(72,75,122,0.24)",
            padding: "30px clamp(24px, 3vw, 44px) 28px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, padding: "0 6px" }}>
            <div style={{ fontWeight: 900, color: "#ea6b31", fontSize: "clamp(32px, 4.1vw, 52px)", lineHeight: 1 }}>жуан</div>
            <div style={{ fontWeight: 900, color: "#2f78d4", fontSize: "clamp(32px, 4.1vw, 52px)", lineHeight: 1 }}>жіңішке</div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto 1fr auto",
                alignItems: "center",
                gap: "clamp(12px, 1.8vw, 22px)",
              }}
            >
              <motion.button
                whileHover={isFirst ? {} : { scale: 1.08 }}
                whileTap={isFirst ? {} : { scale: 0.94 }}
                onClick={handlePrev}
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
                  fontSize: 36,
                  color: "#fff",
                  background: "linear-gradient(135deg, #5d84f2, #7d63ef)",
                  boxShadow: "0 8px 18px rgba(95,110,229,0.35)",
                  opacity: isFirst ? 0.55 : 1,
                  alignSelf: "center",
                }}
                aria-label="Previous example"
              >
                ‹
              </motion.button>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "clamp(300px, 52vh, 560px)" }}>
                <img
                  src={current.thickSrc}
                  alt="Жуан сурет"
                  style={{
                    width: "clamp(260px, 34vw, 460px)",
                    maxWidth: "100%",
                    maxHeight: "clamp(300px, 50vh, 540px)",
                    objectFit: "contain",
                    filter: "drop-shadow(0 10px 18px rgba(76,84,126,0.2))",
                  }}
                />
              </div>

              <div style={{ width: 3, height: "clamp(260px, 48vh, 500px)", background: "linear-gradient(180deg, rgba(241,161,117,0.4), rgba(93,166,242,0.45))", borderRadius: 20 }} />

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "clamp(300px, 52vh, 560px)" }}>
                <img
                  src={current.thinSrc}
                  alt="Жіңішке сурет"
                  style={{
                    width: "clamp(260px, 34vw, 460px)",
                    maxWidth: "100%",
                    maxHeight: "clamp(300px, 50vh, 540px)",
                    objectFit: "contain",
                    filter: "drop-shadow(0 10px 18px rgba(76,84,126,0.2))",
                  }}
                />
              </div>

              <motion.button
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
                  fontSize: 36,
                  color: "#fff",
                  background: isLast ? "linear-gradient(135deg, #39b36c, #4fd0a1)" : "linear-gradient(135deg, #5d84f2, #7d63ef)",
                  boxShadow: isLast ? "0 8px 18px rgba(57,179,108,0.33)" : "0 8px 18px rgba(95,110,229,0.35)",
                  alignSelf: "center",
                }}
              >
                {isLast ? "✅" : "›"}
              </motion.button>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 18, gap: 12 }}>
            {SLIDES.map((slide, dotIndex) => (
              <motion.div
                key={slide.id}
                animate={dotIndex === index ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={dotIndex === index ? { duration: 0.8, repeat: Infinity } : { duration: 0.2 }}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: dotIndex === index ? "#6b6ff5" : "rgba(86,94,140,0.26)",
                  boxShadow: dotIndex === index ? "0 0 0 3px rgba(108,111,245,0.18)" : "none",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
