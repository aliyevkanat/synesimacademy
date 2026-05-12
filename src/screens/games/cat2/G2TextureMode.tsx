import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

export default function G2TextureMode({ onLearn, onQuiz, onHome }: Props) {
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
        { top: "6%", left: "7%", width: 190, height: 90, delay: 0 },
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

      {/* Bottom hills */}
      <div
        style={{
          position: "absolute",
          background: "#9C27B0",
          borderRadius: "50%",
          bottom: -60,
          left: "-10%",
          width: "60%",
          height: 180,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          background: "#7B1FA2",
          borderRadius: "50%",
          bottom: -80,
          right: "-10%",
          width: "65%",
          height: 200,
          zIndex: 0,
        }}
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
          padding: "90px 20px 48px",
        }}
      >
        {/* Title banner */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{
            background: "linear-gradient(135deg, #9C27B0, #CE93D8)",
            borderRadius: 30,
            padding: "16px 48px",
            boxShadow: "0 8px 24px rgba(156,39,176,0.4)",
            border: "4px solid #7B1FA2",
            marginBottom: "clamp(32px, 5vh, 56px)",
            fontWeight: 900,
            fontSize: "clamp(24px, 4vw, 36px)",
            color: "white",
            textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
            letterSpacing: 2,
          }}
        >
          🛏️ Жұмсақ және Қатты
        </motion.div>

        {/* Cards row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            justifyContent: "center",
          }}
        >
          {/* LEARN card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 170, damping: 16, delay: 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playSound("button_click.mp3");
              onLearn();
            }}
            style={{
              width: "clamp(280px, 35vw, 380px)",
              borderRadius: 28,
              overflow: "hidden",
              cursor: "pointer",
              background:
                "linear-gradient(145deg, #E1BEE7 0%, #CE93D8 45%, #AB47BC 100%)",
              border: "5px solid #7B1FA2",
              boxShadow: "0 10px 40px rgba(171,71,188,0.4)",
            }}
          >
            <div style={{ padding: "24px 20px 16px" }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 28,
                  color: "#4A148C",
                  textShadow: "0 1px 4px rgba(0,0,0,0.12)",
                }}
              >
                Жұмсақ-Қатты
              </div>

              {/* Preview row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  background: "rgba(255,255,255,0.26)",
                  border: "2px solid rgba(255,255,255,0.52)",
                  borderRadius: 18,
                  padding: 14,
                  marginTop: 14,
                }}
              >
                <img
                  src="/assets/hard_soft_images/pillow_soft.png"
                  alt=""
                  style={{
                    width: 92,
                    height: 92,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))",
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
                  src="/assets/hard_soft_images/iron_hard.png"
                  alt=""
                  style={{
                    width: 92,
                    height: 92,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))",
                  }}
                />
              </div>
            </div>

            {/* White footer */}
            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                padding: 20,
                borderRadius: "0 0 24px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "#5D4037",
                  fontWeight: 700,
                  marginBottom: 14,
                  fontSize: 15,
                }}
              >
                Жұмсақ және қатты заттарды үйреніп көр!
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "12px 36px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #9C27B0, #AB47BC)",
                  boxShadow: "0 4px 16px rgba(156,39,176,0.5)",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 18,
                }}
              >
                Бастау ▶
              </div>
            </div>
          </motion.div>

          {/* QUIZ card (ACTIVE) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 170, damping: 16, delay: 0.25 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playSound("button_click.mp3");
              onQuiz();
            }}
            style={{
              width: "clamp(280px, 35vw, 380px)",
              borderRadius: 28,
              overflow: "hidden",
              cursor: "pointer",
              background:
                "linear-gradient(145deg, #80CBC4 0%, #26A69A 45%, #00796B 100%)",
              border: "5px solid #004D40",
              boxShadow: "0 10px 40px rgba(0,121,107,0.4)",
            }}
          >
            <div style={{ padding: "24px 20px 16px" }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 28,
                  color: "white",
                  textShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              >
                Біліміңді тексеріп көр
              </div>

              {/* Preview row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  background: "rgba(255,255,255,0.22)",
                  border: "2px solid rgba(255,255,255,0.45)",
                  borderRadius: 18,
                  padding: 14,
                  marginTop: 14,
                }}
              >
                <img
                  src="/assets/hard_soft_images/bread_soft_game.png"
                  alt=""
                  style={{
                    width: 92,
                    height: 92,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))",
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
                  src="/assets/hard_soft_images/pencil_hard_game.png"
                  alt=""
                  style={{
                    width: 92,
                    height: 92,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))",
                  }}
                />
              </div>
            </div>

            {/* White footer */}
            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                padding: 20,
                borderRadius: "0 0 24px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "#00695C",
                  fontWeight: 700,
                  marginBottom: 14,
                  fontSize: 15,
                }}
              >
                Дұрыс жауапты тандап көр!
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "12px 36px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #26A69A, #00796B)",
                  boxShadow: "0 4px 16px rgba(0,121,107,0.5)",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 18,
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
