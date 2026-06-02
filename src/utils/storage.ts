import { Task, AppConfig } from "../types/index.js";
import { STORAGE_KEYS, DEFAULT_CONFIG } from "../config/index.js";

export class StorageManager {
  static getTasks(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : [];
    } catch {
      console.error("Error loading tasks from localStorage");
      return [];
    }
  }

  static saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch {
      console.error("Error saving tasks to localStorage");
    }
  }

  static getConfig(): AppConfig {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return data
        ? { ...DEFAULT_CONFIG, ...JSON.parse(data) }
        : {
            ...DEFAULT_CONFIG,
            filterPriority: "all",
            filterCompleted: "all",
            searchQuery: "",
          };
    } catch {
      console.error("Error loading config from localStorage");
      return {
        ...DEFAULT_CONFIG,
        filterPriority: "all",
        filterCompleted: "all",
        searchQuery: "",
      };
    }
  }

  static saveConfig(config: Partial<AppConfig>): void {
    try {
      const current = this.getConfig();
      localStorage.setItem(
        STORAGE_KEYS.CONFIG,
        JSON.stringify({ ...current, ...config }),
      );
    } catch {
      console.error("Error saving config to localStorage");
    }
  }

  static clearAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.TASKS);
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
    } catch {
      console.error("Error clearing localStorage");
    }
  }
}
