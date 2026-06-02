import { Task, Priority, Stats } from "../types/index.js";
import { StorageManager } from "./storage.js";
import { DateUtil } from "./date.js";

export class TaskManager {
  private tasks: Task[] = [];

  constructor() {
    this.tasks = StorageManager.getTasks();
  }

  private generateId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      // Completadas al final
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Por prioridad
      const priorityOrder: Record<Priority, number> = {
        high: 0,
        medium: 1,
        low: 2,
      };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      // Por fecha más cercana
      const aDays = DateUtil.getDaysUntilDue(a.dueDate);
      const bDays = DateUtil.getDaysUntilDue(b.dueDate);
      return aDays - bDays;
    });
  }

  addTask(
    title: string,
    description: string,
    priority: Priority,
    dueDate: string,
  ): Task {
    const task: Task = {
      id: this.generateId(),
      title,
      description,
      priority,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(task);
    this.save();
    return task;
  }

  getTasks(): Task[] {
    return this.sortTasks([...this.tasks]);
  }

  getFilteredTasks(
    priority: Priority | "all" = "all",
    completed: "all" | "pending" | "completed" = "all",
    searchQuery: string = "",
  ): Task[] {
    let filtered = this.getTasks();

    // Filter by priority
    if (priority !== "all") {
      filtered = filtered.filter((t) => t.priority === priority);
    }

    // Filter by completion status
    if (completed === "pending") {
      filtered = filtered.filter((t) => !t.completed);
    } else if (completed === "completed") {
      filtered = filtered.filter((t) => t.completed);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query),
      );
    }

    return filtered;
  }

  toggleTask(taskId: string): Task | null {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return null;

    task.completed = !task.completed;
    this.save();
    return task;
  }

  deleteTask(taskId: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === taskId);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    this.save();
    return true;
  }

  getStats(): Stats {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = this.tasks.filter(
      (t) => !t.completed && DateUtil.isOverdue(t.dueDate),
    ).length;

    return { total, pending, completed, overdue };
  }

  private save(): void {
    StorageManager.saveTasks(this.tasks);
  }
}
