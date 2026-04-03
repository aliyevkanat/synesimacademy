import SortGame from "../SortGame";

interface Props { onHome: () => void; onReplay: () => void; }

const bins = [
  { id: "sweet", emoji: "🍬", label: "Тәтті", color: "#f59e0b" },
  { id: "spicy", emoji: "🌶️", label: "Ащы", color: "#ef4444" },
];
const items = [
  { id: "candy", emoji: "🍬", label: "Кәмпит", correctBin: "sweet", description: "Бұл — тәтті кәмпит! 🍬" },
  { id: "pepper", emoji: "🌶️", label: "Бұрыш", correctBin: "spicy", description: "Бұл — ащы бұрыш! 🌶️" },
];

export default function G3Taste({ onHome, onReplay }: Props) {
  return (
    <SortGame
      onHome={onHome} onReplay={onReplay}
      title="🍬 Тәтті және Ащы"
      items={items} bins={bins}
      bgClass="from-amber-50 to-red-50"
    />
  );
}
