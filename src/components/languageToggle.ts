import { Language, getTranslation } from "../i18n/translations.js";
import { languageManager } from "../i18n/language.js";

export class LanguageToggle {
  private currentLanguage: Language;
  private onLanguageChange: (language: Language) => void;

  constructor(
    initialLanguage: Language,
    onLanguageChange: (language: Language) => void,
  ) {
    this.currentLanguage = initialLanguage;
    this.onLanguageChange = onLanguageChange;
  }

  render(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    const label = this.currentLanguage === "es" ? "EN" : "ES";

    container.innerHTML = `
      <button class="btn-language-toggle" id="language-toggle" title="${getTranslation(this.currentLanguage, "toggleLanguage")}">
        ${label}
      </button>
    `;

    const button = document.getElementById(
      "language-toggle",
    ) as HTMLButtonElement;
    if (button) {
      button.addEventListener("click", () => this.toggleLanguage());
    }
  }

  private toggleLanguage(): void {
    this.currentLanguage = languageManager.toggleLanguage();
    this.onLanguageChange(this.currentLanguage);
  }

  setLanguage(language: Language): void {
    this.currentLanguage = language;
  }
}
