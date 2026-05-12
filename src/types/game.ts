export type Screen =
  | "welcome"
  | "menu"
  | "cat1" | "cat2" | "cat3"
  | "g1_colors" | "g1_size" | "g1_size_mode" | "g1_size_learn" | "g1_size_quiz" | "g1_length_mode" | "g1_length_learn" | "g1_length_quiz" | "g1_height" | "g1_width_mode" | "g1_width_learn" | "g1_width_quiz"
  | "g1_color_mode" | "g1_learn_colors" | "g1_color_detail" | "g1_quiz" | "g1_color_quiz"
  | "g2_temp" | "g2_temp_mode" | "g2_temp_learn" | "g2_temp_hot" | "g2_temp_cold" | "g2_temp_quiz"
  | "g2_texture" | "g2_texture_mode" | "g2_texture_learn" | "g2_texture_quiz" | "g2_weight_mode" | "g2_weight_learn" | "g2_weight"
  | "g3_taste" | "g3_taste_mode" | "g3_taste_learn" | "g3_sour" | "g3_sour_mode" | "g3_sour_learn" | "g3_smell" | "g3_smell_mode" | "g3_smell_learn";

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
