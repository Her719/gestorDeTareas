import { Priority, Language } from "../types/index.js";
import { getTranslation } from "../i18n/translations.js";

export class TaskForm {
  private container: HTMLElement | null = null;
  private language: Language;
  private onSubmit: (
    title: string,
    description: string,
    priority: Priority,
    dueDate: string,
  ) => void;

  constructor(
    language: Language,
    onSubmit: (
      title: string,
      description: string,
      priority: Priority,
      dueDate: string,
    ) => void,
  ) {
    this.language = language;
    this.onSubmit = onSubmit;
  }

  setLanguage(language: Language): void {
    this.language = language;
  }

  render(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.container = container;
    const t = (
      key: keyof typeof import("../i18n/translations.js").translations.es,
    ) => getTranslation(this.language, key);

    container.innerHTML = `
      <form class="task-form" id="new-task-form">
        <div class="form-group">
          <input
            type="text"
            id="task-title"
            class="form-input form-input-title"
            placeholder="${t("taskTitlePlaceholder")}"
            maxlength="100"
            autocomplete="off"
          >
          <span class="form-error" id="title-error"></span>
        </div>

        <div class="form-group-row">
          <textarea
            id="task-description"
            class="form-input form-textarea"
            placeholder="${t("descriptionPlaceholder")}"
            maxlength="500"
            rows="2"
          ></textarea>
          <select id="task-priority" class="form-select">
            <option value="low">${t("priorityLow")}</option>
            <option value="medium" selected>${t("priorityMedium")}</option>
            <option value="high">${t("priorityHigh")}</option>
          </select>
        </div>

        <div class="form-group-row">
          <input
            type="date"
            id="task-due-date"
            class="form-input"
          >
          <button type="submit" class="btn-primary btn-submit">
            <span class="btn-text">${t("addTask")}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        <span class="form-error" id="form-error"></span>
      </form>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const form = document.getElementById("new-task-form") as HTMLFormElement;
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    const titleInput = document.getElementById(
      "task-title",
    ) as HTMLInputElement;
    if (titleInput) {
      titleInput.addEventListener("input", () => {
        const errorSpan = document.getElementById("title-error");
        if (errorSpan) errorSpan.textContent = "";
      });
    }
  }

  private handleSubmit(): void {
    const titleInput = document.getElementById(
      "task-title",
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "task-description",
    ) as HTMLTextAreaElement;
    const prioritySelect = document.getElementById(
      "task-priority",
    ) as HTMLSelectElement;
    const dueDateInput = document.getElementById(
      "task-due-date",
    ) as HTMLInputElement;
    const titleError = document.getElementById("title-error");
    const formError = document.getElementById("form-error");

    if (!titleInput || !prioritySelect || !dueDateInput) return;

    const t = (
      key: keyof typeof import("../i18n/translations.js").translations.es,
    ) => getTranslation(this.language, key);

    const title = titleInput.value.trim();
    const description = descriptionInput?.value.trim() || "";
    const priority = prioritySelect.value as Priority;
    const dueDate = dueDateInput.value;

    if (!title) {
      if (titleError) titleError.textContent = t("taskRequired");
      titleInput.focus();
      return;
    }

    if (title.length > 100) {
      if (titleError) titleError.textContent = t("titleTooLong");
      return;
    }

    if (description.length > 500) {
      if (formError) formError.textContent = t("descriptionTooLong");
      return;
    }

    if (formError) formError.textContent = "";
    if (titleError) titleError.textContent = "";

    this.onSubmit(title, description, priority, dueDate);

    // Clear form
    titleInput.value = "";
    if (descriptionInput) descriptionInput.value = "";
    prioritySelect.value = "medium";
    dueDateInput.value = "";
  }

  clearErrors(): void {
    const titleError = document.getElementById("title-error");
    const formError = document.getElementById("form-error");
    if (titleError) titleError.textContent = "";
    if (formError) formError.textContent = "";
  }
}
