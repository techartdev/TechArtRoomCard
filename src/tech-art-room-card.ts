import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

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

interface RoomCardConfig {
  type: string;
  title?: string;
  header?: HeaderConfig;
  lights?: LightsConfig;
  climate?: ClimateConfig;
  media?: MediaConfig;
  sensors?: SensorsConfig;
  shades?: ShadesConfig;
}

@customElement("tech-art-room-card")
export class TechArtRoomCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: RoomCardConfig;

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      border-radius: 24px;
      box-shadow: var(--ha-card-box-shadow, 0 10px 30px rgba(0, 0, 0, 0.14));
      padding: 16px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
    }

    .shell {
      display: grid;
      gap: 12px;
    }

    .header {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      border-bottom: 1px solid var(--divider-color);
      padding: 4px 4px 14px;
      gap: 8px;
    }

    .time {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.1;
    }

    .date {
      font-size: 0.98rem;
      color: var(--secondary-text-color);
    }

    .title {
      font-size: 2.2rem;
      font-weight: 600;
      text-align: center;
    }

    .weather {
      justify-self: end;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 2rem;
      font-weight: 600;
    }

    .weather ha-icon {
      --mdc-icon-size: 40px;
      color: var(--warning-color, #f5a623);
    }

    .grid {
      display: grid;
      grid-template-columns: minmax(280px, 1fr) minmax(280px, 1fr);
      gap: 12px;
    }

    .col {
      display: grid;
      gap: 12px;
      align-content: start;
    }

    .panel {
      border-radius: 18px;
      background: color-mix(in srgb, var(--card-background-color, #fff), var(--primary-background-color, #f5f6f9) 40%);
      padding: 12px;
      border: 1px solid color-mix(in srgb, var(--divider-color), transparent 50%);
    }

    .panel h3 {
      margin: 0 0 8px;
      font-size: 1.9rem;
      font-weight: 600;
    }

    .row {
      display: grid;
      grid-template-columns: auto 1fr auto auto;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      border-top: 1px solid var(--divider-color);
    }

    .row:first-of-type {
      border-top: 0;
    }

    .name {
      font-size: 1.75rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pill {
      border: 0;
      border-radius: 999px;
      padding: 4px 12px;
      font-weight: 600;
      background: var(--accent-color);
      color: var(--text-primary-color, #fff);
      cursor: pointer;
    }

    .pill.off {
      background: var(--disabled-color);
      color: var(--primary-text-color);
    }

    .slider-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
      margin-top: 8px;
    }

    input[type="range"] {
      width: 100%;
      accent-color: var(--accent-color);
    }

    .climate-main {
      display: grid;
      justify-items: center;
      gap: 10px;
    }

    .temp {
      font-size: 3.8rem;
      font-weight: 700;
      line-height: 1;
    }

    .secondary {
      color: var(--secondary-text-color);
      font-size: 1.4rem;
    }

    .mode-row {
      display: grid;
      grid-auto-flow: column;
      gap: 6px;
      margin-top: 10px;
      width: 100%;
    }

    .mode {
      border-radius: 12px;
      border: 0;
      background: color-mix(in srgb, var(--divider-color), transparent 60%);
      color: var(--primary-text-color);
      padding: 8px 6px;
      cursor: pointer;
    }

    .mode.active {
      background: var(--accent-color);
      color: #fff;
    }

    .media-row {
      display: grid;
      grid-template-columns: 52px 1fr auto;
      gap: 10px;
      align-items: center;
    }

    .thumb {
      width: 52px;
      height: 52px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--accent-color), transparent 70%);
      object-fit: cover;
    }

    .chipline {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip {
      border-radius: 999px;
      padding: 6px 10px;
      background: color-mix(in srgb, var(--primary-background-color), transparent 30%);
      font-size: 1.3rem;
    }

    .hint {
      color: var(--secondary-text-color);
      font-size: 1.2rem;
    }

    @media (max-width: 1000px) {
      .grid {
        grid-template-columns: 1fr;
      }

      .header {
        grid-template-columns: 1fr;
        justify-items: start;
      }

      .title {
        text-align: left;
      }

      .weather {
        justify-self: start;
      }
    }
  `;

  setConfig(config: RoomCardConfig): void {
    if (!config?.type) {
      throw new Error("Invalid configuration");
    }
    const lightsConfig = config.lights ?? {};
    const lightEntities = Array.isArray(lightsConfig.entities)
      ? lightsConfig.entities
      : typeof lightsConfig.entities === "string"
        ? lightsConfig.entities
            .split(",")
            .map((v: string) => v.trim())
            .filter(Boolean)
        : [];

    this._config = {
      title: "Living Room",
      header: { show_clock: true, show_weather: true },
      ...config,
      lights: {
        ...lightsConfig,
        entities: lightEntities,
      },
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

  private _renderHeader() {
    const cfg = this._config.header ?? {};
    const now = new Date();
    const weather = this._e(cfg.weather_entity);
    const outside = this._e(cfg.outdoor_temp_entity);

    return html`
      <div class="header">
        <div>
          ${cfg.show_clock !== false
            ? html`
                <div class="time">
                  ${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                </div>
                <div class="date">
                  ${now.toLocaleDateString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              `
            : nothing}
        </div>
        <div class="title">${this._config.title ?? "Room"}</div>
        <div class="weather">
          ${cfg.show_weather !== false && weather
            ? html`
                <ha-icon icon="${(weather.attributes.icon as string | undefined) ?? "mdi:weather-partly-cloudy"}"></ha-icon>
                <span>${outside?.state ?? weather.attributes.temperature ?? "--"}°</span>
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
        <h3>Lights</h3>
        ${lights.map((id: string) => {
          const state = this._e(id)?.state;
          return html`
            <div class="row" @click=${() => this._openMoreInfo(id)}>
              <ha-icon icon="mdi:lightbulb"></ha-icon>
              <div class="name">${this._name(id)}</div>
              <button
                class="pill ${state === "on" ? "" : "off"}"
                @click=${(ev: Event) => {
                  ev.stopPropagation();
                  this._toggle(id);
                }}
              >
                ${state === "on" ? "ON" : "OFF"}
              </button>
              <ha-icon icon="mdi:chevron-right"></ha-icon>
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
              this._setBrightness(
                bEntityId,
                Number((ev.currentTarget as HTMLInputElement).value)
              )}
          />
          <strong>${brightness}%</strong>
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
          <h3>Climate</h3>
          <div class="temp">${fb.state}</div>
          <div class="secondary">${this._name(fallback)}</div>
        </section>
      `;
    }

    const currentTemp =
      (climate.attributes.current_temperature as number | undefined) ??
      Number(climate.state) ??
      0;
    const target = (climate.attributes.temperature as number | undefined) ?? currentTemp;
    const modes = (climate.attributes.hvac_modes as string[] | undefined) ?? [];
    const active = climate.state;

    return html`
      <section class="panel">
        <h3>Climate</h3>
        <div class="climate-main">
          <div class="secondary">${active.toUpperCase()}</div>
          <div class="temp">${Math.round(currentTemp)}°</div>
          <div class="secondary">Set to ${Math.round(target)}°</div>
          <input
            type="range"
            min="10"
            max="32"
            .value=${String(target)}
            @change=${(ev: Event) =>
              this._setTemperature(
                climate.entity_id,
                Number((ev.currentTarget as HTMLInputElement).value)
              )}
          />
        </div>
        <div class="mode-row">
          ${modes.map(
            (mode) => html`
              <button
                class="mode ${mode === active ? "active" : ""}"
                @click=${() => this._setHvacMode(climate.entity_id, mode)}
              >
                ${mode}
              </button>
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
        <h3>Media</h3>
        <div class="media-row" @click=${() => this._openMoreInfo(media.entity_id)}>
          ${art ? html`<img class="thumb" src="${art}" alt="album art" />` : html`<div class="thumb"></div>`}
          <div>
            <div class="name">${this._name(media.entity_id)}</div>
            <div class="secondary">${String(media.attributes.media_title ?? media.state)}</div>
          </div>
          <button class="mode" @click=${(ev: Event) => {
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
    const extras = (cfg?.extras ?? []).filter((item) => this._e(item.entity));

    if (!aq && !pm && !power && !extras.length) return nothing;

    return html`
      <section class="panel">
        <h3>Sensors & Power</h3>
        <div class="chipline">
          ${aq ? html`<div class="chip">Air Quality: ${aq.state}</div>` : nothing}
          ${pm ? html`<div class="chip">PM2.5: ${pm.state}</div>` : nothing}
          ${power ? html`<div class="chip">Power: ${power.state} ${power.attributes.unit_of_measurement ?? ""}</div>` : nothing}
          ${extras.map((item) => {
            const e = this._e(item.entity)!;
            return html`<div class="chip">${item.name ?? this._name(item.entity)}: ${e.state}</div>`;
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

    return html`
      <section class="panel">
        <h3>Shades</h3>
        ${shade
          ? html`
              <div class="slider-row">
                <div class="name">${(shade.attributes.current_position as number | undefined) ?? 0}%</div>
                <ha-icon icon="mdi:window-shutter"></ha-icon>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                .value=${String((shade.attributes.current_position as number | undefined) ?? 0)}
                @change=${(ev: Event) =>
                  this._setCoverPosition(
                    shade.entity_id,
                    Number((ev.currentTarget as HTMLInputElement).value)
                  )}
              />
            `
          : nothing}
        ${second
          ? html`<div class="row" @click=${() => this._openMoreInfo(second.entity_id)}>
              <ha-icon icon="mdi:window-shutter-open"></ha-icon>
              <div class="name">${this._name(second.entity_id)}</div>
              <div>${second.state}</div>
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </div>`
          : nothing}
        ${power
          ? html`<div class="row" @click=${() => this._openMoreInfo(power.entity_id)}>
              <ha-icon icon="mdi:flash"></ha-icon>
              <div class="name">Power</div>
              <div>${power.state} ${power.attributes.unit_of_measurement ?? ""}</div>
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </div>`
          : nothing}
        ${fallback
          ? html`<div class="hint">Fallback: ${this._name(fallback.entity_id)} = ${fallback.state}</div>`
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
      </ha-card>
    `;
  }
}

@customElement("tech-art-room-card-editor")
export class TechArtRoomCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: RoomCardConfig;

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

  private _emit(path: string, value: string) {
    const updated: Record<string, unknown> = { ...(this._config ?? { type: "custom:tech-art-room-card" }) };
    const keys = path.split(".");
    let ptr: Record<string, unknown> = updated;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) ptr[k] = value;
      else {
        ptr[k] = (ptr[k] as Record<string, unknown> | undefined) ?? {};
        ptr = ptr[k] as Record<string, unknown>;
      }
    });

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render() {
    return html`
      <div style="display:grid;gap:8px;">
        <label>Title <input .value=${this._value("title", "Living Room")} @input=${(e: Event) => this._emit("title", (e.target as HTMLInputElement).value)} /></label>
        <label>Weather entity <input .value=${this._value("header.weather_entity")} @input=${(e: Event) => this._emit("header.weather_entity", (e.target as HTMLInputElement).value)} /></label>
        <label>Outside temperature entity <input .value=${this._value("header.outdoor_temp_entity")} @input=${(e: Event) => this._emit("header.outdoor_temp_entity", (e.target as HTMLInputElement).value)} /></label>
        <label>Lights (comma-separated) <input .value=${this._value("lights.entities")} @input=${(e: Event) => this._emit("lights.entities", (e.target as HTMLInputElement).value)} /></label>
        <label>Climate entity <input .value=${this._value("climate.entity")} @input=${(e: Event) => this._emit("climate.entity", (e.target as HTMLInputElement).value)} /></label>
        <label>Climate fallback entity <input .value=${this._value("climate.fallback_entity")} @input=${(e: Event) => this._emit("climate.fallback_entity", (e.target as HTMLInputElement).value)} /></label>
        <label>Media entity <input .value=${this._value("media.entity")} @input=${(e: Event) => this._emit("media.entity", (e.target as HTMLInputElement).value)} /></label>
        <label>Air quality entity <input .value=${this._value("sensors.air_quality_entity")} @input=${(e: Event) => this._emit("sensors.air_quality_entity", (e.target as HTMLInputElement).value)} /></label>
        <label>PM2.5 entity <input .value=${this._value("sensors.pm25_entity")} @input=${(e: Event) => this._emit("sensors.pm25_entity", (e.target as HTMLInputElement).value)} /></label>
        <label>Power entity <input .value=${this._value("sensors.power_entity")} @input=${(e: Event) => this._emit("sensors.power_entity", (e.target as HTMLInputElement).value)} /></label>
        <label>Shade entity <input .value=${this._value("shades.entity")} @input=${(e: Event) => this._emit("shades.entity", (e.target as HTMLInputElement).value)} /></label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tech-art-room-card": TechArtRoomCard;
  }
}

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
