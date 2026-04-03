export type Screen =
  | "menu"
  | "cat1" | "cat2" | "cat3"
  | "g1_colors" | "g1_size" | "g1_size_mode" | "g1_size_learn" | "g1_size_quiz" | "g1_length_mode" | "g1_length_learn" | "g1_length_quiz" | "g1_height" | "g1_width_mode" | "g1_width_learn"
  | "g1_color_mode" | "g1_learn_colors" | "g1_color_detail" | "g1_quiz"
  | "g2_temp" | "g2_temp_mode" | "g2_temp_learn" | "g2_temp_hot" | "g2_temp_cold" | "g2_temp_quiz"
  | "g2_texture" | "g2_weight"
  | "g3_taste" | "g3_smell";

export interface SortItem {
  id: string;
  emoji: string;
  label: string;
  correctBin: string;
  description: string;
}

export interface SortBin {
  id: string;
  emoji: string;
  label: string;
  color: string;
}
