export type Deck = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

export type Card = {
  id: number;
  name: string;
};

export type Combo = {
  id: number;
  deck_id: number;
  author: string;
  title: string;
  starting_hand: {
    card_id: number;
    card_name: string;
  }[]
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  created_at: string;
  tags: Tag[];
};

export type StepInput = {
  action_text: string;
  step_targets: Card[];
  card_id: number;
  step_order: number;
};

export type Step = StepInput & {
  id: number;
  combo_id: number;
};

export type Tag = {
  id: number;
  name: string;
};

export type ComboForm = {
    title: string;
    author: string;
    difficulty: string;
    startingHand: Card[]
    tags: Tag[];
    steps: {
        action_text: string;
        target_cards: Card[];
        card_id: number;
        step_order: number;
    }[];
};