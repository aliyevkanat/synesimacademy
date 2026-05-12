import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

const CLOUDS = [
  { top: "6%", left: "8%", w: 120, h: 55, delay: 0 },
  { top: "12%", left: "60%", w: 100, h: 48, delay: 1.5 },
  { top: "4%", left: "35%", w: 90, h: 42, delay: 3 },
  { top: "18%", left: "82%", w: 80, h: 38, delay: 2 },
];

const FLOWERS = [
  { emoji: "🌸", top: "70%", left: "10%", size: 28, delay: 0 },
  { emoji: "🦋", top: "30%", left: "90%", size: 26, delay: 1 },
  { emoji: "🌼", top: "55%", left: "85%", size: 30, delay: 0.5 },
  { emoji: "🌸", top: "65%", left: "4%", size: 24, delay: 1.5 },
  { emoji: "🦋", top: "25%", left: "5%", size: 22, delay: 2 },
];

export default function G1SizeMode({ onLearn, onQuiz, onHome }: Props) {
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

      {/* Floating flowers/butterflies */}
      {FLOWERS.map((f, i) => (
        <motion.div
          key={`flower-${i}`}
          style={{
            position: "absolute",
            top: f.top,
            left: f.left,
            fontSize: f.size,
            opacity: 0.7,
            zIndex: 0,
            pointerEvents: "none",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut", delay: f.delay }}
        >
          {f.emoji}
        </motion.div>
      ))}

      {/* Green hills at bottom */}
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

      <HomeButton onHome={onHome} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "clamp(60px, 8vh, 100px)",
          paddingBottom: 60,
          minHeight: "100vh",
        }}
      >
        {/* Title banner */}
        <motion.div
          style={{
            background: "linear-gradient(135deg, #FF6F00, #FFB300)",
            borderRadius: 30,
            padding: "16px 48px",
            boxShadow: "0 8px 24px rgba(255,111,0,0.4)",
            border: "4px solid #FF8F00",
            marginBottom: "clamp(32px, 5vh, 56px)",
          }}
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: "clamp(24px, 4vw, 36px)",
              color: "white",
              textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            🐻 Үлкен және Кіші
          </div>
        </motion.div>

        {/* Two game cards */}
        <div
          style={{
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "0 16px",
          }}
        >
          {/* LEFT CARD — Learn */}
          <motion.div
            onClick={() => {
              playSound("button_click.mp3");
              onLearn();
            }}
            style={{
              background: "linear-gradient(145deg, #FFE082, #FFB300)",
              border: "5px solid #F57F17",
              borderRadius: 28,
              boxShadow: "0 10px 40px rgba(245,127,23,0.4)",
              width: "clamp(280px, 35vw, 380px)",
              cursor: "pointer",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 180 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              style={{
                padding: "24px 20px 26px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#4E342E",
                  textShadow: "1px 1px 0px rgba(255,255,255,0.5)",
                  marginBottom: 16,
                }}
              >
                Үлкен-кіші
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <img
                  src="/assets/big_small_images/rabbit.png"
                  alt="big rabbit"
                  style={{
                    width: 118,
                    height: 118,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))",
                  }}
                />
                <div
                  style={{
                    background: "white",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 900,
                    color: "#888",
                    flexShrink: 0,
                  }}
                >
                  vs
                </div>
                <img
                  src="/assets/big_small_images/rabbit.png"
                  alt="small rabbit"
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                background: "white",
                padding: 20,
                borderRadius: "0 0 24px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#5D4037",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                Үлкен мен кіші заттарды үйреніп көр!
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #FF6F00, #FF8F00)",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 18,
                  borderRadius: 50,
                  padding: "14px 0",
                  width: "85%",
                  margin: "0 auto",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(255,111,0,0.5)",
                }}
              >
                Бастау ▶
              </div>
            </div>
          </motion.div>

          {/* RIGHT CARD — Quiz */}
          <motion.div
            onClick={() => {
              playSound("button_click.mp3");
              onQuiz();
            }}
            style={{
              background: "linear-gradient(145deg, #A5D6A7, #66BB6A)",
              border: "5px solid #43A047",
              borderRadius: 28,
              boxShadow: "0 10px 40px rgba(67,160,71,0.4)",
              width: "clamp(280px, 35vw, 380px)",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
            }}
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 180 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              style={{
                padding: "24px 20px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#1B5E20",
                  textShadow: "1px 1px 0px rgba(255,255,255,0.5)",
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                Біліміңді тексеріп көр
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <img
                  src="/assets/big_small_images/watermelon.png"
                  alt="watermelon"
                  style={{
                    width: 104,
                    height: 104,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))",
                  }}
                />
                <div
                  style={{
                    background: "white",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 900,
                    color: "#888",
                    flexShrink: 0,
                  }}
                >
                  vs
                </div>
                <img
                  src="/assets/big_small_images/spoon.png"
                  alt="spoon"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                background: "white",
                padding: 20,
                borderRadius: "0 0 24px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#2E7D32",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                Қайсысы үлкен? Қайсысы кіші? Тексер!
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #43A047, #66BB6A)",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 18,
                  borderRadius: 50,
                  padding: "14px 0",
                  width: "85%",
                  margin: "0 auto",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(67,160,71,0.5)",
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
