import SortGame from "../SortGame";

interface Props { onHome: () => void; onReplay: () => void; }

const bins = [
  { id: "good", emoji: "🌸", label: "Хош иісті", color: "#ec4899" },
  { id: "bad", emoji: "🗑️", label: "Жағымсыз", color: "#78716c" },
];
const items = [
  { id: "flower", emoji: "🌺", label: "Гүл", correctBin: "good", description: "Гүл — хош иісті! 🌸" },
  { id: "trash", emoji: "🗑️", label: "Қоқыс", correctBin: "bad", description: "Қоқыс — жағымсыз иісті! 🗑️" },
];

export default function G3Smell({ onHome, onReplay }: Props) {
  return (
    <SortGame
      onHome={onHome} onReplay={onReplay}
      title="🌸 Хош және Жағымсыз иіс"
      items={items} bins={bins}
      bgClass="from-pink-50 to-rose-50"
    />
  );
}
