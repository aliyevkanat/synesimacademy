import dogBig from "@/assets/dog-big.png";
import dogSmall from "@/assets/dog-small.png";
import catImg from "@/assets/cat.png";
import bearImg from "@/assets/bear.png";

export interface AnimalRound {
  name: string;
  bigImage: string;
  smallImage: string;
}

export const ROUNDS: AnimalRound[] = [
  { name: "Ит", bigImage: dogBig, smallImage: dogSmall },
  { name: "Мысық", bigImage: catImg, smallImage: catImg },
  { name: "Аю", bigImage: bearImg, smallImage: bearImg },
];
