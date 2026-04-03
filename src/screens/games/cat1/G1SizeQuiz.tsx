import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  leftLabel: string;
  rightImage: string;
  rightLabel: string;
  correctSide: "left" | "right";
  leftSize?: string;
  rightSize?: string;
}

const DEFAULT_SIZE = "clamp(160px, 20vw, 260px)";

const ROUNDS: Round[] = [
  {
    question: "Қайсысы үлкен?",
    leftImage: "closed.png",
    leftLabel: "Шкаф",
    rightImage: "apple.png",
    rightLabel: "Алма",
    correctSide: "left",
    leftSize: "clamp(280px, 34vw, 460px)",
    rightSize: "clamp(68px, 9vw, 112px)",
  },
  {
    question: "Қайсысы кіші?",
    leftImage: "backpack.png",
    leftLabel: "Рюкзак",
    rightImage: "toothbrush.png",
    rightLabel: "Тіс щеткасы",
    correctSide: "right",
    leftSize: "clamp(220px, 28vw, 360px)",
    rightSize: "clamp(120px, 16vw, 200px)",
  },
  {
    question: "Қайсысы үлкен?",
    leftImage: "sofa.png",
    leftLabel: "Диван",
    rightImage: "soap.png",
    rightLabel: "Сабын",
    correctSide: "left",
    leftSize: "clamp(270px, 32vw, 430px)",
    rightSize: "clamp(92px, 13vw, 152px)",
  },
  {
    question: "Қайсысы кіші?",
    leftImage: "chair.png",
    leftLabel: "Орындық",
    rightImage: "choco.png",
    rightLabel: "Шоколад",
    correctSide: "right",
    leftSize: "clamp(235px, 28vw, 365px)",
    rightSize: "clamp(104px, 15vw, 172px)",
  },
  {
    question: "Қайсысы үлкен?",
    leftImage: "watermelon.png",
    leftLabel: "Қарбыз",
    rightImage: "spoon.png",
    rightLabel: "Қасық",
    correctSide: "left",
    leftSize: "clamp(240px, 30vw, 380px)",
    rightSize: "clamp(132px, 17vw, 220px)",
  },
];

