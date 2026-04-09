# Changelog

All notable changes to **Energy Horizon Card** (Home Assistant Lovelace / HACS) are documented in this file.



## [0.5.0]

### Added
- **Figma-aligned layout (v0.5.0)**: semantic regions (header, comparison, forecast/total, chart, comment, warning) with `role="region"` and localized `aria-label` keys (`section.*`).
- **`trend-visual`**: shared MDI icon + tone class mapping for `Trend` (chart delta segment + intelligent comment).
- **`ChartThemeResolved`** and host-driven chart colors: card reads HA CSS variables into `chartTheme`; ECharts uses them for series, grid, today guide, delta segment, and reference dot border.
- **Translations**: `forecast.panel_forecast`, `forecast.panel_total`, and section labels in `en` / `pl` / `de`.

### Changed
- **Comparison panel**: two-column grid with captions, single always-visible delta chip (`|` separator; `---` placeholders when values missing).
- **Forecast | Total panel**: surface-style block; **Total** uses full reference-window raw sum via `fullReferenceWindowRawTotal` (documented on `ForecastStats.reference_total`).
- **Intelligent comment**: narrative + trend `ha-icon` panel (replaces heading-only line).
- **Incomplete reference**: full message only in **warning** strip at bottom (not duplicated in comparison).
- **Chart**: full-height dashed “today” guide; vertical delta segment at today colored by trend; adaptive X-axis shows up to **three** labels when current series has data (legacy tick density when not); Y-axis shows **three** value labels (0, mid, max) over five split lines; reference “today” dot with border.
- **Header**: 42px icon circle, title + `entity_id` subtitle when `show_title` is enabled.

### Fixed
- **`getComputedStyle`**: safe when undefined (tests / non-DOM) in `_resolveChartTheme`.

## [0.4.0-beta]

### Added
- **Time Windows Engine**: advanced data engine enable new way that data can handle to dispaly: use `time_window` in YAML to customize (preset merge, validation, LTS constraints).
– **New `Month Over Month` comparison preset**. 
- **Luxon** dependency for resolving anchored time ranges and window calculations.
- **Inteligent Aggregation & X-axis**: optional card-level `x_axis_format` (Luxon subset, validated at config time); automatic `hour`/`day`/`week`/`month` selection from merged `duration` when `aggregation` is omitted (~20–100 slot target).
- **Inteligent X-axis labeling**: adaptive Intl-based X labels (HA time zone; first tick is always a boundary); label locale cascade (`language` → HA → `en`); horizontal X labels with overlap hiding.
- **Tooltip header**: aggregation-aligned default formatting (no redundant year in comparisons; hour + multi-day window gets date disambiguation); optional card-level `tooltip_format` (Luxon subset, same validation as `x_axis_format`).
– **README_advanced.md**: advanced documentation
– **changelog.md**: release log

### Changed
- **Clarified `comparison_preset`** semantics in docs (`year_over_year`, `month_over_year`, `month_over_month`, including “month over month” meaning two consecutive full calendar months).
- **Forecast default behavior** and configuration (`show_forecast`, alias `forecast`).
– **Github Wiki**: rewitten source of knowledge abour card dedicated more advanced users [https://github.com/hello-sebastian/Energy-Horizon/wiki](https://github.com/hello-sebastian/Energy-Horizon/wiki)

### Fixed
- **ECharts renderer refactors** (series layering and legend ordering).
–  **5000** max timeline slots per series with localized error and optional `debug` console details.
- **Auto-aggregation** for **one-hour** (or shorter) windows now selects **`hour`** for LTS instead of incorrectly preferring **`month`**, which could yield empty or wrong charts for hourly `time_window` configs.
- **Summary period labels** for **custom** `time_window` (non-legacy multi-window YAML) now show each window’s **date range** instead of only the calendar year from the default `year_over_year` preset.
- **LTS anchors**: `start_of_day` and `start_of_week` are **allowed** (`start_of_week` aligns to **Monday** / Luxon ISO week, same as `startOf("week")`).


## [0.3.1-beta] - First public beta release 
### Changed
  – Visual configuration form: lovelace visual editor (`getConfigElement` / `getStubConfig`) for common fields: entity, title, comparison preset, and `force_prefix`, with YAML mode preserving YAML-only keys.
  - Chartjs -> ECharts migration


## [0.2.0]
### Added
  - Localization / locale formatting
  - Smart unit scaling
  - Theming and style separation
### Fixed
  – Chart fixies


## [0.1.0]
### Added
  - Base functionality
  – Data visualizing
  - Base card/LTS support
  – Forecasting
  – Statistics


### Notes
The format is based on [Keep a Changelog](https://keepachangelog.com/).