import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import HomeButton from "../../../components/HomeButton";
import WellDone from "../../../components/WellDone";
import { playSound } from "../../../utils/audio";

interface Props {
  onHome: () => void;
  onReplay: () => void;
  /** Тақырып тек — «Біліміңді тексеріп көр» екі режимде де бірдей ойын. */
  variant?: "sweet_spicy" | "sweet_sour";
}

interface GameItem {
  id: string;
  image: string;
}

const BY_ID: Record<string, GameItem> = {
  candy: { id: "candy", image: "/assets/tasty/candy_sweet.png" },
  cookies: { id: "cookies", image: "/assets/tasty/cookies_sweet.png" },
  chocolate: { id: "chocolate", image: "/assets/tasty/chocolate_sweet.png" },
  icecream: { id: "icecream", image: "/assets/tasty/ice_cream_sweet.png" },
  apple: { id: "apple", image: "/assets/tasty/apple_sour.png" },
  berry: { id: "berry", image: "/assets/tasty/berry_sour.png" },
  cucumber: { id: "cucumber", image: "/assets/tasty/cucumber_sour.png" },
  lemon: { id: "lemon", image: "/assets/tasty/lemon_sour.png" },
  sauce: { id: "sauce", image: "/assets/tasty/sauce_spicy.png" },
  pepper: { id: "pepper", image: "/assets/tasty/pepper_spicy.png" },
  onion: { id: "onion", image: "/assets/tasty/onion_spicy.png" },
  pills: { id: "pills", image: "/assets/tasty/pills_spicy.png" },
};

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pointInRect(px: number, py: number, r: DOMRect): boolean {
  return px >= r.left && px <= r.right && py >= r.top && py <= r.bottom;
}

interface RoundConfig {
  label: string;
  /** Дұрыс тағамдар — дәл осы үшеуін ортаға сүйреу керек */
  correctIds: readonly string[];
  /** Стеллада көрсетілетін 6 тағам (3 дұрыс + 3 басқа) */
  shelfIds: readonly string[];
}

const ROUNDS: RoundConfig[] = [
  {
    label: "Тәтті тамақ бер",
    correctIds: ["chocolate", "icecream", "cookies"],
    shelfIds: ["chocolate", "icecream", "cookies", "candy", "sauce", "pepper"],
  },
  {
    label: "Ащы тамақ бер",
    correctIds: ["sauce", "pepper", "onion"],
    shelfIds: ["sauce", "pepper", "onion", "candy", "lemon", "apple"],
  },
  {
    label: "Қышқыл тамақ бер",
    correctIds: ["cucumber", "apple", "lemon"],
    shelfIds: ["cucumber", "apple", "lemon", "chocolate", "pills", "berry"],
  },
];

const cellStyle: CSSProperties = {
  width: "clamp(88px, 11vw, 128px)",
  height: "clamp(88px, 11vw, 128px)",
  background: "rgba(255,255,255,0.38)",
  border: "2px solid rgba(255,255,255,0.72)",
  borderRadius: 16,
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 6px 16px rgba(0,0,0,0.14)",
  touchAction: "none",
};

