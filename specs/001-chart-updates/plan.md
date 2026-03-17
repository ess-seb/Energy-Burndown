# Implementation Plan: Chart Updates – Wizualizacja i UX wykresu

**Branch**: `001-chart-updates` | **Date**: 2026-03-17 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-chart-updates/spec.md`

---

## Summary

Dodaje 7 grup ulepszeń wizualnych i konfiguracyjnych do wykresu Chart.js w karcie Energy Horizon:
(1) pełna oś czasu z przerwami dla brakujących danych (US1),
(2) markery aktualnego dnia z pionową linią (US2),
(3) półprzezroczyste wypełnienie pod seriami (US3),
(4) konfigurowalny kolor głównej serii (US4),
(5) linia prognozy na wykresie (US5),
(6) etykiety jednostek na osiach (US6),
(7) usprawnienia wyglądu siatki i wysokości wykresu (US7).

Wszystkie zmiany wizualne są skoncentrowane w `chart-renderer.ts`. Typy konfiguracyjne rozszerzamy w `types.ts`. Logika pełnej osi czasu trafia do nowej funkcji `buildFullTimeline()` w `ha-api.ts`. Wysokość kontenera wykresu zmienia się w `energy-horizon-card-styles.ts`. Karta `cumulative-comparison-chart.ts` dostarcza nowe opcje do renderera i przekazuje `ComparisonPeriod`.

---

## Technical Context

**Language/Version**: TypeScript 5.6 (ES2020+, `strict` enabled)  
**Primary Dependencies**: Lit 3.1 (LitElement, `html`, `css`), Chart.js 4.4 (core, LineController, LinearScale, Filler, Tooltip, Legend), chartjs-adapter-date-fns, Vite 6 (bundler), Vitest 2 (tests)  
**Storage**: N/A — in-browser only; HA state is read-only at render time  
**Testing**: Vitest 2, unit tests in `tests/unit/`, integration in `tests/integration/`  
**Target Platform**: Home Assistant Lovelace card (browser Web Component, HACS-distributed)  
**Project Type**: Lovelace card — single-file ES module bundle  
**Performance Goals**: Chart renders within one animation frame (≤16 ms); no main-thread blocking  
**Constraints**: Brak nowych zależności NPM; Chart.js 4 built-in API only; TypeScript `strict`; brak `any` w nowym kodzie  
**Scale/Scope**: ≤366 punktów danych na serię (aggregation: day); ≤53 (week); ≤12 (month)

---

## Constitution Check

| Zasada konstytucji | Status | Uwagi |
|---|---|---|
| I. Zgodność z HA/HACS | ✅ PASS | Wszystkie zmiany in-browser; brak nowych kanałów komunikacji z HA; konfiguracja YAML zgodna z wzorcami HA |
| II. Bezpieczeństwo | ✅ PASS | `primary_color` renderowany przez CSS (przeglądarka odrzuca niepoprawne wartości CSS koloru); `fill_*_opacity` clampowany do 0–100 przed użyciem; brak XSS w nowych polach |
| III. Jakość / TypeScript strict | ✅ PASS | Wszystkie nowe typy ściśle typowane; brak nowych `any`; istniejące `as any` to odziedziczony dług techniczny |
| IV. UX/UI | ✅ PASS | Kolory serii spójne we wszystkich elementach (linia, fill, marker dziś, forecast); zmiany wyglądu zgodne z HA look & feel |
| V. Wydajność / prostota | ✅ PASS | Brak nowych zależności; custom plugin Chart.js (afterDraw) bez kosztownych obliczeń; `buildFullTimeline` O(N) |

---

## Project Structure

### Documentation (this feature)

```text
specs/001-chart-updates/
├── plan.md                         ← ten plik
├── research.md                     ← wyniki fazy 0
├── data-model.md                   ← wyniki fazy 1
├── contracts/
│   └── card-config-schema.md       ← kontrakt YAML (publiczne API karty)
└── tasks.md                        ← faza 2 (/speckit.tasks — NIE tworzony przez /speckit.plan)
```

### Source Code (zmodyfikowane pliki)

```text
src/
└── card/
    ├── types.ts                        ← nowe pola CardConfig + nowe typy pomocnicze
    ├── ha-api.ts                       ← nowa funkcja: buildFullTimeline()
    ├── chart-renderer.ts               ← główne zmiany: pełna oś, markery, fill, forecast, etykiety, siatka
    ├── cumulative-comparison-chart.ts  ← przekazanie ComparisonPeriod + ChartRendererConfig do ChartRenderer
    └── energy-horizon-card-styles.ts   ← zmiana wysokości .chart-container (200px → 290px)

README.md                               ← aktualizacja dokumentacji (FR-022, FR-023)
```

**Structure Decision**: Single-project (Option 1). Projekt jest już uruchomiony jako karta Lovelace; nie wymaga backend ani dodatkowych katalogów.

---

## Complexity Tracking

> Brak naruszeń konstytucji wymagających uzasadnienia.
