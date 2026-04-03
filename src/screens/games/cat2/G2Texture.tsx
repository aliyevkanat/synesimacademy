import SortGame from "../SortGame";

interface Props { onHome: () => void; onReplay: () => void; }

const bins = [
  { id: "soft", emoji: "🛏️", label: "Жұмсақ", color: "#a855f7" },
  { id: "hard", emoji: "🪨", label: "Қатты", color: "#78716c" },
];
const items = [
  { id: "pillow", emoji: "🛏️", label: "Жастық", correctBin: "soft", description: "Жастық — жұмсақ! 🛏️" },
  { id: "stone", emoji: "🪨", label: "Тас", correctBin: "hard", description: "Тас — қатты! 🪨" },
];

export default function G2Texture({ onHome, onReplay }: Props) {
  return (
    <SortGame
      onHome={onHome} onReplay={onReplay}
      title="🪨 Жұмсақ және Қатты"
      items={items} bins={bins}
      bgClass="from-purple-50 to-stone-100"
    />
  );
}
