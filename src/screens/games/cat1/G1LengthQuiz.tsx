import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props {
  onBack: () => void;
  onHome: () => void;
  onReplay: () => void;
}

interface Round {
  question: string;
  leftImage: string;
  rightImage: string;
  correctSide: "left" | "right";
  leftSize?: string;
  rightSize?: string;
  leftWidth?: string;
  leftHeight?: string;
  rightWidth?: string;
  rightHeight?: string;
}

const ROUNDS: Round[] = [
  {
    question: "Кімнің шашы ұзын?",
    leftImage: "/assets/short_long_images/longer_hair.png",
    rightImage: "/assets/short_long_images/shorter_hair.png",
    correctSide: "left",
    leftSize: "clamp(230px, 30vw, 440px)",
    rightSize: "clamp(230px, 30vw, 440px)",
  },
  {
    question: "Кімнің бойы қысқа?",
    leftImage: "/assets/short_long_images/longer_girl.png",
    rightImage: "/assets/short_long_images/shorter_boy.png",
    correctSide: "right",
    leftSize: "clamp(230px, 30vw, 440px)",
    rightSize: "clamp(230px, 30vw, 440px)",
  },
  {
    question: "Қайсысы ұзын?",
    leftImage: "/assets/short_long_images/longer_train.png",
    rightImage: "/assets/short_long_images/shorter_train.png",
    correctSide: "left",
    leftWidth: "clamp(380px, 50vw, 740px)",
    leftHeight: "clamp(250px, 32vw, 460px)",
    rightWidth: "clamp(210px, 28vw, 390px)",
    rightHeight: "clamp(170px, 22vw, 310px)",
  },
  {
    question: "Қай қалам қысқа?",
    leftImage: "/assets/short_long_images/longer_pencil.png",
    rightImage: "/assets/short_long_images/shorter_pencil.png",
    correctSide: "right",
    leftWidth: "clamp(220px, 28vw, 420px)",
    leftHeight: "clamp(250px, 34vw, 520px)",
    rightWidth: "clamp(180px, 22vw, 320px)",
    rightHeight: "clamp(190px, 24vw, 360px)",
  },
];

