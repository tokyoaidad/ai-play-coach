export type ActivityLocation = "indoor" | "outdoor" | "both";

export type ActivityTheme =
  | "classification"
  | "labeling"
  | "rules"
  | "feedback"
  | "input_output"
  | "bias_fairness"
  | "privacy_safety";

export type ActivitySkill =
  | "language"
  | "attention"
  | "logic"
  | "math"
  | "motor"
  | "emotion"
  | "social";

export interface ActivityVariations {
  easier?: string[];
  harder?: string[];
  outdoor?: string[];
}

export interface Activity {
  id: string;
  title: string;
  age_range: string;
  minutes: number;
  location: ActivityLocation;
  materials: string[];
  themes: ActivityTheme[];
  ai_concepts: string[];
  skills: ActivitySkill[];
  setup: string;
  steps: string[];
  adult_script: string[];
  variations: ActivityVariations;
  safety: string[];

  // Optional fields for forward-compatibility with planning docs
  // These are not present in data/activities.json today but allow
  // future extensions without breaking types.
  privacy?: string[];
  learning_goals?: string[];

  // Aliases that mirror planning-time camelCase names.
  ageRange?: string;
  durationMinutes?: number;
  scene?: ActivityLocation;
}

