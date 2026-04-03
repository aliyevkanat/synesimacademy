import SortGame from "../SortGame";

interface Props { onHome: () => void; onReplay: () => void; }

const bins = [
  { id: "hot", emoji: "🔥", label: "Ыстық", color: "#ef4444" },
  { id: "cold", emoji: "❄️", label: "Суық", color: "#3b82f6" },
];
const items = [
  { id: "tea", emoji: "☕", label: "Шай", correctBin: "hot", description: "Шай — ыстық! 🔥" },
  { id: "ice", emoji: "🍦", label: "Балмұздақ", correctBin: "cold", description: "Балмұздақ — суық! ❄️" },
];

export default function G2Temperature({ onHome, onReplay }: Props) {
  return (
    <SortGame
      onHome={onHome} onReplay={onReplay}
      title="🌡️ Ыстық және Суық"
      items={items} bins={bins}
      bgClass="from-red-50 to-blue-50"
    />
  );
}
