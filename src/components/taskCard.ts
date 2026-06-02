import { Task, Language } from "../types/index.js";
import { DateUtil } from "../utils/date.js";
import { getTranslation } from "../i18n/translations.js";

export class TaskCard {
  private task: Task;
  private alertDaysBefore: number;
  private language: Language;
  private onToggle: (taskId: string) => void;
  private onDelete: (taskId: string) => void;

  constructor(
    task: Task,
    alertDaysBefore: number,
    language: Language,
    onToggle: (taskId: string) => void,
    onDelete: (taskId: string) => void,
  ) {
    this.task = task;
    this.alertDaysBefore = alertDaysBefore;
    this.language = language;
    this.onToggle = onToggle;
    this.onDelete = onDelete;
  }

  render(): HTMLElement {
    const card = document.createElement("div");
    card.className = `task-card priority-${this.task.priority}`;
    card.id = `task-${this.task.id}`;

    const dateStatus = DateUtil.getDateStatus(
      this.task.dueDate,
      this.alertDaysBefore,
    );
    if (dateStatus !== "normal") {
      card.classList.add(`date-${dateStatus}`);
    }

    if (this.task.completed) {
      card.classList.add("completed");
    }

    const priorityKey =
      `priority${this.task.priority.charAt(0).toUpperCase() + this.task.priority.slice(1)}` as keyof typeof import("../i18n/translations.js").translations.es;
    const priorityLabel =
      this.task.priority === "low"
        ? getTranslation(this.language, "low")
        : this.task.priority === "medium"
          ? getTranslation(this.language, "medium")
          : getTranslation(this.language, "high");

    card.innerHTML = `
      <div class="task-card-content">
        <div class="task-header">
          <label class="checkbox-wrapper">
            <input type="checkbox" class="task-checkbox" ${this.task.completed ? "checked" : ""}>
            <span class="checkmark"></span>
          </label>
          <div class="task-main">
            <h3 class="task-title">${this.escapeHtml(this.task.title)}</h3>
            ${this.task.description ? `<p class="task-description">${this.escapeHtml(this.task.description)}</p>` : ""}
          </div>
        </div>
        
        <div class="task-footer">
          <div class="task-meta">
            <span class="priority-badge priority-${this.task.priority}">
              ${priorityLabel}
            </span>
            ${this.task.dueDate ? `<span class="date-badge">${DateUtil.formatDate(this.task.dueDate, this.language)}</span>` : `<span class="date-badge">${getTranslation(this.language, "noDate")}</span>`}
          </div>
          <button class="btn-delete" title="Delete task">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    const checkbox = card.querySelector(".task-checkbox") as HTMLInputElement;
    checkbox.addEventListener("change", () => this.onToggle(this.task.id));

    const deleteBtn = card.querySelector(".btn-delete") as HTMLButtonElement;
    deleteBtn.addEventListener("click", () => this.onDelete(this.task.id));

    return card;
  }

  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}
