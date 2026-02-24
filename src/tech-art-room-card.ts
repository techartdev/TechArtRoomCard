import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// Home Assistant types
interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ) => void;
  localize: (key: string, ...args: unknown[]) => string;
}

interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

interface RoomCardConfig {
  type: string;
  title?: string;
  icon?: string;
  entities?: string[];
  background_color?: string;
}

@customElement("tech-art-room-card")
export class TechArtRoomCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: RoomCardConfig;

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        overflow: hidden;
        height: 100%;
      }

      .card-header {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 8px;
        font-size: 1.1em;
        font-weight: 500;
      }

      .card-header ha-icon {
        --mdc-icon-size: 24px;
      }

      .card-content {
        padding: 0 16px 16px;
      }

      .entity-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
        font-size: 0.9em;
      }

      .entity-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .entity-state {
        font-weight: 500;
        text-align: right;
        flex-shrink: 0;
        margin-left: 8px;
      }
    `;
  }

  setConfig(config: RoomCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = config;
  }

  getCardSize(): number {
    const entityCount = this._config?.entities?.length ?? 0;
    return 1 + Math.ceil(entityCount / 2);
  }

  static getStubConfig(): RoomCardConfig {
    return {
      type: "custom:tech-art-room-card",
      title: "Living Room",
      icon: "mdi:sofa",
      entities: [],
    };
  }

  private _getEntityName(entityId: string): string {
    const entity = this.hass?.states[entityId];
    return (
      (entity?.attributes?.friendly_name as string | undefined) ??
      entityId.split(".").pop() ??
      entityId
    );
  }

  private _getEntityState(entityId: string): string {
    return this.hass?.states[entityId]?.state ?? "unavailable";
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    const { title, icon, entities = [] } = this._config;

    return html`
      <ha-card>
        ${title
          ? html`
              <div class="card-header">
                ${icon ? html`<ha-icon icon=${icon}></ha-icon>` : nothing}
                <span>${title}</span>
              </div>
            `
          : nothing}
        <div class="card-content">
          ${entities.map(
            (entityId) => html`
              <div class="entity-row">
                <span class="entity-name"
                  >${this._getEntityName(entityId)}</span
                >
                <span class="entity-state"
                  >${this._getEntityState(entityId)}</span
                >
              </div>
            `
          )}
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tech-art-room-card": TechArtRoomCard;
  }
}

// Register the card with Home Assistant's custom card registry
type WindowWithCustomCards = typeof window & { customCards: unknown[] };
const win = window as WindowWithCustomCards;
win.customCards = win.customCards || [];
win.customCards.push({
  type: "tech-art-room-card",
  name: "TechArt Room Card",
  description: "A custom room card for Home Assistant",
  preview: true,
  documentationURL: "https://github.com/techartdev/TechArtRoomCard",
});
