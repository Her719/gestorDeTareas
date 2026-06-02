import { Priority, Language } from "../types/index.js";
import { getTranslation } from "../i18n/translations.js";

export class Filters {
  private language: Language;
  private onFilterChange: (
    priority: Priority | "all",
    completed: "all" | "pending" | "completed",
    search: string,
  ) => void;

  constructor(
    language: Language,
    onFilterChange: (
      priority: Priority | "all",
      completed: "all" | "pending" | "completed",
      search: string,
    ) => void,
  ) {
    this.language = language;
    this.onFilterChange = onFilterChange;
  }

  setLanguage(language: Language): void {
    this.language = language;
  }

  render(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    const t = (
      key: keyof typeof import("../i18n/translations.js").translations.es,
    ) => getTranslation(this.language, key);

    container.innerHTML = `
      <div class="filters-container">
        <div class="filter-group">
          <input
            type="text"
            id="search-input"
            class="form-input filter-search"
            placeholder="${t("searchPlaceholder")}"
            autocomplete="off"
          >
        </div>

        <div class="filter-group">
          <select id="priority-filter" class="form-select">
            <option value="all">${t("allPriorities")}</option>
            <option value="low">${t("lowPriority")}</option>
            <option value="medium">${t("mediumPriority")}</option>
            <option value="high">${t("highPriority")}</option>
          </select>
        </div>

        <div class="filter-group">
          <select id="status-filter" class="form-select">
            <option value="all">${t("allTasks")}</option>
            <option value="pending">${t("pendingOnly")}</option>
            <option value="completed">${t("completedOnly")}</option>
          </select>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const searchInput = document.getElementById(
      "search-input",
    ) as HTMLInputElement;
    const priorityFilter = document.getElementById(
      "priority-filter",
    ) as HTMLSelectElement;
    const statusFilter = document.getElementById(
      "status-filter",
    ) as HTMLSelectElement;

    const handleChange = () => {
      const priority = (priorityFilter.value || "all") as Priority | "all";
      const status = (statusFilter.value || "all") as
        | "all"
        | "pending"
        | "completed";
      const search = searchInput.value;
      this.onFilterChange(priority, status, search);
    };

    if (searchInput) {
      searchInput.addEventListener("input", handleChange);
    }
    if (priorityFilter) {
      priorityFilter.addEventListener("change", handleChange);
    }
    if (statusFilter) {
      statusFilter.addEventListener("change", handleChange);
    }
  }

  resetFilters(): void {
    const searchInput = document.getElementById(
      "search-input",
    ) as HTMLInputElement;
    const priorityFilter = document.getElementById(
      "priority-filter",
    ) as HTMLSelectElement;
    const statusFilter = document.getElementById(
      "status-filter",
    ) as HTMLSelectElement;

    if (searchInput) searchInput.value = "";
    if (priorityFilter) priorityFilter.value = "all";
    if (statusFilter) statusFilter.value = "all";
  }
}
