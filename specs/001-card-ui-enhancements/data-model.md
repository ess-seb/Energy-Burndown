# Data Model: Card UI Enhancements (001-card-ui-enhancements)

## Modified Interfaces

### 1. `CardConfig` — `src/card/types.ts`

Existing interface. Gains three optional fields:

```typescript
export interface CardConfig {
  type: string;
  entity: string;
  title?: string;
  comparison_mode: ComparisonMode;
  aggregation?: "day" | "week" | "month";
  period_offset?: number;
  show_forecast?: boolean;
  precision?: number;
  debug?: boolean;
  language?: string;
  number_format?: "comma" | "decimal" | "language" | "system";
  // NEW — Card UI Enhancements
  show_title?: boolean;   // default: true (title shown unless explicitly false)
  icon?: string;          // e.g., "mdi:solar-power"; absent → fall back to entity icon attribute
  show_icon?: boolean;    // default: true (icon shown unless explicitly false)
}
```

**Validation rules / fallback chains:**

| Field | Absent / undefined | Empty string `""` | `false` |
|-------|-------------------|-------------------|---------|
| `show_title` | treated as `true` | N/A (boolean) | hides title entirely |
| `title` | falls back to `friendly_name`, then entity ID | treated as absent (same fallback) | N/A (string) |
| `show_icon` | treated as `true` | N/A (boolean) | hides icon entirely |
| `icon` | falls back to `hass.states[entity].attributes.icon` | treated as absent (same fallback) | N/A (string) |

---

### 2. `CardState` — `src/card/types.ts`

Existing interface. Gains one optional field:

```typescript
export interface CardState {
  status: "loading" | "error" | "no-data" | "ready";
  errorMessage?: string;
  comparisonSeries?: ComparisonSeries;
  summary?: SummaryStats;
  forecast?: ForecastStats;
  textSummary?: TextSummary;
  // NEW — Card UI Enhancements
  period?: ComparisonPeriod;  // set in _loadData() on success; used in render() for period date labels
}
```

**State transition**: `period` is set alongside `comparisonSeries` in the `_loadData()` success path. It is `undefined` in `loading`, `error`, and `no-data` states (period labels are only rendered in `ready` state anyway).

---

### 3. `HomeAssistant` — `src/ha-types.ts`

Existing interface. Add `states` field (currently accessed via `as` casts, which are eliminated by this change):

```typescript
export interface HomeAssistant {
  language: string;
  locale?: {
    language: string;
    number_format?: "comma" | "decimal" | "language" | "system";
  };
  config?: {
    time_zone?: string;
  };
  connection: {
    sendMessagePromise<T = unknown>(_msg: Record<string, unknown>): Promise<T>;
  };
  // NEW — Card UI Enhancements (typed; was previously accessed with `as` casts)
  states?: Record<string, {
    state: string;
    attributes: Record<string, unknown>;
  }>;
}
```

---

## New Pure Helper Function

### `formatSigned` — co-located in `src/card/cumulative-comparison-chart.ts`

```typescript
function formatSigned(
  value: number,
  formatter: Intl.NumberFormat,
  unit: string
): string
```

**Arguments**:
- `value` — raw signed number (positive, negative, or zero)
- `formatter` — pre-constructed `Intl.NumberFormat` instance (with configured precision)
- `unit` — unit string (e.g., `"kWh"`)

**Returns**: formatted string with sign prefix:
- `value > 0` → `"+12.5 kWh"`
- `value < 0` → `"−12.5 kWh"` (U+2212 MINUS SIGN)
- `value === 0` → `"0.0 kWh"` (no sign)

**Used by**: difference value row and difference percent row in `render()`.

---

## New Period Label Computation

### `buildPeriodSuffix` — co-located in `src/card/cumulative-comparison-chart.ts`

```typescript
function buildPeriodSuffix(
  date: Date,
  mode: ComparisonMode,
  language: string
): string
```

**Arguments**:
- `date` — `period.current_start` or `period.reference_start`
- `mode` — `"year_over_year"` | `"month_over_year"`
- `language` — resolved locale language string (e.g., `"en"`, `"pl"`)

**Returns**:
- `year_over_year`: `"2026"` (year as string)
- `month_over_year`: `"March 2026"` or locale-equivalent (via `Intl.DateTimeFormat`)

**Used by**: current period and reference period label rows in `render()`.

---

## Translation Key Removals

| File | Key removed | Reason |
|------|-------------|--------|
| `src/translations/en.json` | `forecast.historical_value` | Duplicate row eliminated (FR-014) |
| `src/translations/de.json` | `forecast.historical_value` | Duplicate row eliminated (FR-014) |
| `src/translations/pl.json` | `forecast.historical_value` | Duplicate row eliminated (FR-014) |

No new translation keys are added: title and icon content come from HA config/entity attributes (not translated); period suffixes are generated via `Intl.DateTimeFormat` (locale-native, not translation-file-dependent).

---

## No New Interfaces

`SummaryStats`, `ForecastStats`, `ComparisonSeries`, `CumulativeSeries`, `TextSummary`, `ComparisonPeriod` — all unchanged.
