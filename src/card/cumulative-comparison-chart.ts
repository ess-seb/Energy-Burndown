import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCard } from "../ha-types";
import type { CardConfig, CardState, ComparisonSeries } from "./types";
import {
  buildComparisonPeriod,
  buildLtsQuery,
  mapLtsResponseToSeries,
  computeSummary,
  computeForecast,
  computeTextSummary
} from "./ha-api";
import { ChartRenderer } from "./chart-renderer";

@customElement("energy-burndown-card")
export class EnergyBurndownCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: CardConfig;
  @state() private _state: CardState = { status: "loading" };

  private _chartRenderer?: ChartRenderer;

  public setConfig(config: CardConfig): void {
    this._config = config;
    this._state = { status: "loading" };
  }

  public getCardSize(): number {
    return 4;
  }

  protected firstUpdated(): void {
    const canvas = this.renderRoot.querySelector("canvas") as
      | HTMLCanvasElement
      | null;
    if (canvas) {
      this._chartRenderer = new ChartRenderer(canvas);
    }
  }

  protected updated(changedProps: Map<string, unknown>): void {
    if (
      changedProps.has("hass") ||
      changedProps.has("_config") ||
      changedProps.has("_state")
    ) {
      if (this._state.status === "loading") {
        void this._loadData();
      }

      if (
        this._state.status === "ready" &&
        this._state.comparisonSeries &&
        this._chartRenderer
      ) {
        this._chartRenderer.update(this._state.comparisonSeries);
      }
    }
  }

  private async _loadData(): Promise<void> {
    if (!this._config || !this.hass) return;

    const now = new Date();
    const timeZone = "UTC";
    const period = buildComparisonPeriod(this._config, now, timeZone);
    const query = buildLtsQuery(period, this._config.entity);

    try {
      const response = await this.hass.connection.sendMessagePromise(
        query as unknown as Record<string, unknown>
      );

      const series = mapLtsResponseToSeries(
        response as any,
        this._config.entity,
        period
      ) as ComparisonSeries | undefined;

      if (!series) {
        this._state = { status: "no-data" };
        return;
      }

      const summary = computeSummary(series);
      const forecast = computeForecast(series);
      const textSummary = computeTextSummary(summary);

      this._state = {
        status: "ready",
        comparisonSeries: series,
        summary,
        forecast,
        textSummary
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      this._state = {
        status: "error",
        errorMessage: "Nie udało się pobrać danych statystyk długoterminowych."
      };
    }
  }

  protected render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    if (this._state.status === "loading") {
      return html`<ha-card>
        <div class="loading">
          <ha-circular-progress active size="small"></ha-circular-progress>
          <span>Ładowanie danych statystyk długoterminowych...</span>
        </div>
      </ha-card>`;
    }

    if (this._state.status === "error") {
      return html`<ha-card>
        <ha-alert alert-type="error">
          ${this._state.errorMessage ??
          "Wystąpił błąd podczas wczytywania danych."}
        </ha-alert>
      </ha-card>`;
    }

    if (this._state.status === "no-data") {
      return html`<ha-card>
        <ha-alert alert-type="info">
          Brak danych do wyświetlenia dla wybranego okresu.
        </ha-alert>
      </ha-card>`;
    }

    const heading = this._state.textSummary?.heading;

    return html`<ha-card>
      <div class="content">
        ${heading ? html`<div class="heading">${heading}</div>` : null}
        <div class="chart-container">
          <canvas></canvas>
        </div>
      </div>
    </ha-card>`;
  }

  static styles = css`
    :host {
      display: block;
    }

    .loading {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
    }

    .content {
      padding: 16px;
    }

    .heading {
      margin-bottom: 12px;
      font-weight: 500;
    }

    .chart-container {
      position: relative;
      height: 200px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "energy-burndown-card": EnergyBurndownCard;
  }
}

