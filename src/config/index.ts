export const STORAGE_KEYS = {
  TASKS: "tasks",
  CONFIG: "config",
  THEME: "theme",
} as const;

export const DEFAULT_CONFIG = {
  theme: "dark" as const,
  language: "es" as const,
  alertDaysBefore: 3,
};

export const PRIORITY_COLORS = {
  low: "#6366f1",
  medium: "#f59e0b",
  high: "#ef4444",
} as const;

export const ANIMATION_DURATION = 300;
