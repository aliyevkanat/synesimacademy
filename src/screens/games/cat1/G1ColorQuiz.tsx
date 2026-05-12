import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

// ─── Data ────────────────────────────────────────────────────────────────────

interface QuizItem {
  id: string;
  src: string;
}

interface QuizRound {
  title: string;
  correctIds: string[];
  items: QuizItem[];
}

const ROUNDS: QuizRound[] = [
  {
    title: "Қызыл түсті заттарды белгіле",
    correctIds: ["red_apple", "red_car", "red_ball"],
    items: [
      { id: "yellow_banana", src: "/assets/tuster/yellow_banana_game.png" },
      { id: "green_frog",    src: "/assets/tuster/green_frog_game.png" },
      { id: "red_apple",     src: "/assets/tuster/red_apple_game.png" },
      { id: "orange_orange", src: "/assets/tuster/orange_orange_game.png" },
      { id: "red_car",       src: "/assets/tuster/red_car_game.png" },
      { id: "blue_ball",     src: "/assets/tuster/blue_ball_game.png" },
      { id: "red_ball",      src: "/assets/tuster/red_ball_game.png" },
      { id: "blue_car",      src: "/assets/tuster/blue_car_game.png" },
    ],
  },
  {
    title: "Сары түсті заттарды белгіле",
    correctIds: ["yellow_banana", "yellow_sun", "yellow_duck"],
    items: [
      { id: "yellow_banana", src: "/assets/tuster/yellow_banana_game.png" },
      { id: "pink_bag",      src: "/assets/tuster/pink_bag_game.png" },
      { id: "blue_ship",     src: "/assets/tuster/blue_ship_game.png" },
      { id: "yellow_sun",    src: "/assets/tuster/yellow_sun_game.png" },
      { id: "red_apple",     src: "/assets/tuster/red_apple_game.png" },
      { id: "green_apple",   src: "/assets/tuster/green_apple_game.png" },
      { id: "yellow_duck",   src: "/assets/tuster/yellow_duck_game.png" },
      { id: "orange_car",    src: "/assets/tuster/orange_car_game.png" },
    ],
  },
  {
    title: "Жасыл түсті заттарды белгіле",
    correctIds: ["green_apple", "green_frog", "green_leaf"],
    items: [
      { id: "orange_car",    src: "/assets/tuster/orange_car_game.png" },
      { id: "yellow_sun",    src: "/assets/tuster/yellow_sun_game.png" },
      { id: "green_apple",   src: "/assets/tuster/green_apple_game.png" },
      { id: "orange_fish",   src: "/assets/tuster/orange_fish_game.png" },
      { id: "pink_bow",      src: "/assets/tuster/pink_bow_game.png" },
      { id: "green_frog",    src: "/assets/tuster/green_frog_game.png" },
      { id: "red_ball",      src: "/assets/tuster/red_ball_game.png" },
      { id: "green_leaf",    src: "/assets/tuster/green_leaf_game.png" },
    ],
  },
  {
    title: "Көк түсті заттарды белгіле",
    correctIds: ["blue_car", "blue_ship", "blue_ball"],
    items: [
      { id: "blue_car",      src: "/assets/tuster/blue_car_game.png" },
      { id: "yellow_banana", src: "/assets/tuster/yellow_banana_game.png" },
      { id: "orange_car",    src: "/assets/tuster/orange_car_game.png" },
      { id: "blue_ship",     src: "/assets/tuster/blue_ship_game.png" },
      { id: "blue_ball",     src: "/assets/tuster/blue_ball_game.png" },
      { id: "red_ball",      src: "/assets/tuster/red_ball_game.png" },
      { id: "pink_dress",    src: "/assets/tuster/pink_dress_png.png" },
      { id: "yellow_duck",   src: "/assets/tuster/yellow_duck_game.png" },
    ],
  },
  {
    title: "Қызғылт түсті заттарды белгіле",
    correctIds: ["pink_bag", "pink_bow", "pink_dress"],
    items: [
      { id: "orange_fish",   src: "/assets/tuster/orange_fish_game.png" },
      { id: "yellow_banana", src: "/assets/tuster/yellow_banana_game.png" },
      { id: "pink_bag",      src: "/assets/tuster/pink_bag_game.png" },
      { id: "blue_ball",     src: "/assets/tuster/blue_ball_game.png" },
      { id: "red_car",       src: "/assets/tuster/red_car_game.png" },
      { id: "pink_bow",      src: "/assets/tuster/pink_bow_game.png" },
      { id: "green_frog",    src: "/assets/tuster/green_frog_game.png" },
      { id: "pink_dress",    src: "/assets/tuster/pink_dress_png.png" },
    ],
  },
  {
    title: "Қызғылт сары түсті заттарды белгіле",
    correctIds: ["orange_car", "orange_orange", "orange_fish"],
    items: [
      { id: "orange_car",    src: "/assets/tuster/orange_car_game.png" },
      { id: "blue_car",      src: "/assets/tuster/blue_car_game.png" },
      { id: "yellow_sun",    src: "/assets/tuster/yellow_sun_game.png" },
      { id: "orange_orange", src: "/assets/tuster/orange_orange_game.png" },
      { id: "pink_dress",    src: "/assets/tuster/pink_dress_png.png" },
      { id: "red_car",       src: "/assets/tuster/red_car_game.png" },
      { id: "blue_ship",     src: "/assets/tuster/blue_ship_game.png" },
      { id: "orange_fish",   src: "/assets/tuster/orange_fish_game.png" },
    ],
  },
];

