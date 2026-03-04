import activitiesData from "@/data/activities.json";
import type {
  Activity,
  ActivityLocation,
  ActivityTheme,
} from "./types";

export interface ActivityFilters {
  query: string;
  minutes: number[];
  locations: ActivityLocation[];
  themes: ActivityTheme[];
}

export const ALL_ACTIVITIES: Activity[] = activitiesData as Activity[];

export const MINUTE_OPTIONS: number[] = [5, 10, 15];

export const LOCATION_OPTIONS: ActivityLocation[] = [
  "indoor",
  "outdoor",
  "both",
];

export const THEME_OPTIONS: ActivityTheme[] = [
  "classification",
  "labeling",
  "rules",
  "feedback",
  "input_output",
  "bias_fairness",
  "privacy_safety",
];

export const DEFAULT_FILTERS: ActivityFilters = {
  query: "",
  minutes: [],
  locations: [],
  themes: [],
};

export function filterActivities(
  activities: Activity[],
  filters: ActivityFilters,
): Activity[] {
  return activities.filter((activity) => {
    if (!matchesMinutes(activity, filters.minutes)) {
      return false;
    }

    if (!matchesLocations(activity, filters.locations)) {
      return false;
    }

    if (!matchesThemes(activity, filters.themes)) {
      return false;
    }

    if (!matchesQuery(activity, filters.query)) {
      return false;
    }

    return true;
  });
}

export function searchActivities(
  activities: Activity[],
  query: string,
): Activity[] {
  if (!query.trim()) {
    return activities;
  }

  return activities.filter((activity) => matchesQuery(activity, query));
}

export function getRandomRecommended(
  activities: Activity[],
  filters: ActivityFilters | null,
  count: number,
): Activity[] {
  const base = filters ? filterActivities(activities, filters) : activities;

  if (base.length <= count) {
    return base;
  }

  const shuffled = [...base];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

function matchesMinutes(
  activity: Activity,
  minutes: number[],
): boolean {
  if (!minutes.length) {
    return true;
  }

  return minutes.includes(activity.minutes);
}

function matchesLocations(
  activity: Activity,
  locations: ActivityLocation[],
): boolean {
  if (!locations.length) {
    return true;
  }

  if (activity.location === "both") {
    return (
      locations.includes("indoor") ||
      locations.includes("outdoor") ||
      locations.includes("both")
    );
  }

  if (locations.includes("both")) {
    return true;
  }

  return locations.includes(activity.location);
}

function matchesThemes(
  activity: Activity,
  themes: ActivityTheme[],
): boolean {
  if (!themes.length) {
    return true;
  }

  return activity.themes.some((theme) => themes.includes(theme));
}

function matchesQuery(activity: Activity, rawQuery: string): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return true;
  }

  const haystacks: string[] = [
    activity.title,
    activity.setup,
    ...(activity.ai_concepts ?? []),
    ...(activity.steps ?? []),
    ...(activity.adult_script ?? []),
    ...(activity.materials ?? []),
  ];

  return haystacks.some((text) => text.toLowerCase().includes(query));
}