export default function G1LengthQuiz({ onBack, onHome, onReplay }: Props) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong-left" | "wrong-right" | null>(null);
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const round = ROUNDS[roundIndex];

  const handleChoice = useCallback(
    (side: "left" | "right") => {
      if (isTransitioning || feedback || allDone) return;
      playSound("button_click.mp3");

      if (side === round.correctSide) {
        playSound("correct_answer.mp3");
        setFeedback("correct");
        setCompletedRounds((prev) => (prev.includes(roundIndex) ? prev : [...prev, roundIndex]));
        setIsTransitioning(true);

        window.setTimeout(() => {
          if (roundIndex < ROUNDS.length - 1) {
            setRoundIndex((v) => v + 1);
            setFeedback(null);
            setIsTransitioning(false);
          } else {
            setAllDone(true);
            setIsTransitioning(false);
          }
        }, 1000);
      } else {
        playSound("wrong_answer.mp3");
        setFeedback(side === "left" ? "wrong-left" : "wrong-right");
        window.setTimeout(() => setFeedback(null), 650);
      }
    },
    [allDone, feedback, isTransitioning, round.correctSide, roundIndex],
  );

  const resetQuiz = () => {
    setRoundIndex(0);
    setFeedback(null);
    setCompletedRounds([]);
    setIsTransitioning(false);
    setAllDone(false);
    onReplay();
  };

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
        background: "linear-gradient(180deg, #9FD8FF 0%, #CDEBFF 28%, #FFE2BA 66%, #FFD7A6 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`cloud-${i}`}
          style={{
            position: "absolute",
            top: `${8 + i * 7}%`,
            left: `${8 + i * 22}%`,
            width: 110 - i * 10,
            height: 50 - i * 5,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            filter: "blur(1px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ x: [0, 16, 0] }}
          transition={{ repeat: Infinity, duration: 6 + i, ease: "easeInOut" }}
        />
      ))}
      {["✨", "🌸", "⭐"].map((e, i) => (
        <motion.div
          key={`spark-${i}`}
          style={{
            position: "absolute",
            top: `${26 + i * 16}%`,
            right: `${6 + i * 7}%`,
            fontSize: 22 + i * 2,
            opacity: 0.65,
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: "easeInOut" }}
        >
          {e}
        </motion.div>
      ))}
      <div
        style={{
          position: "absolute",
          bottom: -70,
          left: "-10%",
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
          bottom: -80,
          right: "-12%",
          width: "63%",
          height: 210,
          background: "#A5D6A7",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <HomeButton onHome={onBack} />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "clamp(70px, 10vh, 110px) 18px 36px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          style={{
            width: "clamp(740px, 90vw, 1320px)",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFF8EF 100%)",
            borderRadius: 34,
            border: "6px solid #FFB48A",
            boxShadow: "0 16px 56px rgba(255,112,67,0.22)",
            overflow: "hidden",
            position: "relative",
          }}
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 30%, rgba(255,224,178,0.6) 0%, rgba(255,255,255,0) 58%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ textAlign: "center", padding: "20px 16px 10px", position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={`q-${roundIndex}`}
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.24 }}
                style={{
                  margin: 0,
                  fontSize: "clamp(30px, 3.9vw, 52px)",
                  fontWeight: 900,
                  color: "#E65100",
                  textShadow: "2px 2px 0 rgba(255,255,255,0.8)",
                  letterSpacing: 1,
                }}
              >
                {round.question}
              </motion.h2>
            </AnimatePresence>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px clamp(18px, 3vw, 44px) 30px",
              gap: "clamp(8px, 1.5vw, 18px)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`pair-${roundIndex}`}
                style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center" }}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <motion.button
                  type="button"
                  onClick={() => handleChoice("left")}
                  disabled={isTransitioning}
                  style={{
                    flex: 1,
                    height: "clamp(260px, 40vh, 460px)",
                    borderRadius: 28,
                    border:
                      feedback === "correct" && round.correctSide === "left"
                        ? "5px solid #43A047"
                        : feedback === "wrong-left"
                          ? "5px solid #EF5350"
                          : "5px solid rgba(255,183,77,0.35)",
                    boxShadow:
                      feedback === "correct" && round.correctSide === "left"
                        ? "0 0 26px rgba(67,160,71,0.45)"
                        : feedback === "wrong-left"
                          ? "0 0 24px rgba(239,83,80,0.4)"
                          : "0 10px 24px rgba(255,152,0,0.14)",
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FFF4E5 100%)",
                    cursor: isTransitioning ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 14,
                    position: "relative",
                  }}
                  whileHover={isTransitioning ? {} : { scale: 1.02, y: -2 }}
                  whileTap={isTransitioning ? {} : { scale: 0.98 }}
                  animate={
                    feedback === "wrong-left"
                      ? { x: [-8, 8, -8, 8, 0] }
                      : feedback === "correct" && round.correctSide === "left"
                        ? { scale: [1, 1.03, 1] }
                        : {}
                  }
                  transition={{ duration: 0.35 }}
                >
                  <img
                    src={round.leftImage}
                    alt=""
                    draggable={false}
                    style={{
                      width: round.leftWidth ?? round.leftSize ?? "clamp(190px, 24vw, 360px)",
                      height: round.leftHeight ?? round.leftSize ?? "clamp(190px, 24vw, 360px)",
                      objectFit: "contain",
                      filter: "drop-shadow(3px 8px 14px rgba(0,0,0,0.2))",
                    }}
                  />
                </motion.button>

                <div
                  style={{
                    width: 4,
                    height: "clamp(240px, 34vh, 420px)",
                    margin: "0 clamp(10px, 2vw, 24px)",
                    borderRadius: 2,
                    background:
                      "repeating-linear-gradient(to bottom, #FFAB91, #FFAB91 8px, transparent 8px, transparent 16px)",
                    flexShrink: 0,
                  }}
                />

                <motion.button
                  type="button"
                  onClick={() => handleChoice("right")}
                  disabled={isTransitioning}
                  style={{
                    flex: 1,
                    height: "clamp(260px, 40vh, 460px)",
                    borderRadius: 28,
                    border:
                      feedback === "correct" && round.correctSide === "right"
                        ? "5px solid #43A047"
                        : feedback === "wrong-right"
                          ? "5px solid #EF5350"
                          : "5px solid rgba(255,183,77,0.35)",
                    boxShadow:
                      feedback === "correct" && round.correctSide === "right"
                        ? "0 0 26px rgba(67,160,71,0.45)"
                        : feedback === "wrong-right"
                          ? "0 0 24px rgba(239,83,80,0.4)"
                          : "0 10px 24px rgba(255,152,0,0.14)",
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FFF4E5 100%)",
                    cursor: isTransitioning ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 14,
                    position: "relative",
                  }}
                  whileHover={isTransitioning ? {} : { scale: 1.02, y: -2 }}
                  whileTap={isTransitioning ? {} : { scale: 0.98 }}
                  animate={
                    feedback === "wrong-right"
                      ? { x: [-8, 8, -8, 8, 0] }
                      : feedback === "correct" && round.correctSide === "right"
                        ? { scale: [1, 1.03, 1] }
                        : {}
                  }
                  transition={{ duration: 0.35 }}
                >
                  <img
                    src={round.rightImage}
                    alt=""
                    draggable={false}
                    style={{
                      width: round.rightWidth ?? round.rightSize ?? "clamp(190px, 24vw, 360px)",
                      height: round.rightHeight ?? round.rightSize ?? "clamp(190px, 24vw, 360px)",
                      objectFit: "contain",
                      filter: "drop-shadow(3px 8px 14px rgba(0,0,0,0.2))",
                    }}
                  />
                </motion.button>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  key={`fb-${feedback}-${roundIndex}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  style={{
                    position: "absolute",
                    top: "52%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: feedback === "correct" ? "#43A047" : "#EF5350",
                    color: "white",
                    borderRadius: 20,
                    padding: "12px 24px",
                    fontWeight: 900,
                    fontSize: "clamp(18px, 2vw, 24px)",
                    boxShadow:
                      feedback === "correct"
                        ? "0 8px 24px rgba(67,160,71,0.45)"
                        : "0 8px 24px rgba(239,83,80,0.45)",
                    zIndex: 20,
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {feedback === "correct" ? "Дұрыс! ✅" : "Қайталап көр! ❌"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
          {ROUNDS.map((_, i) => {
            const completed = completedRounds.includes(i);
            const current = i === roundIndex && !allDone;
            return (
              <motion.div
                key={`dot-${i}`}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: completed ? "#43A047" : current ? "#FF7043" : "rgba(255,255,255,0.6)",
                  border: current ? "3px solid #E65100" : "2px solid rgba(255,255,255,0.35)",
                  boxShadow: completed ? "0 4px 10px rgba(67,160,71,0.5)" : "none",
                }}
                animate={completed ? { scale: [1, 1.28, 1] } : current ? { scale: [1, 1.12, 1] } : {}}
                transition={completed ? { duration: 0.3 } : current ? { repeat: Infinity, duration: 1.4 } : {}}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {allDone && <WellDone onReplay={resetQuiz} onHome={onHome} />}
      </AnimatePresence>
    </motion.div>
  );
}

