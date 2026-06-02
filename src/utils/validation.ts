export class ValidationUtil {
  static isEmptyString(str: string): boolean {
    return !str || str.trim().length === 0;
  }

  static isValidTitle(title: string): boolean {
    return !this.isEmptyString(title) && title.length <= 100;
  }

  static isValidDescription(description: string): boolean {
    return description.length <= 500;
  }

  static isValidDate(dateString: string): boolean {
    if (this.isEmptyString(dateString)) return true;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  static sanitizeInput(input: string): string {
    return input.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  static validateTask(
    title: string,
    description: string,
    dueDate: string,
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.isValidTitle(title)) {
      errors.push("Title is required and must be 100 characters or less");
    }

    if (!this.isValidDescription(description)) {
      errors.push("Description must be 500 characters or less");
    }

    if (!this.isValidDate(dueDate)) {
      errors.push("Invalid date format");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
