# TechArt Home Assistant Room Card

A dynamic Home Assistant Lovelace room cockpit card with a native HA look and configurable sections.

<img width="1057" height="648" alt="image" src="https://github.com/user-attachments/assets/e37dc940-acf1-4750-9b85-350d2210f3fc" />


## Highlights

- 2-column room hub layout (header, lights, climate, media, sensors/power, shades)
- Dynamic section rendering: hides panels or rows when configured entities are missing/unavailable
- Climate fallback support (show any alternate entity when no HVAC entity is wired)
- Built-in card editor for common entity mapping (visual UI in Lovelace editor)
- Native-style rounded surfaces, spacing, dividers, and accent usage

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant.
2. Go to **Frontend** → **Custom repositories**.
3. Add `https://github.com/techartdev/TechArtRoomCard` as **Lovelace**.
4. Install **TechArt Room Card**.
5. Reload browser.

### Manual

1. Build/download `tech-art-room-card.js`.
2. Copy to `config/www`.
3. Add resource `/local/tech-art-room-card.js` as JavaScript module.

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
- Use Lovelace visual card editor for common fields (title, weather/temp, lights, climate, media, sensors, shades).

## Development

```bash
npm install
npm run lint
npm run build
```
