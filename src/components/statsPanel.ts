import { Stats, Language } from "../types/index.js";
import { getTranslation } from "../i18n/translations.js";

export class StatsPanel {
  private stats: Stats;
  private language: Language;

  constructor(stats: Stats, language: Language) {
    this.stats = stats;
    this.language = language;
  }

  setStats(stats: Stats): void {
    this.stats = stats;
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
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-value">${this.stats.total}</div>
          <div class="stat-label">${t("total")}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${this.stats.pending}</div>
          <div class="stat-label">${t("pending")}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${this.stats.completed}</div>
          <div class="stat-label">${t("completed")}</div>
        </div>
        <div class="stat-item stat-overdue">
          <div class="stat-value">${this.stats.overdue}</div>
          <div class="stat-label">${t("overdue")}</div>
        </div>
      </div>
    `;
  }
}
