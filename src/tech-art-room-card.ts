import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

const CARD_VERSION = __CARD_VERSION__;

interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ) => void;
}

interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

interface EntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  precision?: number;
}

interface HeaderConfig {
  show_clock?: boolean;
  show_weather?: boolean;
  weather_entity?: string;
  outdoor_temp_entity?: string;
}

interface LightsConfig {
  entities?: string[] | string;
  brightness_entity?: string;
}

interface ClimateConfig {
  entity?: string;
  fallback_entity?: string;
}

interface MediaConfig {
  entity?: string;
}

interface SensorsConfig {
  air_quality_entity?: string;
  pm25_entity?: string;
  power_entity?: string;
  extras?: EntityConfig[];
}

interface ShadesConfig {
  entity?: string;
  secondary_entity?: string;
  power_entity?: string;
  fallback_entity?: string;
}

interface FooterButton {
  entity: string;
  text?: string;
  icon?: string;
  off_icon?: string;
}

interface RoomCardConfig {
  type: string;
  title?: string;
  header?: HeaderConfig;
  lights?: LightsConfig;
  climate?: ClimateConfig;
  media?: MediaConfig;
  sensors?: SensorsConfig;
  shades?: ShadesConfig;
  footer?: FooterButton[];
}

@customElement("tech-art-room-card")
export class TechArtRoomCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: RoomCardConfig;

  static styles = css`
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
      border-radius: 50%;
      position: relative;
      display: grid;
      place-items: center;
      background: color-mix(in srgb, var(--divider-color, #444) 45%, transparent);
      overflow: hidden;
    }

    .climate-dial::before {
      content: "";
      position: absolute;
      inset: 21px;
      border-radius: 50%;
      background: var(--panel-bg);
      z-index: 1;
    }

    .climate-dial::after {
      content: "";
      position: absolute;
      left: 10%;
      right: 10%;
      bottom: -3px;
      height: 35%;
      background: var(--panel-bg);
      border-top-left-radius: 100px;
      border-top-right-radius: 100px;
      z-index: 2;
    }

    .climate-dot {
      position: absolute;
      z-index: 4;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border: 2px solid var(--card-accent);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--panel-bg) 80%, transparent), 0 2px 8px rgba(0, 0, 0, 0.35);
    }

    .climate-center {
      position: relative;
      z-index: 3;
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

    .climate-setpoint {
      font-size: 1.1rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: color-mix(in srgb, var(--card-accent) 70%, #fff 30%);
    }

    .climate-setpoint ha-icon {
      --mdc-icon-size: 15px;
      color: var(--text-secondary);
    }

    .climate-slider {
      width: 100%;
      margin-top: -1px;
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

    .mode-btn.active {
      background: var(--card-accent);
      color: #fff;
      transform: none;
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
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      margin-top: 12px;
      overflow: hidden;
      border-radius: 0 0 var(--ha-card-border-radius, 12px) var(--ha-card-border-radius, 12px);
    }

    .footer-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 10px 4px;
      border: none;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 0.72rem;
      font-weight: 500;
      transition: background 0.15s;
      border-right: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      min-width: 0;
    }

    .footer-btn:last-child {
      border-right: none;
    }

    .footer-btn:active {
      background: color-mix(in srgb, var(--primary-color, #ff8800) 12%, var(--card-background-color, #fff));
    }

    .footer-btn ha-icon {
      --mdc-icon-size: 22px;
    }

    .footer-btn .footer-btn-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      padding: 0 2px;
    }

    .footer-btn.is-on ha-icon {
      color: var(--card-accent, var(--primary-color, #ff8800));
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

  setConfig(config: RoomCardConfig): void {
    if (!config?.type) {
      throw new Error("TechArt Room Card: Missing 'type: custom:tech-art-room-card' in configuration");
    }

    if (config.type !== "custom:tech-art-room-card") {
      throw new Error(`TechArt Room Card: Invalid type "${config.type}". Expected "custom:tech-art-room-card"`);
    }

    // Parse lights entities - handle array, comma-separated string, or undefined
    let lightEntities: string[] = [];
    const rawLights = config.lights?.entities;
    if (Array.isArray(rawLights)) {
      lightEntities = rawLights.filter((e): e is string => typeof e === "string" && e.trim() !== "");
    } else if (typeof rawLights === "string" && rawLights.trim() !== "") {
      lightEntities = rawLights.split(",").map((v) => v.trim()).filter(Boolean);
    }

    const rawExtras = config.sensors?.extras as unknown;
    const parsedExtras: EntityConfig[] = Array.isArray(rawExtras)
      ? rawExtras
          .map((item) => {
            if (typeof item === "string") {
              const entity = item.trim();
              return entity ? ({ entity } as EntityConfig) : null;
            }
            if (!item || typeof item !== "object" || typeof item.entity !== "string") return null;
            const entity = item.entity.trim();
            if (!entity) return null;
            const precisionNum = Number(item.precision);
            return {
              entity,
              name: item.name,
              icon: item.icon,
              precision: Number.isFinite(precisionNum) ? precisionNum : undefined,
            } as EntityConfig;
          })
          .filter((item): item is EntityConfig => !!item)
      : [];

    // Merge config with defaults (user config takes precedence)
    this._config = {
      type: config.type,
      title: config.title ?? "Living Room",
      header: {
        show_clock: config.header?.show_clock ?? true,
        show_weather: config.header?.show_weather ?? true,
        weather_entity: config.header?.weather_entity,
        outdoor_temp_entity: config.header?.outdoor_temp_entity,
      },
      lights: {
        entities: lightEntities,
        brightness_entity: config.lights?.brightness_entity,
      },
      climate: config.climate,
      media: config.media,
      sensors: config.sensors
        ? {
            air_quality_entity: config.sensors.air_quality_entity,
            pm25_entity: config.sensors.pm25_entity,
            power_entity: config.sensors.power_entity,
            extras: parsedExtras,
          }
        : undefined,
      shades: config.shades,
      footer: config.footer,
    };
  }

  static getStubConfig(): RoomCardConfig {
    return {
      type: "custom:tech-art-room-card",
      title: "Living Room",
      header: { show_clock: true, show_weather: true },
      lights: { entities: ["light.living_room_lamp", "light.living_room_ceiling"] },
      climate: { entity: "climate.living_room" },
      media: { entity: "media_player.living_room_tv" },
      sensors: {
        air_quality_entity: "sensor.living_room_air_quality",
        pm25_entity: "sensor.living_room_pm25",
        power_entity: "sensor.living_room_power",
        extras: [{ entity: "sensor.living_room_humidity", name: "Humidity", precision: 1 }],
      },
      shades: { entity: "cover.living_room_shade" },
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("tech-art-room-card-editor");
  }

  private _e(entityId?: string): HassEntity | undefined {
    if (!entityId) return undefined;
    return this.hass?.states?.[entityId];
  }

  private _name(entityId: string): string {
    return (
      (this._e(entityId)?.attributes?.friendly_name as string | undefined) ??
      entityId.split(".").pop() ??
      entityId
    );
  }

  private _openMoreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      })
    );
  }

  private _toggle(entityId: string): void {
    const [domain] = entityId.split(".");
    this.hass.callService(domain, "toggle", { entity_id: entityId });
  }

  private _setBrightness(entityId: string, value: number): void {
    this.hass.callService("light", "turn_on", {
      entity_id: entityId,
      brightness_pct: value,
    });
  }

  private _setCoverPosition(entityId: string, value: number): void {
    this.hass.callService("cover", "set_cover_position", {
      entity_id: entityId,
      position: value,
    });
  }

  private _setTemperature(entityId: string, value: number): void {
    this.hass.callService("climate", "set_temperature", {
      entity_id: entityId,
      temperature: value,
    });
  }

  private _setHvacMode(entityId: string, mode: string): void {
    this.hass.callService("climate", "set_hvac_mode", {
      entity_id: entityId,
      hvac_mode: mode,
    });
  }

  private _hvacIcon(mode: string): string {
    const icons: Record<string, string> = {
      off: "mdi:power",
      heat: "mdi:fire",
      cool: "mdi:snowflake",
      dry: "mdi:water-percent",
      auto: "mdi:fan-auto",
      fan_only: "mdi:fan",
      heat_cool: "mdi:thermostat-auto",
    };
    return icons[mode] ?? "mdi:fan";
  }

  private _formatNumber(value: number, precision: number): string {
    const normalized = Math.max(0, Math.min(4, Math.round(precision)));
    return value.toFixed(normalized).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
  }

  private _formatEntityValue(entity: HassEntity, precision?: number): string {
    const numeric = Number(entity.state);
    const unit = (entity.attributes.unit_of_measurement as string | undefined) ?? "";
    if (!Number.isFinite(numeric)) {
      return [entity.state, unit].filter(Boolean).join(" ").trim();
    }

    const autoPrecision = Math.abs(numeric) >= 100 ? 0 : Math.abs(numeric) >= 10 ? 1 : 2;
    const formatted = this._formatNumber(numeric, precision ?? autoPrecision);
    return [formatted, unit].filter(Boolean).join(" ").trim();
  }

  private _footerAction(btn: FooterButton): void {
    const entity = this._e(btn.entity);
    if (!entity) return;
    const domain = btn.entity.split(".")[0];
    const toggleDomains = ["switch", "light", "fan", "input_boolean", "automation", "script"];
    if (toggleDomains.includes(domain)) {
      this.hass.callService(domain, "toggle", { entity_id: btn.entity });
    } else {
      this._openMoreInfo(btn.entity);
    }
  }

  private _renderFooter() {
    const buttons = this._config.footer;
    if (!buttons?.length) return nothing;

    return html`
      <div class="footer-bar">
        ${buttons.map((btn) => {
          const entity = this._e(btn.entity);
          const isOn = entity?.state === "on" || entity?.state === "playing" || entity?.state === "open";
          const domain = btn.entity.split(".")[0];
          const toggleDomains = ["switch", "light", "fan", "input_boolean", "automation", "script"];
          const isToggle = toggleDomains.includes(domain);
          const icon = isToggle && !isOn && btn.off_icon ? btn.off_icon : (btn.icon ?? this._defaultIcon(btn.entity));
          return html`
            <button
              class="footer-btn ${isOn ? "is-on" : ""}"
              @click=${() => this._footerAction(btn)}
              title=${btn.text ?? btn.entity}
            >
              <ha-icon icon=${icon}></ha-icon>
              ${btn.text ? html`<span class="footer-btn-text">${btn.text}</span>` : nothing}
            </button>
          `;
        })}
      </div>
    `;
  }

  private _defaultIcon(entityId: string): string {
    const domain = entityId.split(".")[0];
    const map: Record<string, string> = {
      light: "mdi:lightbulb",
      switch: "mdi:toggle-switch",
      media_player: "mdi:play-circle",
      climate: "mdi:thermometer",
      cover: "mdi:window-shutter",
      fan: "mdi:fan",
      scene: "mdi:palette",
      script: "mdi:script-text",
      automation: "mdi:robot",
      input_boolean: "mdi:checkbox-marked-circle",
    };
    return map[domain] ?? "mdi:gesture-tap";
  }

  private _renderHeader() {
    const cfg = this._config.header ?? {};
    const now = new Date();
    const weather = this._e(cfg.weather_entity);
    const outside = this._e(cfg.outdoor_temp_entity);

    return html`
      <div class="header">
        ${cfg.show_clock !== false
          ? html`
              <div class="clock">
                <span class="time">${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
                <span class="date">${now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</span>
              </div>
            `
          : html`<div></div>`}
        <div class="title">${this._config.title ?? "Room"}</div>
        <div class="weather">
          ${cfg.show_weather !== false && weather
            ? html`
                <ha-icon icon="${(weather.attributes.icon as string | undefined) ?? "mdi:weather-partly-cloudy"}"></ha-icon>
                <span class="weather-temp">${outside?.state ?? weather.attributes.temperature ?? "--"}°</span>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderLights() {
    const lights = ((this._config.lights?.entities ?? []) as string[]).filter((e: string) => this._e(e));
    if (!lights.length) return nothing;
    const bEntityId = this._config.lights?.brightness_entity ?? lights[0];
    const bEntity = this._e(bEntityId);
    const brightness = Math.round((((bEntity?.attributes.brightness as number | undefined) ?? 0) / 255) * 100);

    return html`
      <section class="panel">
        <div class="panel-title">Lights</div>
        ${lights.map((id: string) => {
          const isOn = this._e(id)?.state === "on";
          return html`
            <div class="light-row" @click=${() => this._openMoreInfo(id)}>
              <ha-icon icon="mdi:lightbulb${isOn ? "" : "-outline"}"></ha-icon>
              <span class="entity-name">${this._name(id)}</span>
              <button
                class="pill ${isOn ? "on" : "off"}"
                @click=${(ev: Event) => { ev.stopPropagation(); this._toggle(id); }}
              >${isOn ? "ON" : "OFF"}</button>
              <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            </div>
          `;
        })}
        <div class="slider-row">
          <input
            type="range"
            min="1"
            max="100"
            .value=${String(Number.isFinite(brightness) ? brightness : 50)}
            @change=${(ev: Event) =>
              this._setBrightness(bEntityId, Number((ev.currentTarget as HTMLInputElement).value))}
          />
          <span class="slider-label">${brightness}%</span>
        </div>
      </section>
    `;
  }

  private _renderClimate() {
    const climateId = this._config.climate?.entity;
    const climate = this._e(climateId);

    if (!climate && !this._config.climate?.fallback_entity) return nothing;

    if (!climate) {
      const fallback = this._config.climate?.fallback_entity as string;
      const fb = this._e(fallback);
      if (!fb) return nothing;
      return html`
        <section class="panel">
          <div class="panel-title">Climate</div>
          <div class="climate-body">
            <span class="climate-temp">${fb.state}°</span>
            <span class="climate-setpoint">${this._name(fallback)}</span>
          </div>
        </section>
      `;
    }

    const fallbackSensor = this._e(this._config.climate?.fallback_entity);
    const acTemp = (climate.attributes.current_temperature as number | undefined) ?? Number(climate.state) ?? 0;
    const parsedFallback = fallbackSensor ? Number(fallbackSensor.state) : NaN;
    const currentTemp = Number.isFinite(parsedFallback) ? parsedFallback : acTemp;
    const target = (climate.attributes.temperature as number | undefined) ?? acTemp;
    const modes = (climate.attributes.hvac_modes as string[] | undefined) ?? [];
    const active = climate.state;
    const minTarget = 10;
    const maxTarget = 32;
    const safeTarget = Number.isFinite(target) ? target : 21;
    const clampedTarget = Math.min(maxTarget, Math.max(minTarget, safeTarget));
    const progress = (clampedTarget - minTarget) / (maxTarget - minTarget);
    const filledDegrees = Math.max(0, Math.min(240, Math.round(progress * 240)));
    const dialGradient = `conic-gradient(from 210deg, var(--card-accent) 0deg ${filledDegrees}deg, color-mix(in srgb, var(--divider-color, #444) 60%, transparent) ${filledDegrees}deg 240deg, color-mix(in srgb, var(--divider-color, #444) 60%, transparent) 240deg 360deg)`;
    const dotAngleDeg = 210 + filledDegrees;
    const dotRadians = (dotAngleDeg * Math.PI) / 180;
    const dotX = 50 + Math.cos(dotRadians) * 38;
    const dotY = 50 + Math.sin(dotRadians) * 38;

    return html`
      <section class="panel">
        <div class="panel-title">Climate</div>
        <div class="climate-body">
          <div class="climate-dial" style="background: ${dialGradient};">
            <span class="climate-dot" style="left:${dotX}%; top:${dotY}%;"></span>
            <div class="climate-center">
              <span class="climate-mode-label">${active}</span>
              <span class="climate-temp">${Math.round(currentTemp)}°</span>
              <span class="climate-setpoint"><ha-icon icon="mdi:thermometer"></ha-icon>${Math.round(clampedTarget)}°</span>
            </div>
          </div>
          <input
            class="climate-slider"
            type="range"
            min=${String(minTarget)}
            max=${String(maxTarget)}
            .value=${String(clampedTarget)}
            @change=${(ev: Event) =>
              this._setTemperature(climate.entity_id, Number((ev.currentTarget as HTMLInputElement).value))}
          />
        </div>
        <div class="mode-row">
          ${modes.map(
            (mode) => html`
              <button
                class="mode-btn ${mode === active ? "active" : ""}"
                @click=${() => this._setHvacMode(climate.entity_id, mode)}
              ><ha-icon icon=${this._hvacIcon(mode)}></ha-icon>${mode.replace("_", " ")}</button>
            `
          )}
        </div>
      </section>
    `;
  }

  private _renderMedia() {
    const media = this._e(this._config.media?.entity);
    if (!media) return nothing;

    const art = media.attributes.entity_picture as string | undefined;
    return html`
      <section class="panel">
        <div class="panel-title">Media</div>
        <div class="media-row" @click=${() => this._openMoreInfo(media.entity_id)}>
          ${art ? html`<img class="thumb" src="${art}" alt="album art" />` : html`<div class="thumb"></div>`}
          <div class="media-info">
            <div class="media-title">${this._name(media.entity_id)}</div>
            <div class="media-subtitle">${String(media.attributes.media_title ?? media.state)}</div>
          </div>
          <button class="media-play" @click=${(ev: Event) => {
            ev.stopPropagation();
            this.hass.callService("media_player", media.state === "playing" ? "media_pause" : "media_play", {
              entity_id: media.entity_id,
            });
          }}>
            ${media.state === "playing" ? "⏸" : "▶"}
          </button>
        </div>
      </section>
    `;
  }

  private _renderSensors() {
    const cfg = this._config.sensors;
    const aq = this._e(cfg?.air_quality_entity);
    const pm = this._e(cfg?.pm25_entity);
    const power = this._e(cfg?.power_entity);
    
    // Handle extras defensively - ensure it's an array of EntityConfig objects
    let extras: EntityConfig[] = [];
    if (Array.isArray(cfg?.extras)) {
      extras = cfg.extras.filter((item) => item && typeof item === "object" && item.entity && this._e(item.entity));
    }

    if (!aq && !pm && !power && !extras.length) return nothing;

    return html`
      <section class="panel">
        <div class="panel-title">Sensors & Power</div>
        <div class="sensor-chips">
          ${aq ? html`<span class="sensor-chip"><ha-icon icon="mdi:air-filter"></ha-icon><span class="chip-label">Air Quality</span><span class="chip-value">${this._formatEntityValue(aq)}</span></span>` : nothing}
          ${pm ? html`<span class="sensor-chip"><ha-icon icon="mdi:blur"></ha-icon><span class="chip-label">PM2.5</span><span class="chip-value">${this._formatEntityValue(pm, 1)}</span></span>` : nothing}
          ${power ? html`<span class="sensor-chip"><ha-icon icon="mdi:flash"></ha-icon><span class="chip-label">Power</span><span class="chip-value">${this._formatEntityValue(power, 0)}</span></span>` : nothing}
          ${extras.map((item) => {
            const e = this._e(item.entity)!;
            return html`<span class="sensor-chip extra"><span class="chip-label">${item.name ?? this._name(item.entity)}</span><span class="chip-value">${this._formatEntityValue(e, item.precision)}</span></span>`;
          })}
        </div>
      </section>
    `;
  }

  private _renderShades() {
    const cfg = this._config.shades;
    const shade = this._e(cfg?.entity);
    const second = this._e(cfg?.secondary_entity);
    const power = this._e(cfg?.power_entity);
    const fallback = this._e(cfg?.fallback_entity);

    if (!shade && !second && !power && !fallback) return nothing;

    const position = (shade?.attributes.current_position as number | undefined) ?? 0;

    return html`
      <section class="panel">
        <div class="panel-title">Shades</div>
        ${shade
          ? html`
              <div class="shade-slider-wrap">
                <ha-icon icon="mdi:window-shutter"></ha-icon>
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value=${String(position)}
                  @change=${(ev: Event) =>
                    this._setCoverPosition(shade.entity_id, Number((ev.currentTarget as HTMLInputElement).value))}
                />
                <span class="slider-label">${position}%</span>
              </div>
            `
          : nothing}
        ${second
          ? html`
              <div class="shade-row" @click=${() => this._openMoreInfo(second.entity_id)}>
                <ha-icon icon="mdi:window-shutter-open"></ha-icon>
                <span class="entity-name">${this._name(second.entity_id)}</span>
                <span class="shade-position">${second.state}</span>
                <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
              </div>`
          : nothing}
        ${power
          ? html`
              <div class="shade-row" @click=${() => this._openMoreInfo(power.entity_id)}>
                <ha-icon icon="mdi:flash"></ha-icon>
                <span class="entity-name">Power</span>
                <span class="shade-position">${power.state} ${power.attributes.unit_of_measurement ?? ""}</span>
                <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
              </div>`
          : nothing}
        ${fallback
          ? html`
              <div class="shade-row" @click=${() => this._openMoreInfo(fallback.entity_id)}>
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span class="entity-name">${this._name(fallback.entity_id)}</span>
                <span class="shade-position">${fallback.state}</span>
                <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
              </div>`
          : nothing}
      </section>
    `;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    return html`
      <ha-card>
        <div class="shell">
          ${this._renderHeader()}
          <div class="grid">
            <div class="col">
              ${this._renderLights()} ${this._renderMedia()} ${this._renderSensors()}
            </div>
            <div class="col">${this._renderClimate()} ${this._renderShades()}</div>
          </div>
        </div>
        ${this._renderFooter()}
      </ha-card>
    `;
  }
}

@customElement("tech-art-room-card-editor")
export class TechArtRoomCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: RoomCardConfig;

  static styles = css`
    .editor-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .section {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 12px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 12px;
      color: var(--primary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
    }
    .form-row:last-child {
      margin-bottom: 0;
    }
    label {
      font-size: 12px;
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    ha-entity-picker {
      width: 100%;
      display: block;
    }
    input {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 14px;
      color: var(--primary-text-color);
      width: 100%;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .light-entities {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .light-entity-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 6px;
      align-items: center;
    }
    .extra-entity-row {
      display: grid;
      grid-template-columns: 1fr 92px auto;
      gap: 6px;
      align-items: center;
    }
    .precision-input {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      padding: 8px 10px;
      font-size: 13px;
      color: var(--primary-text-color);
      width: 100%;
      box-sizing: border-box;
    }
    .remove-btn {
      border: 0;
      background: color-mix(in srgb, var(--error-color, #f44336) 15%, transparent);
      color: var(--error-color, #f44336);
      border-radius: 4px;
      padding: 6px 10px;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }
    .add-btn {
      border: 1px dashed var(--divider-color);
      background: transparent;
      color: var(--primary-color);
      border-radius: 4px;
      padding: 8px;
      cursor: pointer;
      font-size: 13px;
      width: 100%;
      margin-top: 4px;
    }
    .footer-btn-editor {
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 10px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .footer-btn-editor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .footer-btn-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .footer-btn-grid .form-row {
      margin-bottom: 0;
    }
  `;

  setConfig(config: RoomCardConfig): void {
    this._config = config;
  }

  private _value(path: string, fallback = ""): string {
    const val = path.split(".").reduce<unknown>((acc, key) => {
      if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
      return undefined;
    }, this._config);
    if (Array.isArray(val)) {
      return val.join(", ");
    }
    return (val as string | undefined) ?? fallback;
  }

  private _emit(path: string, value: string | undefined) {
    // Deep-clone the entire config via JSON to fully unfreeze every nested object.
    // HA freezes the config tree deeply, so shallow spreads still leave inner
    // objects frozen and cause "Cannot assign to read only property" errors.
    const updated: Record<string, unknown> = JSON.parse(
      JSON.stringify(this._config ?? { type: "custom:tech-art-room-card" })
    );

    const keys = path.split(".");
    let current: Record<string, unknown> = updated;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLast = i === keys.length - 1;

      if (isLast) {
        // Delete the key entirely when value is empty/undefined — avoids invalid config
        if (value === undefined || value === null || value === "") {
          delete current[key];
        } else {
          current[key] = value;
        }
      } else {
        if (current[key] === null || typeof current[key] !== "object") {
          current[key] = {};
        }
        current = current[key] as Record<string, unknown>;
      }
    }

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _pick(path: string, value: string | undefined) {
    this._emit(path, value);
  }

  private _lightEntities(): string[] {
    const raw = this._config?.lights?.entities;
    if (Array.isArray(raw)) return raw as string[];
    if (typeof raw === "string" && raw.trim()) return raw.split(",").map((v) => v.trim()).filter(Boolean);
    return [];
  }

  private _setLightEntities(entities: string[]) {
    const updated: Record<string, unknown> = JSON.parse(
      JSON.stringify(this._config ?? { type: "custom:tech-art-room-card" })
    );
    if (!updated["lights"] || typeof updated["lights"] !== "object") updated["lights"] = {};
    (updated["lights"] as Record<string, unknown>)["entities"] = entities;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: updated }, bubbles: true, composed: true }));
  }

  private _extraEntities(): EntityConfig[] {
    const raw = this._config?.sensors?.extras;
    if (Array.isArray(raw)) {
      return raw
        .filter((item): item is EntityConfig => !!item && typeof item === "object" && typeof item.entity === "string")
        .map((item) => ({
          entity: item.entity,
          name: item.name,
          icon: item.icon,
          precision: Number.isFinite(Number(item.precision)) ? Number(item.precision) : undefined,
        }));
    }
    return [];
  }

  private _setExtraEntities(entities: EntityConfig[]) {
    const updated: Record<string, unknown> = JSON.parse(
      JSON.stringify(this._config ?? { type: "custom:tech-art-room-card" })
    );
    if (!updated["sensors"] || typeof updated["sensors"] !== "object") updated["sensors"] = {};
    (updated["sensors"] as Record<string, unknown>)["extras"] = entities
      .filter((e) => e.entity && e.entity.trim())
      .map((e) => ({
        entity: e.entity,
        name: e.name,
        icon: e.icon,
        precision: Number.isFinite(Number(e.precision)) ? Number(e.precision) : undefined,
      }));
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: updated }, bubbles: true, composed: true }));
  }

  private _footerButtons(): FooterButton[] {
    const raw = this._config?.footer;
    if (Array.isArray(raw)) return raw as FooterButton[];
    return [];
  }

  private _setFooterButtons(buttons: FooterButton[]) {
    const updated: Record<string, unknown> = JSON.parse(
      JSON.stringify(this._config ?? { type: "custom:tech-art-room-card" })
    );
    updated["footer"] = buttons.length ? buttons : undefined;
    if (updated["footer"] === undefined) delete updated["footer"];
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: updated }, bubbles: true, composed: true }));
  }

  protected render() {
    const lightEntities = this._lightEntities();
    const extraEntities = this._extraEntities();
    const footerButtons = this._footerButtons();

    return html`
      <div class="editor-container">
        <div class="form-row">
          <label>Room title</label>
          <input .value=${this._value("title", "Living Room")} @input=${(e: Event) => this._emit("title", (e.target as HTMLInputElement).value)} />
        </div>

        <div class="section">
          <div class="section-title">Header</div>
          <div class="form-row">
            <label>Weather entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("header.weather_entity")}
              .selector=${{ entity: { domain: "weather" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("header.weather_entity", e.detail.value)}
            ></ha-selector>
          </div>
          <div class="form-row">
            <label>Outside temperature entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("header.outdoor_temp_entity")}
              .selector=${{ entity: { domain: "sensor" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("header.outdoor_temp_entity", e.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Lights</div>
          <div class="form-row">
            <label>Light entities</label>
            <div class="light-entities">
              ${lightEntities.map((entityId, idx) => html`
                <div class="light-entity-row">
                  <ha-selector
                    .hass=${this.hass}
                    .value=${entityId}
                    .selector=${{ entity: { domain: "light" } }}
                    allow-custom-entity
                    .required=${false}
                    @value-changed=${(e: CustomEvent) => {
                      const updated = [...lightEntities];
                      updated[idx] = e.detail.value;
                      this._setLightEntities(updated.filter(Boolean));
                    }}
                  ></ha-selector>
                  <button class="remove-btn" @click=${() => {
                    const updated = lightEntities.filter((_, i) => i !== idx);
                    this._setLightEntities(updated);
                  }}>Remove</button>
                </div>
              `)}
              <button class="add-btn" @click=${() => this._setLightEntities([...lightEntities, ""])}>+ Add light</button>
            </div>
          </div>
          <div class="form-row">
            <label>Brightness entity (optional, defaults to first light)</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("lights.brightness_entity")}
              .selector=${{ entity: { domain: "light" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("lights.brightness_entity", e.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Climate</div>
          <div class="form-row">
            <label>Climate entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("climate.entity")}
              .selector=${{ entity: { domain: "climate" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("climate.entity", e.detail.value)}
            ></ha-selector>
          </div>
          <div class="form-row">
            <label>Fallback temperature sensor (when no climate entity)</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("climate.fallback_entity")}
              .selector=${{ entity: { domain: "sensor" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("climate.fallback_entity", e.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Media</div>
          <div class="form-row">
            <label>Media player entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("media.entity")}
              .selector=${{ entity: { domain: "media_player" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("media.entity", e.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Sensors</div>
          <div class="form-row">
            <label>Air quality entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("sensors.air_quality_entity")}
              .selector=${{ entity: { domain: "sensor" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("sensors.air_quality_entity", e.detail.value)}
            ></ha-selector>
          </div>
          <div class="form-row">
            <label>PM2.5 entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("sensors.pm25_entity")}
              .selector=${{ entity: { domain: "sensor" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("sensors.pm25_entity", e.detail.value)}
            ></ha-selector>
          </div>
          <div class="form-row">
            <label>Power entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("sensors.power_entity")}
              .selector=${{ entity: { domain: "sensor" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("sensors.power_entity", e.detail.value)}
            ></ha-selector>
          </div>
          <div class="form-row">
            <label>Extra sensor entities</label>
            <div class="light-entities">
              ${extraEntities.map((extra, idx) => html`
                <div class="extra-entity-row">
                  <ha-selector
                    .hass=${this.hass}
                    .value=${extra.entity}
                    .selector=${{ entity: { domain: ["sensor", "binary_sensor"] } }}
                    allow-custom-entity
                    .required=${false}
                    @value-changed=${(e: CustomEvent) => {
                      const updated = [...extraEntities];
                      updated[idx] = { ...updated[idx], entity: e.detail.value ?? "" };
                      this._setExtraEntities(updated);
                    }}
                  ></ha-selector>
                  <input
                    class="precision-input"
                    type="number"
                    min="0"
                    max="4"
                    step="1"
                    .value=${extra.precision !== undefined ? String(extra.precision) : ""}
                    placeholder="Prec."
                    @input=${(e: Event) => {
                      const raw = (e.target as HTMLInputElement).value;
                      const updated = [...extraEntities];
                      updated[idx] = {
                        ...updated[idx],
                        precision: raw === "" ? undefined : Number(raw),
                      };
                      this._setExtraEntities(updated);
                    }}
                  />
                  <button class="remove-btn" @click=${() => {
                    const updated = extraEntities.filter((_, i) => i !== idx);
                    this._setExtraEntities(updated);
                  }}>Remove</button>
                </div>
              `)}
              <button class="add-btn" @click=${() => this._setExtraEntities([...extraEntities, { entity: "" }])}>+ Add sensor</button>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Shades</div>
          <div class="form-row">
            <label>Shade entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("shades.entity")}
              .selector=${{ entity: { domain: "cover" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("shades.entity", e.detail.value)}
            ></ha-selector>
          </div>
          <div class="form-row">
            <label>Secondary shade entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("shades.secondary_entity")}
              .selector=${{ entity: { domain: "cover" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("shades.secondary_entity", e.detail.value)}
            ></ha-selector>
          </div>
          <div class="form-row">
            <label>Shade power entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("shades.power_entity")}
              .selector=${{ entity: { domain: "sensor" } }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("shades.power_entity", e.detail.value)}
            ></ha-selector>
          </div>
          <div class="form-row">
            <label>Fallback entity</label>
            <ha-selector
              .hass=${this.hass}
              .value=${this._value("shades.fallback_entity")}
              .selector=${{ entity: {} }}
              allow-custom-entity
              .required=${false}
              @value-changed=${(e: CustomEvent) => this._pick("shades.fallback_entity", e.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Footer Buttons</div>
          ${footerButtons.map((btn, idx) => html`
            <div class="footer-btn-editor">
              <div class="footer-btn-editor-header">
                <span>Button ${idx + 1}</span>
                <button class="remove-btn" @click=${() => {
                  const updated = footerButtons.filter((_, i) => i !== idx);
                  this._setFooterButtons(updated);
                }}>Remove</button>
              </div>
              <div class="form-row">
                <label>Entity *</label>
                <ha-selector
                  .hass=${this.hass}
                  .value=${btn.entity}
                  .selector=${{ entity: {} }}
                  allow-custom-entity
                  .required=${false}
                  @value-changed=${(e: CustomEvent) => {
                    const updated = footerButtons.map((b, i) => i === idx ? { ...b, entity: e.detail.value ?? "" } : b);
                    this._setFooterButtons(updated.filter((b) => b.entity));
                  }}
                ></ha-selector>
              </div>
              <div class="footer-btn-grid">
                <div class="form-row">
                  <label>Label text</label>
                  <input
                    .value=${btn.text ?? ""}
                    placeholder="e.g. Lights"
                    @input=${(e: Event) => {
                      const val = (e.target as HTMLInputElement).value;
                      const updated = footerButtons.map((b, i) => i === idx ? { ...b, text: val || undefined } : b);
                      this._setFooterButtons(updated);
                    }}
                  />
                </div>
                <div class="form-row">
                  <label>Icon (mdi:...)</label>
                  <input
                    .value=${btn.icon ?? ""}
                    placeholder="e.g. mdi:lightbulb"
                    @input=${(e: Event) => {
                      const val = (e.target as HTMLInputElement).value;
                      const updated = footerButtons.map((b, i) => i === idx ? { ...b, icon: val || undefined } : b);
                      this._setFooterButtons(updated);
                    }}
                  />
                </div>
                <div class="form-row">
                  <label>Off icon (mdi:...)</label>
                  <input
                    .value=${btn.off_icon ?? ""}
                    placeholder="e.g. mdi:lightbulb-outline"
                    @input=${(e: Event) => {
                      const val = (e.target as HTMLInputElement).value;
                      const updated = footerButtons.map((b, i) => i === idx ? { ...b, off_icon: val || undefined } : b);
                      this._setFooterButtons(updated);
                    }}
                  />
                </div>
              </div>
            </div>
          `)}
          <button class="add-btn" @click=${() => this._setFooterButtons([...footerButtons, { entity: "" }])}>+ Add button</button>
        </div>
      </div>
    `;
  }
}

declare global {
  const __CARD_VERSION__: string;
  interface HTMLElementTagNameMap {
    "tech-art-room-card": TechArtRoomCard;
  }
}

// Export version for cache-busting queries
export { CARD_VERSION };

type WindowWithCustomCards = typeof window & { customCards: unknown[] };
const win = window as WindowWithCustomCards;
win.customCards = win.customCards || [];
win.customCards.push({
  type: "tech-art-room-card",
  name: "TechArt Room Card",
  description: "A dynamic room cockpit card for Home Assistant",
  preview: true,
  documentationURL: "https://github.com/techartdev/TechArtRoomCard",
});
