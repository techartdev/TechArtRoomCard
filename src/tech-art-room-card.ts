import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles/card-styles";
import { editorStyles } from "./styles/editor-styles";

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
  @state() private _climateDragValue?: number;
  private _climateDrag?: {
    pointerId: number;
    entityId: string;
    min: number;
    max: number;
    step: number;
    startDeg: number;
    sweepDeg: number;
  };

  static styles = cardStyles;

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

  private _normalizeDegrees(deg: number): number {
    return ((deg % 360) + 360) % 360;
  }

  private _circularDistance(a: number, b: number): number {
    const diff = Math.abs(a - b);
    return Math.min(diff, 360 - diff);
  }

  private _formatTemperature(value: number, step: number): string {
    const decimals = step >= 1 ? 0 : Math.min(2, (String(step).split(".")[1] ?? "").length || 1);
    return value.toFixed(decimals).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
  }

  private _snapToStep(value: number, min: number, max: number, step: number): number {
    const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
    const snapped = Math.round((value - min) / safeStep) * safeStep + min;
    return Math.min(max, Math.max(min, Number(snapped.toFixed(2))));
  }

  private _progressFromPointer(event: PointerEvent, startDeg: number, sweepDeg: number): number {
    const dial = event.currentTarget as HTMLElement;
    const rect = dial.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = this._normalizeDegrees((Math.atan2(event.clientY - cy, event.clientX - cx) * 180) / Math.PI);
    const fromStart = this._normalizeDegrees(angle - startDeg);

    if (fromStart <= sweepDeg) {
      return fromStart / sweepDeg;
    }

    const endDeg = this._normalizeDegrees(startDeg + sweepDeg);
    const startDist = this._circularDistance(angle, startDeg);
    const endDist = this._circularDistance(angle, endDeg);
    return startDist <= endDist ? 0 : 1;
  }

  private _onClimateDialPointerDown(
    event: PointerEvent,
    entityId: string,
    min: number,
    max: number,
    step: number,
    startDeg: number,
    sweepDeg: number
  ): void {
    const dial = event.currentTarget as HTMLElement;
    dial.setPointerCapture(event.pointerId);
    this._climateDrag = { pointerId: event.pointerId, entityId, min, max, step, startDeg, sweepDeg };

    const progress = this._progressFromPointer(event, startDeg, sweepDeg);
    this._climateDragValue = this._snapToStep(min + progress * (max - min), min, max, step);
  }

  private _onClimateDialPointerMove(event: PointerEvent): void {
    if (!this._climateDrag || event.pointerId !== this._climateDrag.pointerId) return;
    const drag = this._climateDrag;
    const progress = this._progressFromPointer(event, drag.startDeg, drag.sweepDeg);
    this._climateDragValue = this._snapToStep(drag.min + progress * (drag.max - drag.min), drag.min, drag.max, drag.step);
  }

  private _onClimateDialPointerEnd(event: PointerEvent): void {
    if (!this._climateDrag || event.pointerId !== this._climateDrag.pointerId) return;

    const dial = event.currentTarget as HTMLElement;
    if (dial.hasPointerCapture(event.pointerId)) {
      dial.releasePointerCapture(event.pointerId);
    }

    if (this._climateDragValue !== undefined) {
      this._setTemperature(this._climateDrag.entityId, this._climateDragValue);
    }

    this._climateDrag = undefined;
    this._climateDragValue = undefined;
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

  private _formatFallbackClimateValue(entity: HassEntity): string {
    const unit = (entity.attributes.unit_of_measurement as string | undefined) ?? "";
    const numeric = Number(entity.state);
    if (!Number.isFinite(numeric)) {
      return [entity.state, unit].filter(Boolean).join(" ").trim();
    }

    const autoPrecision = Math.abs(numeric) >= 100 ? 0 : Math.abs(numeric) >= 10 ? 1 : 2;
    const normalized = Math.max(0, Math.min(4, Math.round(autoPrecision)));
    const formatted = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: normalized,
    }).format(numeric);
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
      const fallbackValue = this._formatFallbackClimateValue(fb);
      return html`
        <section class="panel">
          <div class="panel-title">Climate</div>
          <div class="climate-body">
            <span class="climate-temp climate-temp-fallback">${fallbackValue}</span>
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
    const minTarget = Number.isFinite(Number(climate.attributes.min_temp)) ? Number(climate.attributes.min_temp) : 10;
    const maxTarget = Number.isFinite(Number(climate.attributes.max_temp)) ? Number(climate.attributes.max_temp) : 32;
    const tempStep = Number.isFinite(Number(climate.attributes.target_temp_step)) && Number(climate.attributes.target_temp_step) > 0
      ? Number(climate.attributes.target_temp_step)
      : 0.5;
    const safeTarget = Number.isFinite(target) ? target : 21;
    const clampedTarget = Math.min(maxTarget, Math.max(minTarget, safeTarget));
    const clampedCurrent = Math.min(maxTarget, Math.max(minTarget, Number.isFinite(currentTemp) ? currentTemp : minTarget));
    const interactiveTarget =
      this._climateDrag?.entityId === climate.entity_id && this._climateDragValue !== undefined
        ? this._climateDragValue
        : clampedTarget;
    const normalizedRange = Math.max(0.0001, maxTarget - minTarget);
    const progress = Math.max(0, Math.min(1, (interactiveTarget - minTarget) / normalizedRange));
    const currentProgress = Math.max(0, Math.min(1, (clampedCurrent - minTarget) / normalizedRange));
    const CX = 50, CY = 50;
    const startDeg = 150;
    const sweepDeg = 240;
    const R = 43;
    const strokeW = 8;
    const innerR = R - strokeW / 2;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const px = (deg: number) => CX + Math.cos(toRad(deg)) * R;
    const py = (deg: number) => CY + Math.sin(toRad(deg)) * R;
    const endDeg = startDeg + sweepDeg;
    const largArc = sweepDeg > 180 ? 1 : 0;
    const arcPath = `M ${px(startDeg).toFixed(3)} ${py(startDeg).toFixed(3)} A ${R} ${R} 0 ${largArc} 1 ${px(endDeg - 0.001).toFixed(3)} ${py(endDeg - 0.001).toFixed(3)}`;
    const arcLength = 2 * Math.PI * R * (sweepDeg / 360);
    const fillLength = arcLength * progress;
    const hasFill = fillLength > 0.5;
    const dotAngleDeg = startDeg + progress * sweepDeg;
    const dotX = px(dotAngleDeg);
    const dotY = py(dotAngleDeg);
    const currentAngleDeg = startDeg + currentProgress * sweepDeg;
    const currentDotX = px(currentAngleDeg);
    const currentDotY = py(currentAngleDeg);

    return html`
      <section class="panel">
        <div class="panel-title">Climate</div>
        <div class="climate-body">
          <div
            class="climate-dial"
            @pointerdown=${(ev: PointerEvent) =>
              this._onClimateDialPointerDown(ev, climate.entity_id, minTarget, maxTarget, tempStep, startDeg, sweepDeg)}
            @pointermove=${this._onClimateDialPointerMove}
            @pointerup=${this._onClimateDialPointerEnd}
            @pointercancel=${this._onClimateDialPointerEnd}
          >
            <svg class="climate-arc" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <circle cx=${CX} cy=${CY} r=${(R + strokeW / 2).toFixed(3)} fill="color-mix(in srgb, var(--divider-color, #444) 14%, transparent)"></circle>
              <circle cx=${CX} cy=${CY} r=${innerR.toFixed(3)} fill="var(--panel-bg)"></circle>
              <path
                fill="none"
                stroke="color-mix(in srgb, var(--divider-color, #444) 50%, transparent)"
                stroke-width=${strokeW}
                stroke-linecap="round"
                d=${arcPath}
              ></path>
              ${hasFill ? html`<path
                fill="none"
                stroke="var(--card-accent)"
                stroke-width=${strokeW}
                stroke-linecap="round"
                stroke-dasharray=${`${fillLength} ${arcLength}`}
                d=${arcPath}
              ></path>` : nothing}
              <circle
                cx=${currentDotX.toFixed(3)}
                cy=${currentDotY.toFixed(3)}
                r="3.5"
                fill="rgba(255,255,255,0.6)"
                stroke="rgba(0,0,0,0.15)"
                stroke-width="0.5"
              ></circle>
              <circle
                cx=${dotX.toFixed(3)}
                cy=${dotY.toFixed(3)}
                r=${(strokeW / 2 + 0.5).toFixed(1)}
                fill="white"
                stroke="var(--card-accent)"
                stroke-width="1.5"
              ></circle>
            </svg>
            <div class="climate-center">
              <span class="climate-mode-label">${active}</span>
              <span class="climate-temp">${Math.round(currentTemp)}°</span>
              <span class="climate-setpoint"><ha-icon icon="mdi:thermometer"></ha-icon>${this._formatTemperature(interactiveTarget, tempStep)}°</span>
            </div>
          </div>
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

  static styles = editorStyles;

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
    (updated["sensors"] as Record<string, unknown>)["extras"] = entities.map((e) => ({
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
