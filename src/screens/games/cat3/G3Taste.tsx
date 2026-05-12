import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props {
  onHome: () => void;
  onReplay: () => void;
  /** «Тәтті және Ащы» — тек тәтті/ащы; «Тәтті және қышқыл» — тек тәтті/қышқыл тапсырмалары */
  variant?: "sweet_spicy" | "sweet_sour";
}

type Taste = "sweet" | "sour" | "spicy";

interface GameItem {
  id: string;
  image: string;
  taste: Taste;
}

const ALL_ITEMS: GameItem[] = [
  { id: "candy", image: "/assets/tasty/candy_sweet.png", taste: "sweet" },
  { id: "cookies", image: "/assets/tasty/cookies_sweet.png", taste: "sweet" },
  { id: "chocolate", image: "/assets/tasty/chocolate_sweet.png", taste: "sweet" },
  { id: "icecream", image: "/assets/tasty/ice_cream_sweet.png", taste: "sweet" },
  { id: "apple", image: "/assets/tasty/apple_sour.png", taste: "sour" },
  { id: "berry", image: "/assets/tasty/berry_sour.png", taste: "sour" },
  { id: "cucumber", image: "/assets/tasty/cucumber_sour.png", taste: "sour" },
  { id: "lemon", image: "/assets/tasty/lemon_sour.png", taste: "sour" },
  { id: "sauce", image: "/assets/tasty/sauce_spicy.png", taste: "spicy" },
  { id: "pepper", image: "/assets/tasty/pepper_spicy.png", taste: "spicy" },
  { id: "onion", image: "/assets/tasty/onion_spicy.png", taste: "spicy" },
  { id: "pills", image: "/assets/tasty/pills_spicy.png", taste: "spicy" },
];

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRoundDeck(target: Taste, pool: readonly GameItem[]): GameItem[] {
  const correctPool = pool.filter((i) => i.taste === target);
  const wrongPool = pool.filter((i) => i.taste !== target);
  const shCorrect = shuffle(correctPool);
  const shWrong = shuffle(wrongPool);
  const nCorrect = Math.min(3, shCorrect.length);
  const wantTotal = 6;
  const nWrong = Math.min(wantTotal - nCorrect, shWrong.length);
  return shuffle([...shCorrect.slice(0, nCorrect), ...shWrong.slice(0, nWrong)]);
}

const ALL_ROUNDS: { label: string; target: Taste }[] = [
  { label: "Тәтті тамақ бер", target: "sweet" },
  { label: "Ащы тамақ бер", target: "spicy" },
  { label: "Қышқыл тамақ бер", target: "sour" },
];

export default function G3Taste({ onHome, onReplay, variant = "sweet_spicy" }: Props) {
  const rounds = useMemo(() => {
    if (variant === "sweet_sour") {
      return ALL_ROUNDS.filter((r) => r.target === "sweet" || r.target === "sour");
    }
    return ALL_ROUNDS.filter((r) => r.target === "sweet" || r.target === "spicy");
  }, [variant]);
  const themeTitle = variant === "sweet_sour" ? "Тәтті және қышқыл" : "Тәтті және Ащы";

  const [roundIndex, setRoundIndex] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const [shakeId, setShakeId] = useState<string | null>(null);

  const round = rounds[roundIndex];
  const tableItems = useMemo(() => buildRoundDeck(round.target, ALL_ITEMS), [round.target, roundIndex]);

  const handlePick = (item: GameItem) => {
    if (allDone) return;
    if (item.taste === round.target) {
      playSound("correct_answer.mp3");
      if (roundIndex >= rounds.length - 1) {
        setAllDone(true);
      } else {
        setRoundIndex((i) => i + 1);
      }
    } else {
      playSound("wrong_answer.mp3");
      setShakeId(item.id);
      window.setTimeout(() => setShakeId(null), 450);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
        backgroundImage: "url('/assets/tasty/kitchen_back.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HomeButton onHome={onHome} />

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "clamp(72px, 12vh, 100px)",
          zIndex: 4,
          width: "min(96vw, 520px)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Fredoka, Nunito, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(14px, 2.8vw, 18px)",
            color: "#5D4037",
            marginBottom: 8,
            textShadow: "0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {themeTitle}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={roundIndex}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22 }}
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(18px, 3.6vw, 26px)",
              color: "#BF360C",
              textShadow: "0 2px 8px rgba(255,255,255,0.9)",
              lineHeight: 1.25,
            }}
          >
            {round.label}
          </motion.div>
        </AnimatePresence>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 12,
          }}
        >
          {rounds.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === roundIndex ? 12 : 10,
                height: i === roundIndex ? 12 : 10,
                borderRadius: "50%",
                background: i < roundIndex ? "#66BB6A" : i === roundIndex ? "#FF7043" : "rgba(0,0,0,0.18)",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "clamp(66%, 71%, 78%)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "repeat(6, auto)",
          gap: "clamp(10px, 1.2vw, 18px)",
          zIndex: 2,
          padding: "0 clamp(8px, 2vw, 24px)",
        }}
      >
        {tableItems.map((item, i) => (
          <motion.div
            key={`${roundIndex}-${item.id}`}
            initial={{ opacity: 0, scale: 0.6, y: -10 }}
            animate={
              shakeId === item.id
                ? { opacity: 1, scale: 1, y: 0, x: [0, -9, 9, -9, 9, 0] }
                : { opacity: 1, scale: 1, y: 0, x: 0 }
            }
            transition={
              shakeId === item.id
                ? { duration: 0.38 }
                : { delay: 0.1 + i * 0.04, type: "spring", stiffness: 220, damping: 18 }
            }
            onClick={() => handlePick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePick(item);
              }
            }}
            style={{
              width: "clamp(92px, 10.5vw, 140px)",
              height: "clamp(92px, 10.5vw, 140px)",
              background: "rgba(255,255,255,0.32)",
              border: "2px solid rgba(255,255,255,0.65)",
              borderRadius: 14,
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              cursor: allDone ? "default" : "pointer",
              opacity: allDone ? 0.85 : 1,
            }}
          >
            <img
              src={item.image}
              alt=""
              draggable={false}
              style={{
                width: "82%",
                height: "82%",
                objectFit: "contain",
                filter: "drop-shadow(2px 3px 4px rgba(0,0,0,0.18))",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "clamp(27vh, 31vh, 37vh)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(280px, 34vw, 440px)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <motion.img
          src="/assets/tasty/girl_eat.png"
          alt=""
          draggable={false}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.1 }}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.18))",
          }}
        />
      </div>

      {allDone && <WellDone onReplay={onReplay} onHome={onHome} />}
    </motion.div>
  );
}
