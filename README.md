# TechArt Home Assistant Room Card

A Lovelace room dashboard card with a native Home Assistant look, visual editor support, and dynamic sections.

<img width="1042" height="622" alt="image" src="https://github.com/user-attachments/assets/a18422ea-eb2f-4c08-aaff-00516737580f" />

<img width="1046" height="613" alt="image" src="https://github.com/user-attachments/assets/922e2701-8765-4b0d-b817-ad1d1da1de92" />

## What it can do

- 2-column room layout with sections for **Lights**, **Climate**, **Media**, **Sensors & Power**, and **Shades**
- Native Lovelace editor with clearable `ha-selector` entity pickers
- Dynamic rendering (sections/rows hide automatically when entities are missing)
- Draggable climate dial with HVAC mode strip
- Climate fallback display when no thermostat is configured
- User-defined footer action buttons (entity, icon, off-icon, label)
- Per-section custom titles via `section_titles`
- Sensor formatting with default **2 decimal places** and optional per-extra override

<img width="1014" height="1141" alt="image" src="https://github.com/user-attachments/assets/8aa451f2-07d1-46a0-9ffe-35488da59dea" />

---

## Quick setup (recommended)

### Option A: HACS

1. Open **HACS** in Home Assistant
2. Go to **Frontend** → **Custom repositories**
3. Add: `https://github.com/techartdev/TechArtRoomCard` (Category: **Dashboard**)
4. Install **TechArt Room Card**
5. Reload Home Assistant frontend (hard refresh recommended)

### Option B: Manual

1. Download/build `tech-art-room-card.js`
2. Copy it to: `config/www/tech-art-room-card.js`
3. Add Lovelace resource:

```yaml
url: /local/tech-art-room-card.js
type: module
```

---

## Add card in Lovelace

```yaml
type: custom:tech-art-room-card
title: Room
```

Then open the visual card editor and map entities.

---

## Use case examples

### 1) Minimal room card

```yaml
type: custom:tech-art-room-card
title: Hallway
header:
  show_clock: true
  show_weather: true
```

### 2) Room without thermostat (climate fallback)

Use any sensor in the climate panel when no `climate.entity` exists.

```yaml
type: custom:tech-art-room-card
title: Corridor
climate:
  fallback_entity: sensor.master_meter_usage
sensors:
  power_entity: sensor.master_switch_power
  extras:
    - entity: sensor.master_switch_current
    - entity: sensor.master_switch_temperature
```

### 3) Full room dashboard

```yaml
type: custom:tech-art-room-card
title: Living Room
section_titles:
  lights: Lighting
  climate: Air Control
  media: Entertainment
  sensors: Environment
  shades: Blinds
header:
  show_clock: true
  show_weather: true
  weather_entity: weather.home
  outdoor_temp_entity: sensor.outdoor_temperature
lights:
  entities:
    - light.living_room_ceiling
    - light.living_room_lamp
  brightness_entity: light.living_room_ceiling
climate:
  entity: climate.living_room
  fallback_entity: sensor.living_room_temperature
media:
  entity: media_player.living_room_tv
sensors:
  air_quality_entity: sensor.living_room_air_quality
  pm25_entity: sensor.living_room_pm25
  power_entity: sensor.living_room_power
  extras:
    - entity: sensor.living_room_humidity
      name: Humidity
      precision: 1
    - entity: sensor.living_room_co2
      name: CO2
shades:
  entity: cover.living_room_shade
  secondary_entity: cover.living_room_shade_right
  power_entity: sensor.shade_power
  fallback_entity: sensor.shade_temperature
footer:
  - entity: fan.air_purifier
    text: Air Purifier
    icon: mdi:fan
    off_icon: mdi:fan-off
  - entity: switch.air_purifier_lock
    text: Child Lock
    icon: mdi:lock
    off_icon: mdi:lock-open-variant
```

---

## Configuration notes

- Default card title is **Room** (generic by default for new installs)
- Stub config does not pre-fill fake entities
- `section_titles` is optional (`lights`, `climate`, `media`, `sensors`, `shades`)
- If `climate.entity` is unavailable and `climate.fallback_entity` exists, fallback is shown
- Sensor values default to **2 decimals** across the card (including shades sensor rows)
- `sensors.extras[].precision` can override decimals per extra sensor (`0-4`)
- Footer buttons toggle common toggle domains (`switch`, `light`, `fan`, `input_boolean`, `automation`, `script`) and open more-info for other domains

---

## Development

```bash
npm install
npm run lint
npm run build
```
