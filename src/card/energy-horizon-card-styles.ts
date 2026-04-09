import { css } from "lit";

export const energyHorizonCardStyles = css`
  :host {
    display: block;
    height: 100%;
    /* Brand accent for current series — HA theme first where applicable */
    --eh-series-current: var(--primary-color, #119894);
  }

  .loading {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
  }

  .content {
    padding: var(--ebc-pad, 24px);
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--ebc-gap, 16px);
  }

  .ebc-card {
    height: 100%;
    box-sizing: border-box;
  }

  .ebc-section--header {
    flex-shrink: 0;
  }

  .ebc-header-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ebc-header-icon-wrap {
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: color-mix(
      in srgb,
      var(--divider-color) 35%,
      var(--card-background-color, var(--ha-card-background, transparent))
    );
  }

  .ebc-icon {
    display: inline-flex;
    --mdc-icon-size: 24px;
    color: var(--primary-text-color);
  }

  .ebc-header-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .ebc-header-title {
    font-weight: 600;
    font-size: 1.05rem;
    line-height: 1.25;
    color: var(--primary-text-color);
  }

  .ebc-header-entity {
    font-size: 0.8rem;
    line-height: 1.2;
    color: var(--secondary-text-color);
    word-break: break-all;
  }

  .ebc-section--comparison,
  .ebc-section--forecast-total {
    flex-shrink: 0;
  }

  .ebc-comparison-grid,
  .ebc-surface-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: start;
    gap: 0 12px;
  }

  .ebc-comparison-col,
  .ebc-surface-col {
    min-width: 0;
  }

  .ebc-comparison-divider {
    width: 1px;
    align-self: stretch;
    min-height: 48px;
    background-color: var(--divider-color);
    opacity: 0.85;
  }

  .ebc-caption {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    margin-bottom: 6px;
    line-height: 1.3;
  }

  .ebc-caption--strong {
    font-weight: 600;
  }

  .ebc-value {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
  }

  .ebc-value--reference {
    font-weight: 500;
    color: var(--secondary-text-color);
  }

  .ebc-delta-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    width: fit-content;
    max-width: 100%;
    flex-wrap: wrap;
    box-sizing: border-box;
  }

  .ebc-delta-sep {
    opacity: 0.45;
    font-weight: 500;
  }

  .ebc-trend--negative {
    color: var(--error-color);
    background-color: color-mix(in srgb, var(--error-color) 10%, transparent);
  }

  .ebc-trend--positive {
    color: var(--success-color);
    background-color: color-mix(in srgb, var(--success-color) 10%, transparent);
  }

  .ebc-trend--neutral {
    color: var(--secondary-text-color);
    background-color: color-mix(
      in srgb,
      var(--divider-color) 40%,
      var(--card-background-color, var(--ha-card-background, transparent))
    );
  }

  .ebc-trend--unknown {
    color: var(--secondary-text-color);
    background-color: color-mix(
      in srgb,
      var(--divider-color) 35%,
      var(--card-background-color, var(--ha-card-background, transparent))
    );
  }

  .ebc-section--forecast-total {
    padding: 12px 14px;
    border-radius: 12px;
    background-color: color-mix(
      in srgb,
      var(--divider-color) 22%,
      var(--card-background-color, var(--ha-card-background, transparent))
    );
  }

  .ebc-forecast-confidence {
    margin-top: 8px;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  .ebc-section--chart {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .chart-container {
    position: relative;
    flex: 1 1 auto;
    min-height: 240px;
  }

  .ebc-section--comment {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
    padding: 10px 12px;
    border-radius: 10px;
    background-color: color-mix(
      in srgb,
      var(--divider-color) 18%,
      var(--card-background-color, var(--ha-card-background, transparent))
    );
  }

  .ebc-comment-icon {
    flex-shrink: 0;
    --mdc-icon-size: 22px;
    margin-top: 2px;
  }

  .ebc-comment-icon.ebc-trend--negative {
    color: var(--error-color);
  }

  .ebc-comment-icon.ebc-trend--positive {
    color: var(--success-color);
  }

  .ebc-comment-icon.ebc-trend--neutral,
  .ebc-comment-icon.ebc-trend--unknown {
    color: var(--secondary-text-color);
  }

  .ebc-comment-text {
    font-size: 0.9rem;
    line-height: 1.45;
    color: var(--primary-text-color);
  }

  .ebc-section--warning {
    flex-shrink: 0;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    line-height: 1.4;
    color: var(--warning-color);
    background-color: color-mix(in srgb, var(--warning-color) 12%, transparent);
  }
`;
