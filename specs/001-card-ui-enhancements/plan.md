# Implementation Plan: Card UI Enhancements

**Branch**: `001-card-ui-enhancements` | **Date**: 2026-03-17 | **Spec**: `specs/001-card-ui-enhancements/spec.md`  
**Input**: Feature specification from `/specs/001-card-ui-enhancements/spec.md`

## Summary

Adds five UI improvements to the Energy Horizon Lovelace card: (1) a title/icon header area with HA entity fallback; (2) explicit +/− signs on difference statistics; (3) removal of the duplicate "Historical value" row from the forecast section; (4) time period date qualifiers on summary statistic labels. All changes are confined to the existing TypeScript/LitElement/Vite stack — no new external dependencies are required.

## Technical Context

**Language/Version**: TypeScript 5.6 (ES2020+, strict mode)  
**Primary Dependencies**: Lit 3.1 (LitElement, `html` tagged template), Chart.js, Vite 6 (bundler), Vitest 2 (tests)  
**Storage**: N/A — all processing is in-browser; HA state is read-only at render time  
**Testing**: Vitest 2 (`npm test`)  
**Target Platform**: Home Assistant Lovelace (browser Web Component, HACS distribution)  
**Project Type**: Lovelace card — single-file Web Component bundle (`dist/energy-horizon-card.js`)  
**Performance Goals**: No additional renders over baseline; period label computation is O(1)  
**Constraints**: Must not throw on missing entity/icon; graceful degradation required; no new npm dependencies  
**Scale/Scope**: ~10 source files affected; single output bundle

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| HA/HACS compatibility (§I) | ✅ PASS | Uses `hass.states`, `<ha-icon>`, `<ha-card>` — all standard HA Lovelace patterns |
| Input sanitization / XSS (§II) | ✅ PASS | Config fields rendered via LitElement `html` tagged template (auto-escaped); no `unsafeHTML` |
| Graceful degradation (§II) | ✅ PASS | All new CardConfig fields are optional; each has a defined fallback chain ending in "omit gracefully" |
| TypeScript strict mode (§III) | ✅ PASS | All new fields fully typed; no `any` introduced |
| Test coverage (§III) | ✅ PASS | Sign formatting helper, header resolution logic, and period label generation are independently unit-testable |
| HA look & feel — `ha-icon` (§IV) | ✅ PASS | Uses canonical `<ha-icon>` component, consistent with HA dashboard visual language |
| No new external dependencies (additional req.) | ✅ PASS | `Intl.DateTimeFormat` is native browser API; `ha-icon` is HA runtime |
| Backward compatibility of CardConfig (§III) | ✅ PASS | All three new fields (`show_title`, `icon`, `show_icon`) are optional with sensible defaults |

## Project Structure

### Documentation (this feature)

```text
specs/001-card-ui-enhancements/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── ha-types.ts                             # Add `states` field to HomeAssistant interface
├── card/
│   ├── types.ts                            # CardConfig: +show_title, +icon, +show_icon; CardState: +period
│   ├── cumulative-comparison-chart.ts      # Title/icon header; signed diff values; remove historical_value row; period-date labels
│   ├── energy-horizon-card-styles.ts       # Add .ebc-title-row, .ebc-title, .ebc-icon styles
│   ├── ha-api.ts                           # No structural changes needed
│   └── localize.ts                         # No changes needed
└── translations/
    ├── en.json                             # Remove forecast.historical_value key
    ├── de.json                             # Remove forecast.historical_value key
    └── pl.json                             # Remove forecast.historical_value key

tests/
├── unit/
│   ├── ha-api.test.ts                      # Extend: signed-diff formatting (if helper extracted to ha-api.ts)
│   ├── card-header-resolution.test.ts      # NEW: title/icon effective value resolution logic
│   └── period-label.test.ts               # NEW: year/month period label generation
└── integration/
    └── card-render.test.ts                 # Update: assert no historical_value row; assert header present
```

**Structure Decision**: Single-project layout (existing `src/`). All changes are confined to `src/card/`, `src/ha-types.ts`, `src/translations/`, and `tests/unit/`. No new directories, no new packages.

## Complexity Tracking

> No constitution violations — no additional justification required.