export default function G3Taste({ onHome, onReplay, variant = "sweet_spicy" }: Props) {
  const themeTitle = variant === "sweet_sour" ? "Тәтті және қышқыл" : "Тәтті және Ащы";
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const [roundIndex, setRoundIndex] = useState(0);
  const [shelfOrder, setShelfOrder] = useState<string[]>(() => shuffle(ROUNDS[0].shelfIds));
  const [placedIds, setPlacedIds] = useState<Set<string>>(() => new Set());
  const [allDone, setAllDone] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const round = ROUNDS[roundIndex];
  const correctSet = useMemo(() => new Set(round.correctIds), [round.correctIds]);

  useEffect(() => {
    setShelfOrder(shuffle(ROUNDS[roundIndex].shelfIds));
    setPlacedIds(new Set());
  }, [roundIndex]);

  useEffect(() => {
    if (placedIds.size !== 3) return;
    const ids = ROUNDS[roundIndex].correctIds;
    const allCorrect = ids.every((id) => placedIds.has(id));
    if (!allCorrect) return;
    const t = window.setTimeout(() => {
      if (roundIndex >= ROUNDS.length - 1) {
        setAllDone(true);
      } else {
        setRoundIndex((i) => i + 1);
      }
    }, 450);
    return () => window.clearTimeout(t);
  }, [placedIds, roundIndex]);

  const handleDragEnd = (info: PanInfo, itemId: string) => {
    if (allDone) return;
    const zone = dropZoneRef.current?.getBoundingClientRect();
    if (!zone) return;
    const { x, y } = info.point;
    const inside = pointInRect(x, y, zone);
    const isCorrect = correctSet.has(itemId);

    if (inside && isCorrect && !placedIds.has(itemId)) {
      playSound("correct_answer.mp3");
      setPlacedIds((prev) => new Set([...prev, itemId]));
    } else if (inside && !isCorrect) {
      playSound("wrong_answer.mp3");
    }
  };

  const shelfItems = shelfOrder.map((id) => BY_ID[id]).filter(Boolean);

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
          top: "clamp(52px, 7vh, 68px)",
          zIndex: 6,
          width: "min(96vw, 560px)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Fredoka, Nunito, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(15px, 3vw, 20px)",
            color: "#5D4037",
            marginBottom: 6,
            textShadow: "0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          {themeTitle}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={roundIndex}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(22px, 4.8vw, 34px)",
              color: "#BF360C",
              textShadow: "0 2px 10px rgba(255,255,255,0.95)",
              lineHeight: 1.2,
            }}
          >
            {round.label}
          </motion.div>
        </AnimatePresence>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 9,
            marginTop: 10,
          }}
        >
          {ROUNDS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === roundIndex ? 13 : 10,
                height: i === roundIndex ? 13 : 10,
                borderRadius: "50%",
                background: i < roundIndex ? "#66BB6A" : i === roundIndex ? "#FF7043" : "rgba(0,0,0,0.16)",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Орта: девочка + тамақ тастау аймағы (сүйреу нүктесі) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "clamp(8vh, 14vh, 20vh)",
          transform: "translateX(-50%)",
          width: "min(92vw, clamp(280px, 44vw, 440px))",
          zIndex: 3,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <div
            ref={dropZoneRef}
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "clamp(26%, 32%, 38%)",
              transform: "translate(-50%, 0)",
              width: "min(78%, 260px)",
              height: "clamp(100px, 20vh, 150px)",
              borderRadius: 28,
              boxShadow: dragActive ? "0 0 0 4px rgba(255,183,77,0.5)" : "none",
              transition: "box-shadow 0.2s ease",
              zIndex: 2,
            }}
          />
          <motion.img
            src="/assets/tasty/girl_eat.png"
            alt=""
            draggable={false}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.06 }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.18))",
            }}
          />
        </div>
      </div>

      {/* Төменгі стелла: сүйрету */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(10px, 3vh, 24px)",
          transform: "translateX(-50%)",
          zIndex: 8,
          width: "min(98vw, 720px)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "clamp(10px, 2vw, 16px)",
          padding: "8px 12px",
        }}
      >
        {shelfItems.map((item) => {
          if (placedIds.has(item.id)) return null;
          return (
            <motion.div
              key={`${roundIndex}-${item.id}`}
              drag
              dragMomentum={false}
              dragElastic={0.08}
              dragSnapToOrigin
              whileDrag={{ scale: 1.07, zIndex: 50, cursor: "grabbing" }}
              onDragStart={() => setDragActive(true)}
              onDragEnd={(_, info) => {
                setDragActive(false);
                handleDragEnd(info, item.id);
              }}
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ ...cellStyle, cursor: allDone ? "default" : "grab" }}
            >
              <img
                src={item.image}
                alt=""
                draggable={false}
                style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                  filter: "drop-shadow(2px 3px 4px rgba(0,0,0,0.16))",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {allDone && <WellDone onReplay={onReplay} onHome={onHome} />}
    </motion.div>
  );
}
