export type Priority = "low" | "medium" | "high";
export type Theme = "light" | "dark";
export type Language = "es" | "en";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface AppConfig {
  theme: Theme;
  language: Language;
  alertDaysBefore: number;
  filterPriority: Priority | "all";
  filterCompleted: "all" | "pending" | "completed";
  searchQuery: string;
}

export interface Stats {
  total: number;
  pending: number;
  completed: number;
  overdue: number;
}
