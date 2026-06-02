export type Language = "es" | "en";

export const translations = {
  es: {
    // Header
    appTitle: "Gestor de Tareas",
    toggleTheme: "Cambiar tema",
    toggleLanguage: "Change Language",

    // Stats
    total: "Total",
    pending: "Pendientes",
    completed: "Completadas",
    overdue: "Vencidas",

    // Filters
    searchPlaceholder: "Buscar tareas...",
    allPriorities: "Todas las prioridades",
    lowPriority: "Prioridad baja",
    mediumPriority: "Prioridad media",
    highPriority: "Prioridad alta",
    allTasks: "Todas las tareas",
    pendingOnly: "Solo pendientes",
    completedOnly: "Solo completadas",

    // Form
    taskTitlePlaceholder: "Agregar una nueva tarea...",
    descriptionPlaceholder: "Descripción (opcional)",
    priorityLow: "Baja",
    priorityMedium: "Media",
    priorityHigh: "Alta",
    addTask: "Agregar tarea",
    noDate: "Sin fecha",

    // Priority badges
    low: "BAJA",
    medium: "MEDIA",
    high: "ALTA",

    // Empty state
    noTasks: "¡Sin tareas aún. Crea una para comenzar!",

    // Errors
    taskRequired: "El título es requerido",
    titleTooLong: "El título debe tener 100 caracteres o menos",
    descriptionTooLong: "La descripción debe tener 500 caracteres o menos",
    invalidDate: "Formato de fecha inválido",

    // Confirmation
    deleteConfirm: "¿Está seguro de que desea eliminar esta tarea?",

    // Date formatting
    dateFormat: "es-ES",
  },
  en: {
    // Header
    appTitle: "Task Manager",
    toggleTheme: "Toggle theme",
    toggleLanguage: "Cambiar a Español",

    // Stats
    total: "Total",
    pending: "Pending",
    completed: "Completed",
    overdue: "Overdue",

    // Filters
    searchPlaceholder: "Search tasks...",
    allPriorities: "All Priorities",
    lowPriority: "Low Priority",
    mediumPriority: "Medium Priority",
    highPriority: "High Priority",
    allTasks: "All Tasks",
    pendingOnly: "Pending Only",
    completedOnly: "Completed Only",

    // Form
    taskTitlePlaceholder: "Add a new task...",
    descriptionPlaceholder: "Description (optional)",
    priorityLow: "Low",
    priorityMedium: "Medium",
    priorityHigh: "High",
    addTask: "Add Task",
    noDate: "No date",

    // Priority badges
    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH",

    // Empty state
    noTasks: "No tasks yet. Create one to get started!",

    // Errors
    taskRequired: "Task title is required",
    titleTooLong: "Title must be 100 characters or less",
    descriptionTooLong: "Description must be 500 characters or less",
    invalidDate: "Invalid date format",

    // Confirmation
    deleteConfirm: "Are you sure you want to delete this task?",

    // Date formatting
    dateFormat: "en-US",
  },
};

export function getTranslation(
  language: Language,
  key: keyof typeof translations.es,
): string {
  return translations[language][key] || "";
}
