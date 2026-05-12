import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

export default function G3SmellMode({ onLearn, onQuiz, onHome }: Props) {
  const cards = [
    { key: "learn", locked: false },
    { key: "quiz", locked: false },
  ];

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
          padding: "90px 20px 48px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "Fredoka, Nunito, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(28px, 4vw, 44px)",
            textAlign: "center",
            color: "#880E4F",
            textShadow: "2px 3px 0px rgba(0,0,0,0.1)",
            letterSpacing: 2,
            marginTop: 24,
            marginBottom: 32,
          }}
        >
          ЖАҒЫМДЫ ЖӘНЕ ЖАҒЫМСЫЗ
        </motion.h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(24px, 4vw, 56px)",
          }}
        >
          {cards.map((card, index) => {
            if (card.key === "learn") {
              return (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 60, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 200, damping: 18 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "clamp(280px, 32vw, 380px)",
                    borderRadius: 32,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 12px 44px rgba(0,0,0,0.16)",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(145deg, #F48FB1 0%, #E91E63 50%, #880E4F 100%)",
                      padding: "28px 20px 52px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <h2
                      style={{
                        color: "white",
                        fontFamily: "Fredoka, Nunito, sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(20px, 2.5vw, 26px)",
                        textAlign: "center",
                        textShadow: "1px 2px 0 rgba(0,0,0,0.25)",
                        margin: 0,
                        paddingTop: 0,
                      }}
                    >
                      Жағымды-жағымсыз
                    </h2>
                    <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", lineHeight: 0 }}>
                      <svg
                        viewBox="0 0 500 40"
                        preserveAspectRatio="none"
                        style={{ width: "100%", height: 40, display: "block" }}
                      >
                        <path d="M0,20 C125,40 375,0 500,20 L500,40 L0,40 Z" fill="white" />
                      </svg>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "white",
                      padding: "8px 20px 28px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        background: "#FCE4EC",
                        borderRadius: 20,
                        border: "2px dashed #F8BBD0",
                        padding: "16px",
                        width: "100%",
                        marginBottom: 18,
                        boxSizing: "border-box",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/assets/tasty/zhagumdy/pleasant_rose.png"
                        alt=""
                        style={{ width: 72, height: 72, objectFit: "contain" }}
                      />
                      <span
                        style={{
                          fontWeight: 900,
                          fontSize: 14,
                          color: "#880E4F",
                          padding: "0 10px",
                        }}
                      >
                        VS
                      </span>
                      <img
                        src="/assets/tasty/zhagumdy/smelly_socks.png"
                        alt=""
                        style={{ width: 72, height: 72, objectFit: "contain" }}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        playSound("button_click.mp3");
                        onLearn();
                      }}
                      style={{
                        width: "90%",
                        padding: "15px 0",
                        borderRadius: 50,
                        background: "linear-gradient(135deg, #F48FB1, #880E4F)",
                        color: "white",
                        fontWeight: 900,
                        fontSize: 18,
                        fontFamily: "Fredoka, Nunito, sans-serif",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 5px 0 #560027",
                      }}
                    >
                      Үйренейік ▶
                    </motion.button>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 60, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 200, damping: 18 }}
                whileHover={{ scale: 1.03, y: -6 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "clamp(280px, 32vw, 380px)",
                  borderRadius: 24,
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#fff",
                  border: "4px solid #6A1B9A",
                  boxShadow: "0 10px 36px rgba(106,27,154,0.2)",
                }}
              >
                <div
                  style={{
                    padding: "18px 20px 14px",
                    background: "linear-gradient(90deg, #F3E5F5 0%, #ffffff 72%)",
                    borderBottom: "2px solid #E1BEE7",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 32, lineHeight: 1 }} aria-hidden>
                      🎯
                    </span>
                    <h2
                      style={{
                        color: "#4A148C",
                        fontFamily: "Fredoka, Nunito, sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(17px, 2.2vw, 22px)",
                        textAlign: "left",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      Біліміңді тексеріп көр
                    </h2>
                  </div>
                  <p style={{ margin: "8px 0 0 44px", fontSize: 14, fontWeight: 700, color: "#7B1FA2" }}>
                    Жағымды / жағымсыз
                  </p>
                </div>

                <div
                  style={{
                    padding: "20px 20px 22px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#FAFAFA",
                      borderRadius: 16,
                      border: "2px solid #E0E0E0",
                      padding: "16px 12px",
                      width: "100%",
                      marginBottom: 18,
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/assets/tasty/zhagumdy/flowers_game.png"
                      alt=""
                      style={{ width: 80, height: 80, objectFit: "contain" }}
                    />
                    <span
                      style={{
                        fontWeight: 900,
                        fontSize: 15,
                        color: "#4A148C",
                        padding: "0 10px",
                      }}
                    >
                      VS
                    </span>
                    <img
                      src="/assets/tasty/zhagumdy/garbage_game.png"
                      alt=""
                      style={{ width: 80, height: 80, objectFit: "contain" }}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      playSound("button_click.mp3");
                      onQuiz();
                    }}
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      marginTop: 14,
                      padding: "15px 0",
                      borderRadius: 14,
                      background: "#6A1B9A",
                      color: "white",
                      fontWeight: 900,
                      fontSize: 17,
                      fontFamily: "Fredoka, Nunito, sans-serif",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.15)",
                    }}
                  >
                    Бастау ▶
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
