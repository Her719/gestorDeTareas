import { Language } from "./translations.js";
import { StorageManager } from "../utils/storage.js";

const LANGUAGE_KEY = "language";

export class LanguageManager {
  private currentLanguage: Language = "es";
  private listeners: ((language: Language) => void)[] = [];

  constructor() {
    this.loadLanguage();
  }

  private loadLanguage(): void {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    if (stored === "es" || stored === "en") {
      this.currentLanguage = stored;
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.substring(0, 2);
      this.currentLanguage = browserLang === "es" ? "es" : "en";
    }
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  setLanguage(language: Language): void {
    this.currentLanguage = language;
    localStorage.setItem(LANGUAGE_KEY, language);
    this.notifyListeners();
  }

  toggleLanguage(): Language {
    const newLanguage = this.currentLanguage === "es" ? "en" : "es";
    this.setLanguage(newLanguage);
    return newLanguage;
  }

  subscribe(callback: (language: Language) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.currentLanguage));
  }
}

export const languageManager = new LanguageManager();
