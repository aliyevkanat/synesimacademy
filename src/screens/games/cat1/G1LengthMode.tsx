import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

const CLOUDS = [
  { top: "8%", left: "6%", w: 130, h: 58, delay: 0 },
  { top: "14%", left: "58%", w: 105, h: 48, delay: 1.8 },
  { top: "5%", left: "38%", w: 92, h: 44, delay: 3.2 },
  { top: "20%", left: "80%", w: 78, h: 36, delay: 2.2 },
];

const DECOR = [
  { emoji: "✨", top: "28%", left: "92%", size: 26, delay: 0 },
  { emoji: "🌸", top: "62%", left: "8%", size: 28, delay: 0.8 },
  { emoji: "✨", top: "48%", left: "4%", size: 22, delay: 1.4 },
  { emoji: "🌸", top: "72%", left: "88%", size: 24, delay: 0.4 },
];

const BASE = "/assets/short_long_images";

export default function G1LengthMode({ onLearn, onQuiz, onHome }: Props) {
  return (
    <motion.div
      style={{
        background: "linear-gradient(180deg, #FFAB91 0%, #FFCCBC 28%, #FFE0B2 55%, #FFCC80 78%, #A5D6A7 100%)",
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
            background: "rgba(255,255,255,0.92)",
            borderRadius: "50%",
            opacity: 0.88,
            filter: "blur(1px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
          animate={{ x: [0, 24, 0] }}
          transition={{ repeat: Infinity, duration: 7 + i * 0.4, ease: "easeInOut", delay: c.delay }}
        />
      ))}

      {DECOR.map((d, i) => (
        <motion.div
          key={`d-${i}`}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            fontSize: d.size,
            opacity: 0.75,
            zIndex: 0,
            pointerEvents: "none",
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3.2 + i * 0.4, ease: "easeInOut", delay: d.delay }}
        >
          {d.emoji}
        </motion.div>
      ))}

      <div
        style={{
          position: "absolute",
          bottom: -70,
          left: "-12%",
          width: "58%",
          height: 190,
          background: "#81C784",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -85,
          right: "-12%",
          width: "62%",
          height: 210,
          background: "#A5D6A7",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
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
        <motion.div
          style={{
            background: "linear-gradient(135deg, #FF7043, #FF8A65)",
            borderRadius: 30,
            padding: "16px 48px",
            boxShadow: "0 10px 32px rgba(255,112,67,0.45)",
            border: "4px solid #FF5722",
            marginBottom: "clamp(32px, 5vh, 56px)",
          }}
          initial={{ opacity: 0, y: -36, scale: 0.82 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: "clamp(24px, 4vw, 36px)",
              color: "white",
              textShadow: "2px 2px 0px rgba(0,0,0,0.25)",
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            🐰 Ұзын және Қысқа
          </div>
        </motion.div>

        <div
          style={{
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "0 16px",
          }}
        >
          <motion.div
            role="button"
            tabIndex={0}
            onClick={() => {
              playSound("button_click.mp3");
              onLearn();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                playSound("button_click.mp3");
                onLearn();
              }
            }}
            style={{
              background: "linear-gradient(145deg, #FFF3E0, #FFCC80)",
              border: "5px solid #FF8A65",
              borderRadius: 28,
              boxShadow: "0 12px 44px rgba(255,138,101,0.42)",
              width: "clamp(280px, 35vw, 380px)",
              cursor: "pointer",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 48, scale: 0.86 }}
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
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#BF360C",
                  textShadow: "1px 1px 0px rgba(255,255,255,0.6)",
                  marginBottom: 16,
                }}
              >
                Ұзын қысқа
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
                  src={`${BASE}/big_pencil.png`}
                  alt=""
                  style={{
                    width: 108,
                    height: 108,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.22))",
                  }}
                />
                <div
                  style={{
                    background: "white",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 900,
                    color: "#888",
                    flexShrink: 0,
                  }}
                >
                  vs
                </div>
                <img
                  src={`${BASE}/small_pencil.png`}
                  alt=""
                  style={{
                    width: 58,
                    height: 58,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.2))",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FFF8F5 100%)",
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
                Ұзын мен қысқа заттарды суреттермен таныс!
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #FF7043, #FF8A65)",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 18,
                  borderRadius: 50,
                  padding: "14px 0",
                  width: "85%",
                  margin: "0 auto",
                  textAlign: "center",
                  boxShadow: "0 4px 18px rgba(255,112,67,0.5)",
                }}
              >
                Бастау ▶
              </div>
            </div>
          </motion.div>

          <motion.div
            role="button"
            tabIndex={0}
            onClick={() => {
              playSound("button_click.mp3");
              onQuiz();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                playSound("button_click.mp3");
                onQuiz();
              }
            }}
            style={{
              background: "linear-gradient(145deg, #E8F5E9, #A5D6A7)",
              border: "5px solid #66BB6A",
              borderRadius: 28,
              boxShadow: "0 12px 40px rgba(102,187,106,0.34)",
              width: "clamp(280px, 35vw, 380px)",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              opacity: 1,
            }}
            initial={{ opacity: 0, y: 48, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.22, type: "spring", stiffness: 180 }}
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
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#2E7D32",
                  marginBottom: 12,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Біліміңді тексеріп көр
              </div>

              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#388E3C",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                Суреттерден дұрыс жауапты таңда!
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
                  src={`${BASE}/longer_train.png`}
                  alt=""
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.22))",
                  }}
                />
                <div
                  style={{
                    background: "white",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 900,
                    color: "#888",
                    flexShrink: 0,
                  }}
                >
                  vs
                </div>
                <img
                  src={`${BASE}/shorter_train.png`}
                  alt=""
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.2))",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                padding: "28px 20px 22px",
                borderRadius: "0 0 24px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#2E7D32",
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                Дайын болсаң, бастайық!
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
                  margin: "6px auto 0",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(76,175,80,0.45)",
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