// ─── Cell component ──────────────────────────────────────────────────────────

interface CellProps {
  item: QuizItem;
  isSelected: boolean;
  isCorrect: boolean;
  submitted: boolean;
  onClick: () => void;
  enterDelay: number;
}

function ColorQuizCell({ item, isSelected, isCorrect, submitted, onClick, enterDelay }: CellProps) {
  const showRing = submitted && isSelected;
  const ringColor = isCorrect ? "#4CAF50" : "#EF5350";

  const cellAnimate = useMemo(() => {
    if (submitted && isSelected) {
      if (isCorrect) return { opacity: 1, y: [0, -8, 0] as number[], scale: [1, 1.1, 1] as number[] };
      return { opacity: 1, scale: 1, x: [-8, 8, -8, 8, 0] as number[] };
    }
    return { opacity: 1, scale: 1 };
  }, [submitted, isSelected, isCorrect]);

  const cellTransition = useMemo(() => {
    if (submitted && isSelected) return { duration: 0.4 };
    return { type: "spring" as const, stiffness: 220, damping: 18, delay: enterDelay };
  }, [submitted, isSelected, enterDelay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={cellAnimate}
      transition={cellTransition}
      whileHover={!submitted ? { scale: 1.07 } : undefined}
      whileTap={!submitted ? { scale: 0.93 } : undefined}
      onClick={!submitted ? onClick : undefined}
      style={{ cursor: submitted ? "default" : "pointer" }}
    >
      <div
        style={{
          background: isSelected ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.52)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: 20,
          padding: "clamp(10px, 1.5vw, 20px)",
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: isSelected
            ? "3px solid rgba(255,255,255,0.9)"
            : "2px solid rgba(255,255,255,0.45)",
          boxShadow: isSelected
            ? "0 8px 28px rgba(0,0,0,0.18), 0 0 0 3px rgba(255,255,255,0.55)"
            : "0 4px 16px rgba(0,0,0,0.10)",
          transition: "all 0.18s ease",
          position: "relative",
          overflow: "hidden",
          outline: showRing ? `4px solid ${ringColor}` : "none",
          outlineOffset: showRing ? "-4px" : undefined,
        }}
      >
        <img
          src={item.src}
          alt=""
          draggable={false}
          style={{
            width: "80%",
            height: "80%",
            objectFit: "contain",
            filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.13))",
          }}
        />
        {isSelected && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              background: "rgba(255,255,255,0.18)",
              pointerEvents: "none",
            }}
          />
        )}
        {submitted && isSelected && (
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              background: isCorrect ? "#4CAF50" : "#EF5350",
              borderRadius: 999,
              padding: "2px 7px",
              fontWeight: 900,
              color: "white",
              fontSize: 16,
              zIndex: 2,
            }}
          >
            {isCorrect ? "✓" : "✗"}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

interface Props {
  onBack: () => void;
  onHome: () => void;
  onReplay: () => void;
}

