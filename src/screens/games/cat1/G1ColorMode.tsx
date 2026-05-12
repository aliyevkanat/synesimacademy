import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface G1ColorModeProps {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

export default function G1ColorMode({ onLearn, onQuiz, onHome }: G1ColorModeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
        backgroundImage: "url('/assets/tuster/tuster_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subtle dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.14) 100%)",
          pointerEvents: "none",
        }}
      />

      <HomeButton onHome={onHome} />

      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(70px, 8vh, 100px) 20px 48px",
        }}
      >
        {/* Title pill */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
          style={{
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255,255,255,0.55)",
            borderRadius: 24,
            padding: "12px 32px",
            marginBottom: "clamp(20px, 3vh, 32px)",
            fontWeight: 900,
            fontSize: "clamp(22px, 3vw, 34px)",
            color: "#1a1a1a",
            textShadow: "1px 1px 0 rgba(255,255,255,0.5)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          }}
        >
          🎨 Түстер
        </motion.div>

        {/* Cards row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(20px, 3vw, 36px)",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {/* Card 1 — Learn */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 170, damping: 16 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playSound("button_click.mp3");
              onLearn();
            }}
            style={{
              width: "clamp(300px, 38vw, 460px)",
              borderRadius: 28,
              overflow: "hidden",
              border: "3px solid rgba(255,255,255,0.6)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.22)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(145deg, #FFD57E 0%, #FF9F80 45%, #FF6EB4 100%)",
                padding: "22px 14px 16px",
                flex: "0 0 auto",
              }}
            >
              <div
                style={{
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.25)",
                  border: "2px solid rgba(255,255,255,0.50)",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 140,
                }}
              >
                <img
                  src="/assets/tuster/tuster_theory.png"
                  alt="Үйрену"
                  style={{
                    maxHeight: 130,
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.15))",
                  }}
                  draggable={false}
                />
              </div>
            </div>

            {/* White footer */}
            <div
              style={{
                background: "rgba(255,255,255,0.93)",
                padding: "16px 20px 20px",
                textAlign: "center",
                flex: "1 1 auto",
              }}
            >
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  color: "#7C3700",
                  textShadow: "0 1px 0 rgba(255,255,255,0.5)",
                  marginBottom: 8,
                }}
              >
                Түстерді үйренейік
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #FF9F80, #FF6EB4)",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 17,
                  borderRadius: 999,
                  padding: "11px 0",
                  width: "80%",
                  margin: "0 auto",
                  boxShadow: "0 6px 16px rgba(255,110,180,0.38)",
                }}
              >
                Бастау ▶
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 170, damping: 16, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playSound("button_click.mp3");
              onQuiz();
            }}
            style={{
              width: "clamp(300px, 38vw, 460px)",
              borderRadius: 28,
              overflow: "hidden",
              border: "3px solid rgba(255,255,255,0.6)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.22)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(145deg, #7EB8FF 0%, #5B9BFF 45%, #3A7BD5 100%)",
                padding: "22px 14px 16px",
                flex: "0 0 auto",
              }}
            >
              <div
                style={{
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.25)",
                  border: "2px solid rgba(255,255,255,0.50)",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 140,
                }}
              >
                <img
                  src="/assets/tuster/tuster_practice.png"
                  alt="Тексеру"
                  style={{
                    maxHeight: 130,
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.15))",
                  }}
                  draggable={false}
                />
              </div>
            </div>

            {/* White footer */}
            <div
              style={{
                background: "rgba(255,255,255,0.93)",
                padding: "16px 20px 20px",
                textAlign: "center",
                flex: "1 1 auto",
              }}
            >
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(16px, 2.2vw, 22px)",
                  color: "#0A2E6E",
                  marginBottom: 8,
                }}
              >
                Біліміңді тексеріп көр
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #5B9BFF, #3A7BD5)",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 17,
                  borderRadius: 999,
                  padding: "11px 0",
                  width: "80%",
                  margin: "0 auto",
                  boxShadow: "0 6px 16px rgba(58,123,213,0.38)",
                }}
              >
                Бастау ▶
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
