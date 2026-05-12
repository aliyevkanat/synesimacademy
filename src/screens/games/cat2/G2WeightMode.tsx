import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

export default function G2WeightMode({ onLearn, onQuiz, onHome }: Props) {
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

      <motion.div
        style={{
          position: "absolute",
          top: "8%",
          left: "7%",
          width: 180,
          height: 90,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.56)",
          filter: "blur(1px)",
        }}
        animate={{ x: [0, 18, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "12%",
          right: "12%",
          width: 130,
          height: 64,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.48)",
          filter: "blur(1px)",
        }}
        animate={{ x: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "24%",
          left: "43%",
          width: 150,
          height: 70,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.34)",
          filter: "blur(1px)",
        }}
        animate={{ x: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 0.4 }}
      />

      <div
        style={{
          position: "absolute",
          left: "-10%",
          bottom: "-22%",
          width: "60%",
          height: "50%",
          borderRadius: "100%",
          background: "#F57F17",
          borderTop: "8px solid #E65100",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-12%",
          bottom: "-18%",
          width: "68%",
          height: "48%",
          borderRadius: "100%",
          background: "#E65100",
          borderTop: "8px solid #BF360C",
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
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 190, damping: 16 }}
          style={{
            marginBottom: 32,
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "wrap",
            gap: 32,
            width: "100%",
          }}
        >
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
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
              minHeight: "clamp(440px, 52vh, 520px)",
              borderRadius: 28,
              overflow: "hidden",
              cursor: "pointer",
              border: "5px solid #F57F17",
              padding: 0,
              textAlign: "left",
              boxShadow: "0 10px 40px rgba(255,143,0,0.4)",
              background: "linear-gradient(145deg, #FFE082 0%, #FFB300 45%, #FF8F00 100%)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "24px 22px 16px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 900, color: "#4E342E", textAlign: "center" }}>
                Ауыр-Жеңіл
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  background: "rgba(255,255,255,0.26)",
                  border: "2px solid rgba(255,255,255,0.52)",
                  borderRadius: 18,
                  padding: 14,
                  marginTop: 14,
                  minHeight: 132,
                }}
              >
                <img src="/assets/heavy_light_images/watermelon_heavy.png" alt="" style={{ width: 90, height: 90, objectFit: "contain" }} />
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
                <img src="/assets/heavy_light_images/key_light.png" alt="" style={{ width: 90, height: 90, objectFit: "contain" }} />
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                padding: "14px 18px 22px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
              }}
            >
              <div style={{ color: "#4E342E", fontWeight: 800, marginBottom: 10, fontSize: 15 }}>
                Ауыр және жеңіл заттарды үйреніп көр!
              </div>
              <div
                style={{
                  width: "80%",
                  margin: "18px auto 0",
                  borderRadius: 999,
                  padding: "12px 0",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 18,
                  background: "linear-gradient(135deg, #FF6F00, #FF8F00)",
                  boxShadow: "0 8px 18px rgba(255,111,0,0.33)",
                }}
              >
                Бастау ▶
              </div>
            </div>
          </motion.button>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 170, damping: 16, delay: 0.25 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playSound("button_click.mp3");
              onQuiz();
            }}
            style={{
              width: "clamp(280px, 35vw, 380px)",
              minHeight: "clamp(440px, 52vh, 520px)",
              borderRadius: 28,
              overflow: "hidden",
              cursor: "pointer",
              border: "5px solid #6A1B9A",
              padding: 0,
              textAlign: "left",
              boxShadow: "0 10px 40px rgba(106,27,154,0.4)",
              background: "linear-gradient(145deg, #CE93D8 0%, #AB47BC 45%, #7B1FA2 100%)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "24px 22px 16px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 900, color: "white", textAlign: "center" }}>
                Біліміңді тексеріп көр
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.26)",
                  border: "2px solid rgba(255,255,255,0.52)",
                  borderRadius: 18,
                  padding: 14,
                  marginTop: 14,
                  minHeight: 132,
                  fontSize: 80,
                }}
              >
                ⚖️
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.92)", padding: "14px 18px 22px", textAlign: "center" }}>
              <div style={{ color: "#4E342E", fontWeight: 800, marginBottom: 12, fontSize: 15 }}>
                Дұрыс жауапты таңдап көр
              </div>
              <div
                style={{
                  width: "80%",
                  margin: "0 auto",
                  borderRadius: 999,
                  padding: "12px 0",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 18,
                  background: "linear-gradient(135deg, #AB47BC, #7B1FA2)",
                  boxShadow: "0 8px 18px rgba(123,31,162,0.33)",
                }}
              >
                Ойнау ▶
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
