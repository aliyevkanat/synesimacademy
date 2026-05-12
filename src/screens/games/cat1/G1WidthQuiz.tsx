import { useState } from "react";
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
}

const ROUNDS: Round[] = [
  {
    question: "Қайсысы жуан?",
    leftImage: "/assets/thin_thick_images/thin_tree_decor.png",
    rightImage: "/assets/thin_thick_images/thick_tree_decor.png",
    correctSide: "right",
  },
  {
    question: "Қайсысы жіңішке?",
    leftImage: "/assets/thin_thick_images/thick_candle.png",
    rightImage: "/assets/thin_thick_images/thin_candle.png",
    correctSide: "right",
  },
  {
    question: "Қайсысы жуан?",
    leftImage: "/assets/thin_thick_images/thick_marker.png",
    rightImage: "/assets/thin_thick_images/thin_pencil_game.png",
    correctSide: "left",
  },
  {
    question: "Қайсысы жіңішке?",
    leftImage: "/assets/thin_thick_images/thick_jam.png",
    rightImage: "/assets/thin_thick_images/thin_water.png",
    correctSide: "right",
  },
  {
    question: "Қайсысы жуан?",
    leftImage: "/assets/thin_thick_images/thick_leaf.png",
    rightImage: "/assets/thin_thick_images/thin_leaf-removebg-preview.png",
    correctSide: "left",
  },
];