export default function G1ColorQuiz({ onBack, onHome, onReplay }: Props) {
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const round = ROUNDS[currentRound];

  const correctSet = useMemo(() => new Set(round.correctIds), [round.correctIds]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const selectedCorrectCount = useMemo(() => {
    let n = 0;
    for (const id of selectedSet) if (correctSet.has(id)) n++;
    return n;
  }, [selectedSet, correctSet]);

  const toggleItem = (id: string) => {
    if (submitted) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    playSound("quiz_select.mp3");
  };

  // Auto-submit when all correct items are selected with no wrong ones
  useEffect(() => {
    if (submitted) return;
    if (selectedCorrectCount < round.correctIds.length) return;
    const wrongSelected = selected.filter((id) => !correctSet.has(id));
    if (wrongSelected.length !== 0) return;
    const t = window.setTimeout(() => {
      setSubmitted(true);
      playSound("correct_answer.mp3");
    }, 400);
    return () => window.clearTimeout(t);
  }, [selectedCorrectCount, round.correctIds.length, selected, correctSet, submitted]);

  // Wrong selection: flash briefly then deselect
  useEffect(() => {
    if (submitted) return;
    const wrongSelected = selected.filter((id) => !correctSet.has(id));
    if (wrongSelected.length === 0) return;
    const t = window.setTimeout(() => {
      setSelected((prev) => prev.filter((id) => correctSet.has(id)));
      playSound("wrong_answer.mp3");
    }, 500);
    return () => window.clearTimeout(t);
  }, [selected, correctSet, submitted]);

  // After submit: advance to next round or finish
  useEffect(() => {
    if (!submitted) return;
    const t = window.setTimeout(() => {
      if (currentRound === ROUNDS.length - 1) {
        setAllDone(true);
      } else {
        setCurrentRound((r) => r + 1);
        setSelected([]);
        setSubmitted(false);
      }
    }, 1200);
    return () => window.clearTimeout(t);
  }, [submitted, currentRound]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/assets/tuster/tuster_background_game2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      <HomeButton onHome={onBack} />

      {/* Main content */}
      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "clamp(64px, 7vh, 80px) 20px 20px",
        }}
      >
        {/* Title pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${currentRound}`}
            initial={{ opacity: 0, y: -22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{
              background: "rgba(255,255,255,0.32)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "2px solid rgba(255,255,255,0.55)",
              borderRadius: 50,
              padding: "14px 40px",
              fontWeight: 900,
              fontSize: "clamp(20px, 3vw, 32px)",
              color: "#ffffff",
              textShadow: "0 2px 6px rgba(0,0,0,0.45), 0 1px 0 rgba(0,0,0,0.25)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
              textAlign: "center",
            }}
          >
            {round.title}
          </motion.div>
        </AnimatePresence>

        {/* 4×2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            columnGap: "clamp(12px, 2vw, 24px)",
            rowGap: 0,
            width: "clamp(560px, 80vw, 960px)",
            margin: "clamp(60px, 9vh, 110px) auto 0",
          }}
        >
          {round.items.map((item, idx) => (
            <div
              key={`${item.id}-${currentRound}`}
              style={{
                marginTop: idx >= 4 ? "clamp(-120px, -12vw, -70px)" : 0,
              }}
            >
              <ColorQuizCell
                item={item}
                isSelected={selectedSet.has(item.id)}
                isCorrect={correctSet.has(item.id)}
                submitted={submitted}
                onClick={() => toggleItem(item.id)}
                enterDelay={idx * 0.06}
              />
            </div>
          ))}
        </div>

      </div>

      {/* "Дұрыс!" success flash */}
      <AnimatePresence>
        {submitted && !allDone && (
          <motion.div
            key={`success-${currentRound}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#4CAF50",
              color: "#fff",
              borderRadius: 24,
              padding: "18px 48px",
              fontWeight: 900,
              fontSize: "clamp(22px, 3vw, 36px)",
              zIndex: 40,
              pointerEvents: "none",
              boxShadow: "0 12px 40px rgba(76,175,80,0.45)",
              whiteSpace: "nowrap",
            }}
          >
            Дұрыс! ✅
          </motion.div>
        )}
      </AnimatePresence>

      {/* WellDone modal */}
      <AnimatePresence>
        {allDone && (
          <WellDone
            onReplay={() => {
              setCurrentRound(0);
              setSelected([]);
              setSubmitted(false);
              setAllDone(false);
              onReplay();
            }}
            onHome={onHome}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
