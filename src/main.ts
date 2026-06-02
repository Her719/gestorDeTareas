import { TaskManager } from "./utils/taskManager.js";
import { StorageManager } from "./utils/storage.js";
import { DateUtil } from "./utils/date.js";
import { ValidationUtil } from "./utils/validation.js";
import { TaskForm } from "./components/taskForm.js";
import { TaskList } from "./components/taskList.js";
import { ThemeToggle } from "./components/themeToggle.js";
import { LanguageToggle } from "./components/languageToggle.js";
import { StatsPanel } from "./components/statsPanel.js";
import { Filters } from "./components/filters.js";
import { Priority, Language } from "./types/index.js";
import { languageManager } from "./i18n/language.js";
import { getTranslation } from "./i18n/translations.js";

class TaskApp {
  private taskManager: TaskManager;
  private taskForm: TaskForm;
  private taskList: TaskList;
  private themeToggle: ThemeToggle;
  private languageToggle: LanguageToggle;
  private statsPanel: StatsPanel;
  private filters: Filters;
  private currentLanguage: Language;

  constructor() {
    this.taskManager = new TaskManager();
    const config = StorageManager.getConfig();
    this.currentLanguage = config.language;

    this.taskForm = new TaskForm(
      config.language,
      (title, description, priority, dueDate) => {
        this.addTask(title, description, priority, dueDate);
      },
    );

    this.taskList = new TaskList(
      this.taskManager.getTasks(),
      config.alertDaysBefore,
      config.language,
      (taskId) => this.toggleTask(taskId),
      (taskId) => this.deleteTask(taskId),
    );

    this.themeToggle = new ThemeToggle(config.theme, (theme) => {
      this.setTheme(theme);
    });

    this.languageToggle = new LanguageToggle(config.language, (language) => {
      this.setLanguage(language);
    });

    this.statsPanel = new StatsPanel(
      this.taskManager.getStats(),
      config.language,
    );

    this.filters = new Filters(
      config.language,
      (priority, completed, search) => {
        this.applyFilters(priority, completed, search);
      },
    );

    // Subscribe to language changes
    languageManager.subscribe((language) => {
      this.currentLanguage = language;
      this.refreshAllComponents();
    });

    this.initialize();
  }

  private initialize(): void {
    this.render();
    this.loadStoredTheme();
    this.updateStats();
    this.setupAddTaskButton();
  }

  private setupAddTaskButton(): void {
    const addTaskBtn = document.getElementById("add-task-btn");
    if (addTaskBtn) {
      addTaskBtn.addEventListener("click", () => this.openAddTaskPanel());
    }
  }

  private openAddTaskPanel(): void {
    const footer = document.getElementById("form-footer");
    if (footer) {
      footer.classList.add("open");
      // Scroll to footer after a small delay to ensure it's rendered
      setTimeout(() => {
        footer.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);
    }
  }

  private closeAddTaskPanel(): void {
    const footer = document.getElementById("form-footer");
    if (footer) {
      footer.classList.remove("open");
    }
  }

  private render(): void {
    this.taskForm.render("form-container");
    this.taskList.render("task-list");
    this.themeToggle.render("theme-toggle");
    this.languageToggle.render("language-toggle");
    this.statsPanel.render("stats-container");
    this.filters.render("filters-container");
    this.updatePageTitle();
  }

  private loadStoredTheme(): void {
    const config = StorageManager.getConfig();

    const theme = config.theme || "dark";

    this.themeToggle.applyTheme(theme);
  }

  private addTask(
    title: string,
    description: string,
    priority: Priority,
    dueDate: string,
  ): void {
    const validation = ValidationUtil.validateTask(title, description, dueDate);

    if (!validation.valid) {
      console.error("Validation failed:", validation.errors);
      return;
    }

    const sanitizedTitle = ValidationUtil.sanitizeInput(title);
    const sanitizedDescription = ValidationUtil.sanitizeInput(description);

    const task = this.taskManager.addTask(
      sanitizedTitle,
      sanitizedDescription,
      priority,
      dueDate,
    );
    this.taskList.addTaskElement(task);
    this.updateStats();

    // Close the add task panel after successful creation
    this.closeAddTaskPanel();

    // Re-render to maintain sort order
    this.refreshTaskList();
  }

  private toggleTask(taskId: string): void {
    this.taskManager.toggleTask(taskId);
    this.taskList.updateTaskElement(
      this.taskManager.getTasks().find((t) => t.id === taskId)!,
    );
    this.updateStats();
    this.refreshTaskList();
  }

  private deleteTask(taskId: string): void {
    const t = (
      key: keyof typeof import("./i18n/translations.js").translations.es,
    ) => getTranslation(this.currentLanguage, key);
    const confirmed = confirm(t("deleteConfirm"));
    if (!confirmed) return;

    this.taskManager.deleteTask(taskId);
    this.taskList.removeTaskElement(taskId);
    this.updateStats();
  }

  private applyFilters(
    priority: Priority | "all",
    completed: "all" | "pending" | "completed",
    search: string,
  ): void {
    const config = StorageManager.getConfig();
    StorageManager.saveConfig({
      filterPriority: priority,
      filterCompleted: completed,
      searchQuery: search,
    });

    const filtered = this.taskManager.getFilteredTasks(
      priority,
      completed,
      search,
    );
    this.taskList.setTasks(filtered);
    this.taskList.render("task-list");
  }

  private refreshTaskList(): void {
    const config = StorageManager.getConfig();
    const filtered = this.taskManager.getFilteredTasks(
      config.filterPriority,
      config.filterCompleted,
      config.searchQuery,
    );
    this.taskList.setTasks(filtered);
    this.taskList.render("task-list");
  }

  private updateStats(): void {
    this.statsPanel.setStats(this.taskManager.getStats());
    this.statsPanel.render("stats-container");
  }

  private setTheme(theme: "light" | "dark"): void {
    StorageManager.saveConfig({ theme });
    this.themeToggle.applyTheme(theme);
  }

  private setLanguage(language: Language): void {
    StorageManager.saveConfig({ language });
    this.currentLanguage = language;
    this.refreshAllComponents();
  }

  private refreshAllComponents(): void {
    this.taskForm.setLanguage(this.currentLanguage);
    this.taskList.setLanguage(this.currentLanguage);
    this.languageToggle.setLanguage(this.currentLanguage);
    this.statsPanel.setLanguage(this.currentLanguage);
    this.filters.setLanguage(this.currentLanguage);

    // Re-render all components
    this.render();
    this.refreshTaskList();
    this.updateStats();
  }

  private updatePageTitle(): void {
    const t = (
      key: keyof typeof import("./i18n/translations.js").translations.es,
    ) => getTranslation(this.currentLanguage, key);
    document.title = `${t("appTitle")} - Task Manager`;
  }
}

// Initialize the app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new TaskApp();
});