export default function G1SizeQuiz({ onBack, onHome, onReplay }: Props) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong-left" | "wrong-right" | null>(null);
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [allDone, setAllDone] = useState(false);

  const round = ROUNDS[roundIndex];

  const handleAnswer = useCallback(
    (side: "left" | "right") => {
      if (feedback) return;

      playSound("button_click.mp3");

      if (side === round.correctSide) {
        playSound("correct_answer.mp3");
        setFeedback("correct");
        setCompletedRounds((prev) => [...prev, roundIndex]);

        setTimeout(() => {
          if (roundIndex < ROUNDS.length - 1) {
            setRoundIndex((i) => i + 1);
            setFeedback(null);
          } else {
            setAllDone(true);
          }
        }, 1200);
      } else {
        playSound("wrong_answer.mp3");
        setFeedback(side === "left" ? "wrong-left" : "wrong-right");
        setTimeout(() => setFeedback(null), 600);
      }
    },
    [feedback, round.correctSide, roundIndex],
  );

  const questionColor = round.question.includes("үлкен") ? "#4CAF50" : "#FF7043";

  return (
    <motion.div
      style={{
        background: "linear-gradient(180deg, #FFE0EC 0%, #FFF5E6 50%, #FFECD2 100%)",
        minHeight: "100vh",
        fontFamily: "Nunito, sans-serif",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HomeButton onHome={onBack} />

      <motion.div
        style={{
          width: "clamp(800px, 92vw, 1300px)",
          background: "white",
          borderRadius: 32,
          border: "6px solid #F8BBD0",
          boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
          padding: 0,
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Card inner background */}
        <div
          style={{
            background: "radial-gradient(ellipse at center, #FFF9E6 0%, #FFF3D6 40%, #FFECC8 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative arc */}
          <div
            style={{
              position: "absolute",
              bottom: -80,
              right: -60,
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "8px solid transparent",
              borderTopColor: "rgba(255,183,77,0.15)",
              borderRightColor: "rgba(129,199,132,0.15)",
              borderBottomColor: "rgba(100,181,246,0.15)",
              borderLeftColor: "rgba(206,147,216,0.15)",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -50,
              left: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "6px solid transparent",
              borderTopColor: "rgba(206,147,216,0.12)",
              borderRightColor: "rgba(255,183,77,0.12)",
              borderBottomColor: "rgba(129,199,132,0.12)",
              borderLeftColor: "rgba(100,181,246,0.12)",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />

          {/* Question text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`question-${roundIndex}`}
              style={{
                textAlign: "center",
                paddingTop: 28,
                marginBottom: 20,
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <span
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 900,
                  color: questionColor,
                  textShadow: "2px 3px 0px rgba(0,0,0,0.1)",
                  letterSpacing: 2,
                  fontStyle: "italic",
                }}
              >
                {round.question}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Comparison area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 32px 32px",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`pair-${roundIndex}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                {/* Left image */}
                <motion.div
                  onClick={() => handleAnswer("left")}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    feedback === "wrong-left"
                      ? { x: [-8, 8, -8, 8, 0] }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 20,
                      padding: 12,
                      border:
                        feedback === "correct" && round.correctSide === "left"
                          ? "4px solid #4CAF50"
                          : feedback === "wrong-left"
                            ? "4px solid #EF5350"
                            : "4px solid transparent",
                      boxShadow:
                        feedback === "correct" && round.correctSide === "left"
                          ? "0 0 20px rgba(76,175,80,0.5)"
                          : feedback === "wrong-left"
                            ? "0 0 20px rgba(239,83,80,0.4)"
                            : "none",
                      transition: "border 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <img
                      src={`/assets/big_small_images/${round.leftImage}`}
                      alt={round.leftLabel}
                      draggable={false}
                      style={{
                        width: round.leftSize ?? DEFAULT_SIZE,
                        height: round.leftSize ?? DEFAULT_SIZE,
                        objectFit: "contain",
                        filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.15))",
                      }}
                    />
                    {feedback === "correct" && round.correctSide === "left" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          fontSize: 36,
                          zIndex: 10,
                        }}
                      >
                        ✅
                      </motion.div>
                    )}
                    {feedback === "wrong-left" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          fontSize: 30,
                          zIndex: 10,
                        }}
                      >
                        ✗
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Vertical dotted divider */}
                <div
                  style={{
                    width: 4,
                    height: "clamp(250px, 30vh, 400px)",
                    background:
                      "repeating-linear-gradient(to bottom, #F48FB1, #F48FB1 8px, transparent 8px, transparent 16px)",
                    flexShrink: 0,
                    margin: "0 clamp(16px, 3vw, 32px)",
                    borderRadius: 2,
                  }}
                />

                {/* Right image */}
                <motion.div
                  onClick={() => handleAnswer("right")}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    feedback === "wrong-right"
                      ? { x: [-8, 8, -8, 8, 0] }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 20,
                      padding: 12,
                      border:
                        feedback === "correct" && round.correctSide === "right"
                          ? "4px solid #4CAF50"
                          : feedback === "wrong-right"
                            ? "4px solid #EF5350"
                            : "4px solid transparent",
                      boxShadow:
                        feedback === "correct" && round.correctSide === "right"
                          ? "0 0 20px rgba(76,175,80,0.5)"
                          : feedback === "wrong-right"
                            ? "0 0 20px rgba(239,83,80,0.4)"
                            : "none",
                      transition: "border 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <img
                      src={`/assets/big_small_images/${round.rightImage}`}
                      alt={round.rightLabel}
                      draggable={false}
                      style={{
                        width: round.rightSize ?? DEFAULT_SIZE,
                        height: round.rightSize ?? DEFAULT_SIZE,
                        objectFit: "contain",
                        filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.15))",
                      }}
                    />
                    {feedback === "correct" && round.correctSide === "right" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          fontSize: 36,
                          zIndex: 10,
                        }}
                      >
                        ✅
                      </motion.div>
                    )}
                    {feedback === "wrong-right" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          fontSize: 30,
                          zIndex: 10,
                        }}
                      >
                        ✗
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Correct answer popup */}
            <AnimatePresence>
              {feedback === "correct" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#4CAF50",
                    color: "white",
                    borderRadius: 20,
                    padding: "12px 28px",
                    fontWeight: 900,
                    fontSize: 22,
                    zIndex: 40,
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 20px rgba(76,175,80,0.5)",
                    pointerEvents: "none",
                  }}
                >
                  Дұрыс! ✅
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Progress stars below the card */}
      <div
        style={{
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 16,
          zIndex: 10,
        }}
      >
        {ROUNDS.map((_, i) => {
          const isCompleted = completedRounds.includes(i);
          const isCurrent = i === roundIndex && !allDone;
          return (
            <motion.div
              key={i}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isCompleted ? 24 : 18,
                background: isCompleted
                  ? "linear-gradient(135deg, #FFD600, #FFB300)"
                  : isCurrent
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.4)",
                border: isCurrent
                  ? "3px solid #FFB300"
                  : isCompleted
                    ? "3px solid #FF8F00"
                    : "3px solid rgba(0,0,0,0.1)",
                boxShadow: isCompleted
                  ? "0 2px 12px rgba(255,214,0,0.5)"
                  : isCurrent
                    ? "0 2px 12px rgba(255,179,0,0.3)"
                    : "none",
              }}
              animate={
                isCompleted
                  ? { scale: [1, 1.4, 1] }
                  : isCurrent
                    ? { scale: [1, 1.15, 1] }
                    : {}
              }
              transition={
                isCompleted
                  ? { duration: 0.3 }
                  : isCurrent
                    ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                    : {}
              }
            >
              {isCompleted ? "⭐" : isCurrent ? "●" : "○"}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {allDone && <WellDone onReplay={onReplay} onHome={onHome} />}
      </AnimatePresence>
    </motion.div>
  );
}
