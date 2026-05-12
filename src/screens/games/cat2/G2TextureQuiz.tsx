import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
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
    question: "Қайсысы жұмсақ?",
    leftImage: "/assets/hard_soft_images/bread_soft_game.png",
    rightImage: "/assets/hard_soft_images/watermelon_hard_game.png",
    correctSide: "left",
  },
  {
    question: "Қайсысы қатты?",
    leftImage: "/assets/hard_soft_images/eraser_soft_game.png",
    rightImage: "/assets/hard_soft_images/pencil_hard_game.png",
    correctSide: "right",
  },
  {
    question: "Қайсысы жұмсақ?",
    leftImage: "/assets/hard_soft_images/comb_hard_game.png",
    rightImage: "/assets/hard_soft_images/towel_soft_game.png",
    correctSide: "right",
  },
  {
    question: "Қайсысы қатты?",
    leftImage: "/assets/hard_soft_images/socks_soft_game.png",
    rightImage: "/assets/hard_soft_images/shoes_hard_game.png",
    correctSide: "right",
  },
];

function fireConfetti(side: "left" | "right") {
  const x = side === "left" ? 0.28 : 0.72;
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { x, y: 0.58 },
    colors: ["#AB47BC", "#4CAF50", "#FFD600", "#2196F3", "#FF7043"],
  });
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { x, y: 0.52 },
      colors: ["#E91E63", "#00BCD4", "#8BC34A"],
    });
  }, 300);
}

export default function G2TextureQuiz({ onBack, onHome, onReplay }: Props) {
  const [currentRound, setCurrentRound] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [wrongSide, setWrongSide] = useState<"left" | "right" | null>(null);
  const [locked, setLocked] = useState(false);
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [allDone, setAllDone] = useState(false);

  const round = ROUNDS[currentRound];
  const questionColor = round.question.includes("жұмсақ") ? "#7B1FA2" : "#00695C";

  const handleAnswer = (side: "left" | "right") => {
    if (locked || allDone) return;
    playSound("button_click.mp3");

    if (side === round.correctSide) {
      setFeedback("correct");
      setLocked(true);
      setWrongSide(null);
      playSound("correct_answer.mp3");
      fireConfetti(round.correctSide);
      setCompletedRounds((prev) =>
        prev.includes(currentRound) ? prev : [...prev, currentRound]
      );

      window.setTimeout(() => {
        if (currentRound === ROUNDS.length - 1) {
          setAllDone(true);
          setLocked(false);
          return;
        }
        setCurrentRound((v) => v + 1);
        setFeedback(null);
        setWrongSide(null);
        setLocked(false);
      }, 1200);
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
        background:
          "linear-gradient(160deg, #F3E5F5 0%, #E8F5E9 50%, #E3F2FD 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HomeButton onHome={onBack} />

      {/* Floating blobs */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`blob-${i}`}
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

      {/* Sparkles */}
      {(["✨", "🌟", "⭐"] as const).map((item, i) => (
        <motion.div
          key={`spark-${i}`}
          style={{
            position: "absolute",
            top: `${24 + i * 18}%`,
            right: `${8 + i * 8}%`,
            fontSize: 22 + i * 2,
            opacity: 0.35,
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
        {/* Main card */}
        <motion.div
          style={{
            width: "clamp(680px, 86vw, 1100px)",
            borderRadius: 32,
            background:
              "radial-gradient(ellipse at center, #ffffff 0%, #F8F0FF 100%)",
            border: "6px solid #80CBC4",
            boxShadow: "0 16px 56px rgba(0,0,0,0.12)",
            padding: "28px 32px 36px",
            overflow: "hidden",
            position: "relative",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Question */}
          <div
            style={{ textAlign: "center", padding: "0 0 18px", position: "relative" }}
          >
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

          {/* Comparison area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`pair-${currentRound}`}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                {/* Left image */}
                <motion.div
                  onClick={() => handleAnswer("left")}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: 20,
                    padding: 8,
                    ...getAnswerStyles("left"),
                  }}
                  whileTap={{ scale: 0.93 }}
                  animate={
                    wrongSide === "left" ? { x: [-8, 8, -8, 8, 0] } : undefined
                  }
                  transition={
                    wrongSide === "left" ? { duration: 0.4 } : undefined
                  }
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

                {/* Teal dotted divider */}
                <div
                  style={{
                    width: 4,
                    height: "clamp(260px, 32vh, 400px)",
                    background:
                      "repeating-linear-gradient(to bottom, #80CBC4, #80CBC4 8px, transparent 8px, transparent 16px)",
                    flexShrink: 0,
                    borderRadius: 2,
                    margin: "0 clamp(12px, 2vw, 28px)",
                  }}
                />

                {/* Right image */}
                <motion.div
                  onClick={() => handleAnswer("right")}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: 20,
                    padding: 8,
                    ...getAnswerStyles("right"),
                  }}
                  whileTap={{ scale: 0.93 }}
                  animate={
                    wrongSide === "right" ? { x: [-8, 8, -8, 8, 0] } : undefined
                  }
                  transition={
                    wrongSide === "right" ? { duration: 0.4 } : undefined
                  }
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

            {/* Correct feedback popup */}
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
                    color: "white",
                    borderRadius: 20,
                    padding: "12px 28px",
                    fontWeight: 900,
                    fontSize: 22,
                    zIndex: 40,
                    pointerEvents: "none",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Дұрыс! ✅
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ROUNDS.map((_, i) => {
            const completed = completedRounds.includes(i);
            const isCurrent = i === currentRound && !allDone;
            return (
              <motion.div
                key={`dot-${i}`}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: completed
                    ? "#80CBC4"
                    : isCurrent
                    ? "#7B1FA2"
                    : "rgba(0,0,0,0.12)",
                  border: isCurrent ? "2px solid #4A148C" : "2px solid transparent",
                }}
                animate={
                  completed
                    ? { scale: [1, 1.4, 1] }
                    : isCurrent
                    ? { scale: 1.3 }
                    : { scale: 1 }
                }
                transition={
                  completed ? { duration: 0.3 } : { duration: 0.2 }
                }
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
