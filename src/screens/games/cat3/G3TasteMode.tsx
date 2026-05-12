import { motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import { playSound } from "../../../utils/audio";

interface Props {
  onLearn: () => void;
  onQuiz: () => void;
  onHome: () => void;
}

export default function G3TasteMode({ onLearn, onQuiz, onHome }: Props) {
  const cards = [
    { key: "learn", locked: false },
    { key: "locked", locked: true },
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
        background: "linear-gradient(160deg, #FFF8E1 0%, #FFE0B2 45%, #FFCCBC 100%)",
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
            color: "#BF360C",
            textShadow: "2px 3px 0px rgba(0,0,0,0.1)",
            letterSpacing: 2,
            marginTop: 24,
            marginBottom: 32,
          }}
        >
          ТӘТТІ ЖӘНЕ АЩЫ
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
            if (!card.locked) {
              return (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 60, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 200, damping: 18 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "clamp(260px, 30vw, 340px)",
                    borderRadius: 32,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(145deg, #FF8A65 0%, #FF5722 50%, #D84315 100%)",
                      padding: "24px 20px 50px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <h2
                      style={{
                        color: "white",
                        fontFamily: "Fredoka, Nunito, sans-serif",
                        fontWeight: 900,
                        fontSize: 24,
                        textAlign: "center",
                        textShadow: "1px 2px 0 rgba(0,0,0,0.2)",
                        margin: 0,
                      }}
                    >
                      Тәтті-ащы
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
                      padding: "8px 20px 24px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        background: "#FFF3E0",
                        borderRadius: 20,
                        border: "2px dashed #FFCCBC",
                        padding: "22px 14px 18px",
                        width: "100%",
                        marginBottom: 16,
                        boxSizing: "border-box",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/assets/tasty/candy_sweet.png"
                        alt="Тәтті"
                        style={{ width: 104, height: 104, objectFit: "contain" }}
                      />
                      <span
                        style={{
                          fontWeight: 900,
                          fontSize: 15,
                          color: "#BF360C",
                          padding: "0 8px",
                        }}
                      >
                        VS
                      </span>
                      <img
                        src="/assets/tasty/sauce_spicy.png"
                        alt="Ащы"
                        style={{ width: 104, height: 104, objectFit: "contain" }}
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
                        padding: "14px 0",
                        borderRadius: 50,
                        background: "linear-gradient(135deg, #FF8A65, #D84315)",
                        color: "white",
                        fontWeight: 900,
                        fontSize: 18,
                        fontFamily: "Fredoka, Nunito, sans-serif",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 5px 0 #BF360C",
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
                  width: "clamp(260px, 30vw, 340px)",
                  borderRadius: 24,
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#fff",
                  border: "4px solid #C62828",
                  boxShadow: "0 10px 36px rgba(198,40,40,0.2)",
                }}
              >
                <div
                  style={{
                    padding: "18px 20px 14px",
                    background: "linear-gradient(90deg, #FFEBEE 0%, #ffffff 72%)",
                    borderBottom: "2px solid #FFCDD2",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 32, lineHeight: 1 }} aria-hidden>
                      🎯
                    </span>
                    <h2
                      style={{
                        color: "#B71C1C",
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
                  <p style={{ margin: "8px 0 0 44px", fontSize: 14, fontWeight: 700, color: "#8D6E63" }}>
                    Тәтті / ащы
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
                      padding: "14px 10px",
                      width: "100%",
                      marginBottom: 16,
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                    }}
                  >
                    <img
                      src="/assets/tasty/chocolate_sweet.png"
                      alt="Тәтті"
                      draggable={false}
                      style={{ width: 96, height: 96, objectFit: "contain", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontWeight: 900,
                        fontSize: 17,
                        color: "#B71C1C",
                        padding: "0 6px",
                        flexShrink: 0,
                      }}
                    >
                      VS
                    </span>
                    <img
                      src="/assets/tasty/onion_spicy.png"
                      alt="Ащы"
                      draggable={false}
                      style={{ width: 96, height: 96, objectFit: "contain", flexShrink: 0 }}
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
                      padding: "14px 0",
                      borderRadius: 14,
                      background: "#C62828",
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
