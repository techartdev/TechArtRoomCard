import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    --card-accent: var(--accent-color, #f5a623);
    --card-radius: 20px;
    --panel-radius: 16px;
    --panel-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
    --panel-border: 1px solid color-mix(in srgb, var(--divider-color, #444) 60%, transparent);
    --panel-gap: 12px;
    --text-primary: var(--primary-text-color, #e1e1e1);
    --text-secondary: var(--secondary-text-color, #9e9e9e);
    font-family: var(--ha-card-header-font-family, inherit);
  }

  ha-card {
    border-radius: var(--card-radius);
    box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.2));
    padding: 20px;
    background: var(--panel-bg);
    color: var(--text-primary);
    overflow: hidden;
  }

  /* ── Shell ── */
  .shell {
    display: flex;
    flex-direction: column;
    gap: var(--panel-gap);
  }

  /* ── Header ── */
  .header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    padding: 0 0 16px;
    border-bottom: 1px solid var(--divider-color, #333);
    gap: 16px;
    min-height: 48px;
  }

  .clock {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }

  .time {
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .date {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .weather {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-self: end;
  }

  .weather ha-icon {
    --mdc-icon-size: 28px;
    color: var(--card-accent);
  }

  .weather-temp {
    font-size: 1.6rem;
    font-weight: 700;
  }

  /* ── Grid ── */
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--panel-gap);
  }

  .col {
    display: flex;
    flex-direction: column;
    gap: var(--panel-gap);
    min-width: 0;
  }

  /* ── Panel (sub-card) ── */
  .panel {
    border-radius: var(--panel-radius);
    background: color-mix(in srgb, var(--card-background-color, #1c1c1e) 85%, var(--primary-background-color, #111) 15%);
    border: var(--panel-border);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
  }

  .panel-title {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.01em;
  }

  /* ── Light rows ── */
  .light-row {
    display: grid;
    grid-template-columns: 24px 1fr auto 24px;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    cursor: pointer;
  }

  .light-row:not(:last-of-type) {
    border-bottom: 1px solid color-mix(in srgb, var(--divider-color, #333) 50%, transparent);
  }

  .light-row ha-icon {
    --mdc-icon-size: 20px;
    color: var(--card-accent);
  }

  .light-row .chevron {
    --mdc-icon-size: 18px;
    color: var(--text-secondary);
  }

  .entity-name {
    font-size: 0.92rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pill {
    border: 0;
    border-radius: 999px;
    padding: 3px 12px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }

  .pill.on {
    background: var(--card-accent);
    color: #fff;
  }

  .pill.off {
    background: color-mix(in srgb, var(--disabled-color, #555) 70%, transparent);
    color: var(--text-secondary);
  }

  /* ── Brightness / Cover sliders ── */
  .slider-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: center;
    margin-top: 2px;
  }

  .slider-label {
    font-size: 0.85rem;
    font-weight: 600;
    min-width: 36px;
    text-align: right;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--divider-color, #444) 60%, transparent);
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--card-accent);
    cursor: pointer;
    border: 2px solid var(--panel-bg);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--card-accent);
    cursor: pointer;
    border: 2px solid var(--panel-bg);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  /* ── Climate ── */
  .climate-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 2px 0 0;
  }

  .climate-dial {
    width: min(206px, 100%);
    aspect-ratio: 1;
    position: relative;
    display: grid;
    place-items: center;
    touch-action: none;
    cursor: pointer;
  }

  .climate-arc {
    position: absolute;
    inset: 0;
    overflow: visible;
  }

  .climate-center {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
    margin-top: -8px;
  }

  .climate-mode-label {
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: capitalize;
    color: var(--text-primary);
    letter-spacing: 0.01em;
  }

  .climate-temp {
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .climate-temp-fallback {
    font-size: clamp(1.4rem, 4.8vw, 2.5rem);
    max-width: 100%;
    overflow-wrap: anywhere;
    text-align: center;
    line-height: 1.1;
  }

  .climate-setpoint {
    font-size: 1.1rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--card-accent);
  }

  .climate-setpoint ha-icon {
    --mdc-icon-size: 15px;
    color: var(--text-secondary);
  }

  .mode-row {
    display: flex;
    gap: 0;
    width: 100%;
    margin-top: 4px;
    border-radius: 12px;
    overflow: hidden;
    background: color-mix(in srgb, var(--divider-color, #444) 36%, transparent);
    border: 1px solid color-mix(in srgb, var(--divider-color, #444) 52%, transparent);
  }

  .mode-btn {
    border: 0;
    border-radius: 0;
    padding: 7px 6px;
    font-size: 0.74rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, transform 0.15s;
    background: transparent;
    color: var(--text-primary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-transform: capitalize;
    flex: 1 1 0;
    min-width: 0;
    border-right: 1px solid color-mix(in srgb, var(--divider-color, #444) 55%, transparent);
  }

  .mode-btn:last-child {
    border-right: none;
  }

  .mode-btn ha-icon {
    --mdc-icon-size: 16px;
  }

  .mode-btn .mode-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mode-btn.active {
    background: var(--card-accent);
    color: #fff;
    transform: none;
  }

  @media (max-width: 430px) {
    .mode-btn {
      padding: 8px 4px;
      gap: 0;
    }

    .mode-btn .mode-label {
      display: none;
    }

    .mode-btn ha-icon {
      --mdc-icon-size: 18px;
    }
  }

  /* ── Media ── */
  .media-row {
    display: grid;
    grid-template-columns: 48px 1fr auto;
    gap: 10px;
    align-items: center;
    cursor: pointer;
  }

  .thumb {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--card-accent) 30%, var(--panel-bg));
    object-fit: cover;
    flex-shrink: 0;
  }

  .media-info {
    min-width: 0;
  }

  .media-title {
    font-size: 0.92rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .media-subtitle {
    font-size: 0.78rem;
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .media-play {
    border: 0;
    background: color-mix(in srgb, var(--divider-color, #444) 50%, transparent);
    color: var(--text-primary);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.15s;
  }

  .media-play:hover {
    background: var(--card-accent);
    color: #fff;
  }

  /* ── Sensors ── */
  .sensor-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .sensor-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 999px;
    padding: 5px 10px;
    font-size: 0.78rem;
    font-weight: 500;
    background: color-mix(in srgb, var(--divider-color, #444) 40%, transparent);
    color: var(--text-primary);
    max-width: 100%;
  }

  .sensor-chip ha-icon {
    --mdc-icon-size: 14px;
  }

  .chip-label {
    color: var(--text-secondary);
    white-space: nowrap;
  }

  .chip-value {
    font-weight: 700;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sensor-chip.extra {
    border-radius: 12px;
    background: color-mix(in srgb, var(--divider-color, #444) 52%, transparent);
  }

  /* ── Shades ── */
  .shade-row {
    display: grid;
    grid-template-columns: 24px auto 1fr 24px;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    cursor: pointer;
  }

  .shade-row ha-icon {
    --mdc-icon-size: 20px;
  }

  .shade-row .chevron {
    --mdc-icon-size: 18px;
    color: var(--text-secondary);
  }

  .shade-position {
    font-size: 0.92rem;
    font-weight: 600;
  }

  .shade-slider-wrap {
    display: grid;
    grid-template-columns: 24px 1fr auto;
    gap: 8px;
    align-items: center;
  }

  .shade-slider-wrap ha-icon {
    --mdc-icon-size: 20px;
    color: var(--card-accent);
  }

  /* ── Footer ── */
  .footer-bar {
    display: flex;
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
    border-radius: 12px;
    background: color-mix(in srgb, var(--divider-color, #444) 36%, transparent);
    border: 1px solid color-mix(in srgb, var(--divider-color, #444) 52%, transparent);
  }

  .footer-btn {
    flex: 1 1 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 6px;
    border: none;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
    font-size: 0.74rem;
    font-weight: 700;
    transition: background 0.15s, color 0.15s;
    border-right: 1px solid color-mix(in srgb, var(--divider-color, #444) 55%, transparent);
    min-width: 0;
  }

  .footer-btn:last-child {
    border-right: none;
  }

  .footer-btn:active {
    background: color-mix(in srgb, var(--card-accent) 16%, transparent);
  }

  .footer-btn ha-icon {
    --mdc-icon-size: 22px;
    color: currentColor;
  }

  .footer-btn .footer-btn-text {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    padding: 0 2px;
  }

  .footer-btn.is-on {
    background: transparent;
    color: var(--card-accent);
  }

  /* ── Responsive ── */
  @media (max-width: 600px) {
    ha-card {
      padding: 14px;
    }

    .grid {
      grid-template-columns: 1fr;
    }

    .header {
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .title {
      grid-column: 1 / -1;
      grid-row: 1;
      text-align: left;
      font-size: 1.25rem;
    }

    .clock {
      grid-row: 2;
    }

    .weather {
      grid-row: 2;
      justify-self: end;
    }

    .climate-temp {
      font-size: 2.6rem;
    }
  }
`;
