# TechArtRoomCard
A Home Assistant Room Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A custom Lovelace card for Home Assistant that displays a room summary with entities and their states.

## Features

- Display a room title with an optional icon
- List entities and their current states
- Compatible with [HACS](https://hacs.xyz/)

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance.
2. Go to **Frontend** → click the three-dot menu → **Custom repositories**.
3. Add `https://github.com/techartdev/TechArtRoomCard` with category **Lovelace**.
4. Search for **TechArt Room Card** and install it.
5. Reload your browser.

### Manual

1. Download `tech-art-room-card.js` from the [latest release](https://github.com/techartdev/TechArtRoomCard/releases/latest).
2. Place the file in your `config/www` folder.
3. Add the resource in Home Assistant:
   - Go to **Settings** → **Dashboards** → **Resources**.
   - Click **Add resource** and enter `/local/tech-art-room-card.js` with type **JavaScript module**.

## Usage

Add the card to your Lovelace dashboard:

```yaml
type: custom:tech-art-room-card
title: Living Room
icon: mdi:sofa
entities:
  - light.living_room
  - climate.living_room
  - sensor.living_room_temperature
```

## Configuration

| Option             | Type     | Default | Description                          |
|--------------------|----------|---------|--------------------------------------|
| `title`            | `string` | —       | Room name displayed in the header    |
| `icon`             | `string` | —       | Material Design icon (e.g. `mdi:sofa`) |
| `entities`         | `list`   | `[]`    | List of entity IDs to display        |
| `background_color` | `string` | —       | Optional CSS background color        |

## Development

```bash
npm install
npm run build   # Build once
npm run watch   # Build and watch for changes
npm run lint    # Lint the TypeScript source
```

## License

MIT