export default function G1WidthQuiz({ onBack, onHome, onReplay }: Props) {
  const [currentRound, setCurrentRound] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [wrongSide, setWrongSide] = useState<"left" | "right" | null>(null);
  const [locked, setLocked] = useState(false);
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [allDone, setAllDone] = useState(false);

  const round = ROUNDS[currentRound];
  const questionColor = round.question.includes("жуан?") ? "#7B1FA2" : "#1565C0";

  const handleAnswer = (side: "left" | "right") => {
    if (locked || allDone) return;
    playSound("button_click.mp3");

    if (side === round.correctSide) {
      setFeedback("correct");
      setLocked(true);
      setWrongSide(null);
      playSound("correct_answer.mp3");
      setCompletedRounds((prev) => (prev.includes(currentRound) ? prev : [...prev, currentRound]));

      window.setTimeout(() => {
        if (currentRound === ROUNDS.length - 1) {
          setAllDone(true);
          setLocked(false);
          return;
        }
        setCurrentRound((value) => value + 1);
        setFeedback(null);
        setWrongSide(null);
        setLocked(false);
      }, 1100);
      return;
    }

    setWrongSide(side);
    setFeedback("wrong");
    playSound("wrong_answer.mp3");
    window.setTimeout(() => {
      setWrongSide(null);
      setFeedback(null);
    }, 600);
  };

  const resetQuiz = () => {
    setCurrentRound(0);
    setFeedback(null);
    setWrongSide(null);
    setLocked(false);
    setCompletedRounds([]);
    setAllDone(false);
    onReplay();
  };

  const getAnswerStyles = (side: "left" | "right") => {
    if (feedback === "correct" && round.correctSide === side) {
      return {
        border: "4px solid #4CAF50",
        boxShadow: "0 0 24px rgba(76,175,80,0.55)",
      };
    }
    if (wrongSide === side) {
      return {
        border: "4px solid #EF5350",
        boxShadow: "0 0 16px rgba(239,83,80,0.4)",
      };
    }
    return {
      border: "4px solid transparent",
      boxShadow: "none",
    };
  };

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
        background: "linear-gradient(160deg, #e8f5e9 0%, #f3e5f5 50%, #fce4ec 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HomeButton onHome={onBack} />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={`cloud-${i}`}
          style={{
            position: "absolute",
            top: `${9 + i * 12}%`,
            left: i === 2 ? "auto" : `${8 + i * 24}%`,
            right: i === 2 ? "8%" : "auto",
            width: 150 - i * 20,
            height: 72 - i * 8,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.58)",
            filter: "blur(1px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ x: [0, i % 2 === 0 ? 16 : -14, 0] }}
          transition={{ repeat: Infinity, duration: 6.5 + i, ease: "easeInOut" }}
        />
      ))}

      {["✨", "🌟", "⭐"].map((item, i) => (
        <motion.div
          key={`spark-${i}`}
          style={{
            position: "absolute",
            top: `${24 + i * 18}%`,
            right: `${8 + i * 8}%`,
            fontSize: 22 + i * 2,
            opacity: 0.38,
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3.8 + i * 0.5, ease: "easeInOut" }}
        >
          {item}
        </motion.div>
      ))}

      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          padding: "74px 16px 34px",
        }}
      >
        <motion.div
          style={{
            width: "clamp(680px, 86vw, 1100px)",
            borderRadius: 32,
            background: "radial-gradient(circle at 50% 20%, rgba(206,147,216,0.12) 0%, rgba(255,255,255,1) 60%)",
            border: "6px solid #CE93D8",
            boxShadow: "0 16px 56px rgba(0,0,0,0.13)",
            padding: "28px 32px 36px",
            overflow: "hidden",
            position: "relative",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div style={{ textAlign: "center", padding: "0 0 18px", position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={`question-${currentRound}`}
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.15 }}
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  fontWeight: 900,
                  color: questionColor,
                  textShadow: "2px 2px 0px rgba(0,0,0,0.08)",
                  letterSpacing: "1px",
                  textAlign: "center",
                  margin: 0,
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
              gap: "clamp(12px, 2vw, 28px)",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`pair-${currentRound}`}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <motion.div
                  onClick={() => handleAnswer("left")}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: 20,
                    ...getAnswerStyles("left"),
                  }}
                  whileTap={{ scale: 0.93 }}
                  animate={wrongSide === "left" ? { x: [-8, 8, -8, 8, 0] } : undefined}
                  transition={wrongSide === "left" ? { duration: 0.4 } : undefined}
                >
                  <img
                    src={round.leftImage}
                    alt=""
                    draggable={false}
                    style={{
                      width: "clamp(180px, 22vw, 300px)",
                      height: "clamp(180px, 22vw, 300px)",
                      objectFit: "contain",
                      filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.12))",
                    }}
                  />
                </motion.div>

                <div
                  style={{
                    width: 4,
                    height: "clamp(260px, 32vh, 400px)",
                    background:
                      "repeating-linear-gradient(to bottom, #CE93D8, #CE93D8 8px, transparent 8px, transparent 16px)",
                    flexShrink: 0,
                    borderRadius: 2,
                    margin: "0 clamp(12px, 2vw, 28px)",
                  }}
                />

                <motion.div
                  onClick={() => handleAnswer("right")}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: 20,
                    ...getAnswerStyles("right"),
                  }}
                  whileTap={{ scale: 0.93 }}
                  animate={wrongSide === "right" ? { x: [-8, 8, -8, 8, 0] } : undefined}
                  transition={wrongSide === "right" ? { duration: 0.4 } : undefined}
                >
                  <img
                    src={round.rightImage}
                    alt=""
                    draggable={false}
                    style={{
                      width: "clamp(180px, 22vw, 300px)",
                      height: "clamp(180px, 22vw, 300px)",
                      objectFit: "contain",
                      filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.12))",
                    }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {feedback === "correct" && (
                <motion.div
                  key={`feedback-${currentRound}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#4CAF50",
                    color: "#fff",
                    borderRadius: 20,
                    padding: "12px 24px",
                    fontWeight: 900,
                    fontSize: 22,
                    zIndex: 20,
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Дұрыс! ✅
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
          {ROUNDS.map((_, i) => {
            const completed = completedRounds.includes(i);
            const current = i === currentRound && !allDone;
            return (
              <motion.div
                key={`dot-${i}`}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: completed ? "#CE93D8" : current ? "#7B1FA2" : "rgba(0,0,0,0.12)",
                  border: current ? "2px solid #4A148C" : "2px solid transparent",
                }}
                animate={
                  completed
                    ? { scale: [1, 1.4, 1] }
                    : current
                      ? { scale: 1.3 }
                      : { scale: 1 }
                }
                transition={completed ? { duration: 0.3 } : { duration: 0.2 }}
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
