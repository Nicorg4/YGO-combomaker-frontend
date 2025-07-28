export type Deck = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  combos_count: number;
};

export type Card = {
  card_id: number;
  card_name: string;
};

export type Combo = {
  id: number;
  deck_id: number;
  author: string;
  title: string;
  final_board: Card[];
  starting_hand: Card[];
  difficulty: "Easy" | "Medium" | "Hard";
  created_at: string;
  tags: Tag[];
};

export type StepInput = {
  action_text: string;
  step_targets: Card[];
  card_id: number;
  step_order: number;
};

export type Step = {
  action_text: string;
  step_targets: Card[];
  card_id: number;
  step_order: number;
};

export type Tag = {
  id: number;
  name: string;
};

export type ComboForm = {
  title: string;
  author: string;
  difficulty: string;
  starting_hand: Card[];
  final_board: Card[];
  tags: Tag[];
  steps: Step[];
};

export type BottomLefNotificationProps = {
  message: string;
  duration: number;
  show: boolean;
  type: "success" | "error" | "info";
  onClose: () => void;
};

export type DeckInfo = {
  key_cards: KeyCard[];
  main_dangers: MainDanger[];
  note: string;
};

export type KeyCard = {
  card_id: number;
  card_name: string;
  description: string;
};

export type MainDanger = {
  card_id: number;
  card_name: string;
  extra_notes: string;
  responses: {
    card_id: number;
    card_name: string;
  }[];
};
