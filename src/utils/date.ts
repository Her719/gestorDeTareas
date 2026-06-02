import { Language } from "../types/index.js";

export class DateUtil {
  static formatDate(dateString: string, language: Language = "es"): string {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    const locale = language === "es" ? "es-ES" : "en-US";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  static getDateStatus(
    dueDate: string,
    alertDaysBefore: number,
  ): "normal" | "alert" | "overdue" {
    if (!dueDate) return "normal";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "overdue";
    if (diffDays <= alertDaysBefore) return "alert";
    return "normal";
  }

  static isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() < today.getTime();
  }

  static getDaysUntilDue(dueDate: string): number {
    if (!dueDate) return Infinity;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
