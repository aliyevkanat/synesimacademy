import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

export default function G1WidthMode({ onLearn, onQuiz, onHome }: Props) {
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
        background: "linear-gradient(180deg, #bfe9ff 0%, #d8d7ff 45%, #f4ecff 100%)",
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
          background: "rgba(255,255,255,0.62)",
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
          background: "rgba(255,255,255,0.55)",
          filter: "blur(1px)",
        }}
        animate={{ x: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        style={{ position: "absolute", left: "10%", top: "28%", fontSize: 24, opacity: 0.35 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
      >
        ✨
      </motion.div>
      <motion.div
        style={{ position: "absolute", right: "9%", top: "24%", fontSize: 30, opacity: 0.28 }}
        animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.7 }}
      >
        🌟
      </motion.div>

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
            marginBottom: 28,
            padding: "14px 30px",
            borderRadius: 24,
            color: "#2e1664",
            background: "rgba(255,255,255,0.82)",
            border: "3px solid rgba(140,121,245,0.45)",
            boxShadow: "0 12px 28px rgba(107,93,186,0.2)",
            fontWeight: 900,
            fontSize: "clamp(22px, 3.4vw, 36px)",
            letterSpacing: 0.3,
          }}
        >
          🪵 Жуан-жіңішке
        </motion.div>

        <div
          style={{
            width: "min(1080px, 100%)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 170, damping: 16 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playSound("button_click.mp3");
              onLearn();
            }}
            style={{
              borderRadius: 28,
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 18px 34px rgba(75, 94, 177, 0.28)",
              border: "3px solid rgba(255,255,255,0.65)",
              background: "linear-gradient(145deg, #ffd57e 0%, #ff9f80 45%, #7eb8ff 100%)",
            }}
          >
            <div style={{ padding: "22px 20px 18px" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.22)" }}>
                Жуан-жіңішке
              </div>
              <div
                style={{
                  marginTop: 14,
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.26)",
                  border: "2px solid rgba(255,255,255,0.52)",
                  padding: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                }}
              >
                <img src="/assets/thin_thick_images/thick_tree.png" alt="Жуан мысал" style={{ width: 98, height: 98, objectFit: "contain" }} />
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>vs</span>
                <img src="/assets/thin_thick_images/thin_tree.png" alt="Жіңішке мысал" style={{ width: 98, height: 98, objectFit: "contain" }} />
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                padding: "18px 18px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#513299", fontWeight: 800, marginBottom: 12, fontSize: 15 }}>Суреттер арқылы айырмашылықты үйрен</div>
              <div
                style={{
                  width: "80%",
                  margin: "0 auto",
                  borderRadius: 999,
                  padding: "12px 0",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 18,
                  background: "linear-gradient(135deg, #ff7d4f, #ff4d93)",
                  boxShadow: "0 8px 18px rgba(255,90,126,0.33)",
                }}
              >
                Бастау ▶
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 170, damping: 16, delay: 0.08 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playSound("button_click.mp3");
              onQuiz();
            }}
            style={{
              borderRadius: 28,
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 18px 34px rgba(110, 73, 176, 0.26)",
              border: "3px solid rgba(255,255,255,0.55)",
              background: "linear-gradient(145deg, #ce93d8 0%, #ab47bc 45%, #7b1fa2 100%)",
            }}
          >
            <div style={{ padding: "22px 20px 18px", position: "relative" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.22)" }}>Біліміңді тексеріп көр</div>
              <div
                style={{
                  marginTop: 14,
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.26)",
                  border: "2px solid rgba(255,255,255,0.52)",
                  padding: 14,
                  minHeight: 130,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                }}
              >
                <img src="/assets/thin_thick_images/thin_tree_decor.png" alt="Тапсырма мысалы 1" style={{ width: 98, height: 98, objectFit: "contain" }} />
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 24 }}>?</span>
                <img src="/assets/thin_thick_images/thick_tree_decor.png" alt="Тапсырма мысалы 2" style={{ width: 98, height: 98, objectFit: "contain" }} />
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                padding: "18px 18px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#513299", fontWeight: 800, marginBottom: 12, fontSize: 15 }}>Дұрыс суретті таңдап көр</div>
              <div
                style={{
                  width: "80%",
                  margin: "0 auto",
                  borderRadius: 999,
                  padding: "12px 0",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 18,
                  background: "linear-gradient(135deg, #6f7cff, #ca5cff)",
                  boxShadow: "0 8px 18px rgba(111,124,255,0.3)",
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
