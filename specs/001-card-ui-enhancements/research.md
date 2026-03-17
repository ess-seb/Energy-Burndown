# Research: Card UI Enhancements (001-card-ui-enhancements)

All unknowns from the Technical Context section of `plan.md` are resolved below.

---

## R-001: Accessing entity friendly_name and icon from the hass object

**Decision**: Use `hass.states?.[entityId]?.attributes.friendly_name` (string | undefined) and `hass.states?.[entityId]?.attributes.icon` (string | undefined).

**Rationale**: The card already uses `this.hass.states?.[this._config.entity]?.attributes` to read `unit_of_measurement` (see `cumulative-comparison-chart.ts` lines 203–206 and 294–297). This pattern is consistent with the HA frontend core and the broader custom card community. No additional WebSocket API calls are needed — data is available synchronously at render time from the `hass` object passed by HA.

**Alternatives considered**:
- HA `entity_registry` WebSocket API — rejected; over-engineered for a read-only display use; adds an async call and complexity for data that is already in `hass.states`.

**Type change required**: `HomeAssistant.states` is currently untyped in `src/ha-types.ts` (accessed via `as` casts). Add `states?: Record<string, { state: string; attributes: Record<string, unknown> }>` to eliminate the unsafe casts.

---

## R-002: Rendering HA icons in a custom Lovelace card

**Decision**: Use the `<ha-icon icon="mdi:xxx">` custom element, provided by the HA frontend runtime.

**Rationale**: `ha-icon` is the canonical HA icon rendering component. It resolves MDI icons, custom icon sets, and built-in HA icons without any additional import. It is available in every Lovelace context because HA loads it globally. LitElement's `html` tagged template handles it correctly as a native custom element. It respects HA theming (color, size tokens) automatically.

**Usage in template**:
```typescript
html`<ha-icon icon=${effectiveIcon}></ha-icon>`
```

**Alternatives considered**:
- Directly embedding SVG paths — rejected; no MDI lookup, large bundle size increase.
- Importing `@mdi/js` npm package — rejected; duplicates what HA runtime already provides and adds ~400 kB to the bundle.

---

## R-003: Explicit +/− sign on difference values (FR-010, FR-011)

**Decision**: Extract a `formatSigned(value: number, formatter: Intl.NumberFormat, unit: string): string` pure helper function. Logic:
- `value > 0` → `` `+${formatter.format(value)} ${unit}` ``
- `value < 0` → `` `\u2212${formatter.format(Math.abs(value))} ${unit}` `` (U+2212 MINUS SIGN)
- `value === 0` → `` `${formatter.format(0)} ${unit}` `` (no sign)

**Rationale**: The spec explicitly states zero must display without sign (FR-010, FR-011). Using `Math.abs()` before `Intl.NumberFormat` avoids locale-specific negative sign rendering. U+2212 (MINUS SIGN `−`) is the typographically correct character per the spec assumption; it is visually distinct from a hyphen and is standard in energy/physics display contexts. The helper is co-located with the rendering logic in `cumulative-comparison-chart.ts` or extracted to a small `format-utils.ts` — both valid; co-location preferred for atomic task scope.

**Alternatives considered**:
- `Intl.NumberFormat` with `signDisplay: "exceptZero"` — evaluated; produces locale-dependent sign characters (e.g., some locales use different minus representations) and doesn't allow substituting U+2212 easily. Rejected for consistent cross-locale behaviour.
- Inline ternary in template — acceptable but not unit-testable in isolation; a helper is preferred per constitution §III.

---

## R-004: Period date labels (FR-015, FR-016, FR-017, FR-018)

**Decision**:
1. Store the computed `ComparisonPeriod` in `CardState` (new optional field `period?: ComparisonPeriod`) — set in `_loadData()` when data is successfully fetched.
2. In `render()`, derive label suffixes from `_state.period` and `_config.comparison_mode`:
   - `year_over_year`: extract year integer from `period.current_start` and `period.reference_start` via `.getFullYear()`.
   - `month_over_year`: format using `new Intl.DateTimeFormat(resolvedLanguage, { month: 'long', year: 'numeric' }).format(date)`.
3. Append suffix in parentheses: `${baseLabel} (${suffix})`.
4. `period_offset` is already factored into the dates by `buildComparisonPeriod()` — no additional offset logic needed.

**Rationale**: `ComparisonPeriod` is computed once in `_loadData()`. Storing it in `CardState` avoids recomputation in `render()` and keeps a single source of truth. `Intl.DateTimeFormat` is a native browser API — no dependency added. The `language` is already resolved via `resolveLocale()`, so locale-correct month names come for free. The spec requires Polish month names when locale is Polish (scenario 3 of User Story 5); `Intl.DateTimeFormat` handles this natively.

**Edge case — missing translation for month name**: `Intl.DateTimeFormat` always produces a result using the browser's locale data. Even for unsupported custom languages the spec mentions falling back to system/browser locale then English — `Intl` handles this automatically via its own fallback chain. No custom code needed.

**Alternatives considered**:
- Recompute period in `render()` — rejected; duplicates `_loadData()` logic; `now` may differ slightly between calls causing subtle label inconsistencies.
- Store only computed year/month strings in `CardState` — rejected; storing raw `ComparisonPeriod` is more future-proof and the type already exists.

---

## R-005: Header area omission when both show_title and show_icon are false (FR-009)

**Decision**: Compute two boolean flags before the template:
```typescript
const showTitle = this._config.show_title !== false;
const showIcon  = this._config.show_icon  !== false;
```
Compute effective values:
```typescript
const effectiveTitle = (this._config.title?.trim() || entityState?.attributes.friendly_name || this._config.entity) as string;
const effectiveIcon  = this._config.icon?.trim() || (entityState?.attributes.icon as string | undefined);
```
Then wrap title + icon in a single `.ebc-title-row` div rendered only when `(showTitle && !!effectiveTitle) || (showIcon && !!effectiveIcon)`.

**Rationale**: FR-009 requires omitting the entire header when both are false. Computing a single `shouldShowHeader` guard keeps the template clean and avoids rendering an empty invisible container.

**Alternatives considered**:
- Always render container, use CSS `display: none` — rejected; invisible DOM still occupies space in the accessibility tree and wastes rendering effort.

---

## R-006: Removal of "Historical value" row (FR-012, FR-013, FR-014)

**Decision**: Delete the second `forecast.reference_total` rendering block in `cumulative-comparison-chart.ts` (lines 460–474 — the block using key `forecast.historical_value`). Remove the `forecast.historical_value` key from `en.json`, `de.json`, and `pl.json`.

**Rationale**: The "Historical value" row renders the same `forecast.reference_total` value as "Consumption in reference period". It is a duplication bug. The spec retains "Consumption in reference period" (FR-013) and removes only the duplicated row. No data model change is required — `ForecastStats.reference_total` remains.

**Alternatives considered**: Renaming the row — rejected; spec explicitly requires removal (FR-012, FR-014).
