import { Task, Priority, Language } from "../types/index.js";
import { TaskCard } from "./taskCard.js";
import { getTranslation } from "../i18n/translations.js";

export class TaskList {
  private tasks: Task[];
  private alertDaysBefore: number;
  private language: Language;
  private onToggle: (taskId: string) => void;
  private onDelete: (taskId: string) => void;
  private container: HTMLElement | null = null;

  constructor(
    tasks: Task[],
    alertDaysBefore: number,
    language: Language,
    onToggle: (taskId: string) => void,
    onDelete: (taskId: string) => void,
  ) {
    this.tasks = tasks;
    this.alertDaysBefore = alertDaysBefore;
    this.language = language;
    this.onToggle = onToggle;
    this.onDelete = onDelete;
  }

  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  setLanguage(language: Language): void {
    this.language = language;
  }

  render(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.container = container;
    container.innerHTML = "";

    if (this.tasks.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p>${getTranslation(this.language, "noTasks")}</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();
    this.tasks.forEach((task) => {
      const card = new TaskCard(
        task,
        this.alertDaysBefore,
        this.language,
        this.onToggle,
        this.onDelete,
      );
      fragment.appendChild(card.render());
    });

    container.appendChild(fragment);
  }

  addTaskElement(task: Task): void {
    if (!this.container) return;

    // Clear empty state if present
    const emptyState = this.container.querySelector(".empty-state");
    if (emptyState) {
      this.container.innerHTML = "";
    }

    const card = new TaskCard(
      task,
      this.alertDaysBefore,
      this.language,
      this.onToggle,
      this.onDelete,
    );
    const element = card.render();
    element.classList.add("animate-in");

    this.container.insertBefore(element, this.container.firstChild);
  }

  removeTaskElement(taskId: string): void {
    const element = document.getElementById(`task-${taskId}`);
    if (element) {
      element.classList.add("animate-out");
      setTimeout(() => element.remove(), 300);
    }
  }

  updateTaskElement(task: Task): void {
    const element = document.getElementById(`task-${task.id}`);
    if (!element) return;

    element.classList.add("updating");
    setTimeout(() => {
      const card = new TaskCard(
        task,
        this.alertDaysBefore,
        this.language,
        this.onToggle,
        this.onDelete,
      );
      const newElement = card.render();
      element.replaceWith(newElement);
    }, 150);
  }
}
