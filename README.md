# TechArtRoomCard

A dynamic Home Assistant room cockpit card with a native HA look and configurable sections.

## Highlights

- 2-column room hub layout (header, lights, climate, media, sensors/power, shades)
- Dynamic section rendering: hides panels or rows when configured entities are missing/unavailable
- Climate fallback support (show any alternate entity when no HVAC entity is wired)
- Built-in native-style card editor with Home Assistant entity autocomplete pickers
- Native-style rounded surfaces, spacing, dividers, and accent usage

## HACS repository type (important)

Use **Dashboard** when adding this repository in HACS.

> Do **not** use `Template` for this repo; this is a frontend dashboard card.

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant.
2. Go to **Dashboard** and open the custom repositories dialog.
3. Add `https://github.com/techartdev/TechArtRoomCard` with type **Dashboard**.
4. Install **TechArt Room Card**.
5. Reload browser.

### Manual

1. Download `tech-art-room-card.js` from the latest release.
2. Place file in `config/www`.
3. Add resource `/local/tech-art-room-card.js` as JavaScript module.

## Cache busting / versioned artifact

This project publishes a release-versioned JS file (for example `tech-art-room-card-0.1.1.js`) and points HACS to that file through `hacs.json`.

That means each release gets a new resource filename, which avoids stale browser cache from older builds.

## Example configuration

```yaml
type: custom:tech-art-room-card
title: Living Room
header:
  show_clock: true
  show_weather: true
  weather_entity: weather.home
  outdoor_temp_entity: sensor.outdoor_temperature
lights:
  entities:
    - light.living_room_lamp
    - light.living_room_ceiling
  brightness_entity: light.living_room_lights
climate:
  entity: climate.living_room
  fallback_entity: sensor.living_room_comfort_index
media:
  entity: media_player.living_room_tv
sensors:
  air_quality_entity: sensor.living_room_air_quality
  pm25_entity: sensor.living_room_pm25
  power_entity: sensor.living_room_power
shades:
  entity: cover.living_room_shade
  secondary_entity: cover.living_room_shade_right
  power_entity: sensor.living_room_shade_power
```

## Configuration notes

- If `climate.entity` is absent/unavailable and `climate.fallback_entity` exists, fallback is shown instead of HVAC controls.
- Lights/media/sensors/shades panels are hidden automatically when configured entities are missing.
- Use the native-style editor fields with entity autocomplete for common mappings (title, weather/temp, lights, climate, media, sensors, shades).

## Development

```bash
npm install
npm run lint
npm run build
```
