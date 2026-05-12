import clsx from "clsx";
import { playSound } from "../utils/audio";
import TransparentBackButton from "./TransparentBackButton";

interface HomeButtonProps {
  onHome: () => void;
  className?: string;
}

export default function HomeButton({ onHome, className }: HomeButtonProps) {
  return (
    <TransparentBackButton
      ariaLabel="Артқа"
      className={clsx("fixed top-4 left-4", className)}
      onClick={() => {
        playSound("button_click.mp3");
        onHome();
      }}
    />
  );
}
