# Research: Chart Updates – Faza 0

**Branch**: `001-chart-updates` | **Date**: 2026-03-17

---

## Pytania badawcze i decyzje

### R-001: Jak generować pełną oś czasu z przerwami w Chart.js 4?

**Pytanie**: Jak wyświetlić N slotów na osi X (np. 365 dni), pozostawiając przerwy (gaps) w miejscach braku danych?

**Decyzja**: Używamy osi `type: 'linear'` z indeksami slotów (0..N-1) jako wartościami X. Dataset ma `null` w miejscach brakujących danych. Chart.js domyślnie ma `spanGaps: false`, co oznacza że linia jest przerywana przy `null`.

**Uzasadnienie**:
- Oś `type: 'category'` wymagałaby przekazania tablicy etykiet do `data.labels` i byłaby mniej wydajna.
- Oś `type: 'time'` wymaga `chartjs-adapter-date-fns` i zarządzania timezone — niepotrzebna złożoność, gdy wystarczy indeks.
- Podejście z indeksem i tablicą etykiet (dla tooltipów/ticków) jest najprostsze, O(N).

**Implementacja**:
```typescript
// Dataset point
type ChartPoint = { x: number; y: number | null };

// Oś X — linearna z indeksem slotu
scales: {
  x: {
    type: 'linear',
    ticks: {
      callback: (value: number) => labels[value] ?? ''  // labels = sformatowane daty
    }
  }
}

// Dane z nullami
dataset.data = [{ x: 0, y: 120 }, { x: 1, y: null }, { x: 2, y: 180 }, ...]
dataset.spanGaps = false  // domyślnie false, ale jawnie ustawiamy dla czytelności
```

**Alternatywy odrzucone**: `type: 'time'` — wymaga obsługi timezone i jest nadmiarowy; `type: 'category'` — mniej precyzyjny przy oznaczaniu tooltipów.

---

### R-002: Jak generować sloty pełnej osi czasu dla każdego trybu agregacji?

**Pytanie**: Jak obliczyć tablicę timestampów `number[]` reprezentującą wszystkie sloty okresu dla agregacji `day`/`week`/`month`?

**Decyzja**:
- **day**: iteracja od `period_start` do `period_end` co 86400 000 ms (lub `Date` z inkrementacją dnia). Używamy daty w UTC.
- **week**: iteracja co 7 dni od `period_start` (round down do początku tygodnia ISO).
- **month**: iteracja co miesiąc od `period_start.getFullYear/getMonth` do `period_end`.

**Implementacja**: Nowa funkcja `buildFullTimeline(period: ComparisonPeriod): number[]` w `ha-api.ts`.

```typescript
export function buildFullTimeline(period: ComparisonPeriod): number[] {
  const slots: number[] = [];
  const { aggregation } = period;
  
  if (aggregation === 'day') {
    const cursor = new Date(period.current_start);
    cursor.setHours(0, 0, 0, 0);
    const end = new Date(period.current_end);
    while (cursor <= end) {
      slots.push(cursor.getTime());
      cursor.setDate(cursor.getDate() + 1);
    }
  } else if (aggregation === 'week') {
    const cursor = new Date(period.current_start);
    cursor.setHours(0, 0, 0, 0);
    const end = new Date(period.current_end);
    while (cursor <= end) {
      slots.push(cursor.getTime());
      cursor.setDate(cursor.getDate() + 7);
    }
  } else if (aggregation === 'month') {
    const cursor = new Date(period.current_start.getFullYear(), period.current_start.getMonth(), 1);
    const endMonth = period.current_end.getMonth();
    const endYear = period.current_end.getFullYear();
    while (
      cursor.getFullYear() < endYear ||
      (cursor.getFullYear() === endYear && cursor.getMonth() <= endMonth)
    ) {
      slots.push(cursor.getTime());
      cursor.setMonth(cursor.getMonth() + 1);
    }
  }
  
  return slots;
}
```

**Uwaga**: Dla trybu `year_over_year` rok referencyjny (`reference_start..reference_end`) obejmuje cały rok — np. 365/366 dni. Oś X wykresu jest generowana z `current_start..current_end` (od 1 Jan do dziś, więc bieżący rok może mieć niepełną oś). Ale spec (FR-001) mówi „kompletny badany okres" — dla `year_over_year` z bieżącym rokiem oś musi mieć wszystkie dni roku (Jan 1 do Dec 31). **Decyzja**: Dla `year_over_year` pełna oś = od `period.current_start` do końca roku (`Dec 31`) lub odpowiednio do końca miesiąca dla `month_over_year`.

**Aktualizacja**: `buildFullTimeline` przyjmuje `fullEnd: Date` — gdy `year_over_year`, `fullEnd = new Date(year, 11, 31)`; gdy `month_over_year`, `fullEnd = ostatni dzień miesiąca`. Serię bieżącą mapujemy na sloty od 0 do dziś, reszta to `null`.

---

### R-003: Jak rysować niestandardowe markery (punkt dziś + pionowa linia) w Chart.js 4?

**Pytanie**: Jak narysować dwie kropki i pionową linię przerywaną w pozycji „dziś" na wykresie?

**Decyzja**: Custom Chart.js plugin rejestrowany per-instancja (nie globalnie), wywołany w `afterDraw`.

**Uzasadnienie**:
- Plugin `afterDraw` ma dostęp do instancji chart z pełnym kontekstem canvas i przeliczonymi pikselami.
- Metoda `chart.scales.x.getPixelForValue(slotIndex)` daje dokładną pozycję X w pikselach.
- Metoda `chart.scales.y.getPixelForValue(0)` daje pozycję Y=0.
- `chart.chartArea` daje granice obszaru wykresu.

**Implementacja** (w `chart-renderer.ts`):
```typescript
const todayPlugin = {
  id: 'todayMarker',
  afterDraw(chart: Chart) {
    const ctx = chart.ctx;
    const xScale = chart.scales['x'];
    const yScale = chart.scales['y'];
    
    if (!todaySlotIndex || todaySlotIndex < 0) return;
    
    const xPixel = xScale.getPixelForValue(todaySlotIndex);
    const y0 = yScale.getPixelForValue(0);
    const yTop = /* wyższy z currentY i referenceY, lub chartArea.top jeśli brak obu */;
    
    // Pionowa linia przerywana
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(xPixel, y0);
    ctx.lineTo(xPixel, yTop);
    ctx.stroke();
    ctx.restore();
    
    // Kropki
    // (narysuj kółko w getPixelForValue(currentValue) i referenceValue)
  }
};
```

**Alternatywy odrzucone**: Annotacje przez `chartjs-plugin-annotation` — nowa zależność NPM, niepotrzebna; custom dataset z `pointRadius > 0` dla jednego punktu — nieintuicyjne i trudne do synchronizacji z pionową linią.

---

### R-004: Jak implementować wypełnienie pod wykresem (Chart.js Filler)?

**Pytanie**: Jak użyć `Filler` z Chart.js 4 do półprzezroczystego wypełnienia od linii do osi 0?

**Decyzja**: `fill: 'origin'` + `backgroundColor: 'rgba(r, g, b, opacity)'` w konfiguracji datasetu. Plugin `Filler` jest już zarejestrowany w `chart-renderer.ts`.

**Implementacja**:
```typescript
// dataset
{
  fill: fillCurrent ? 'origin' : false,
  backgroundColor: fillCurrent
    ? colorWithOpacity(primaryColor, fillCurrentOpacity / 100)
    : 'transparent',
}
```

**Helper `colorWithOpacity`**: Parsuje kolor CSS i zwraca rgba z nowym alpha. Użyjemy prostego podejścia: tworzymy ukryty `<canvas>` lub element DOM, rysujemy kolor, odczytujemy RGB. Alternatywnie, jeśli kolor jest hexem, parsujemy ręcznie. Najprościej: tworzymy `<canvas>` 1×1 px i używamy `fillRect`.

**Uwaga edge case (spec)**: Gdy `primary_color: 'rgba(r,g,b,a)'`, krycie wypełnienia pochodzi z `fill_*_opacity`, a nie z alpha `primary_color`. Musimy więc zawsze nadpisywać alpha niezależnie od formatu wejściowego.

**Decyzja dla `colorWithOpacity`**:
```typescript
function colorWithOpacity(cssColor: string, alpha: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = cssColor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
```

Jeśli `cssColor` jest niepoprawny, przeglądarka użyje czarnego (fallback) — bezpieczne, nie crash.

---

### R-005: Jak zaimplementować linię prognozy jako oddzielny dataset?

**Pytanie**: Jak rysować przerywaną linię od „dziś" do końca okresu?

**Decyzja**: Trzeci dataset z dwoma punktami: `[{x: todaySlotIndex, y: todayValue}, {x: lastSlotIndex, y: forecastTotal}]`. Dataset ma `borderDash: [6, 3]`, `pointRadius: 0`, `fill: false`.

**Warunek wyświetlenia**: `show_forecast: true` AND dane dla dzisiejszego dnia istnieją AND dzisiejszy dzień jest w zakresie okresu (spec FR-016).

**Kolor**: Identyczny jak `primaryColor` (FR-015).

---

### R-006: Jak pobrać kolor akcentu HA z CSS?

**Pytanie**: Jak odczytać `--accent-color` z motywu HA w kontekście Shadow DOM karty?

**Decyzja**: Istniejąca metoda `getThemeColors()` w `chart-renderer.ts` już robi `getComputedStyle(host).getPropertyValue('--accent-color')`. Host jest znajdowany przez `canvas.closest('.ehc-card') || canvas.closest('ha-card') || canvas`. To podejście jest poprawne — nie wymaga zmian.

Nowa opcja `primary_color` w YAML nadpisuje ten kolor. Priorytet: `config.primary_color` → `--accent-color` → `--primary-color` → `'#03a9f4'`.

---

### R-007: Jak ustawić etykiety osi w Chart.js 4?

**Pytanie**: Jak wyświetlić jednostkę (np. „kWh") przy najwyższej wartości osi Y i etykietę okresu na osi X?

**Decyzja dla osi Y**: Zamiast `scales.y.title` (wyświetlałoby etykietę z boku), używamy `scales.y.ticks.callback`:
```typescript
ticks: {
  callback: (value: number, index: number, ticks: Tick[]) => {
    if (index === ticks.length - 1) return `${value} ${unit}`;  // przy najwyższej wartości
    return String(value);
  }
}
```
> **Uwaga**: „przy najwyższej wartości" (spec FR-017) oznacza przy najwyższym ticku osi Y. Indeks ostatni w tablicy `ticks` = najwyższy tick (gdy `beginAtZero: true`).

**Decyzja dla osi X**: `scales.x.title.display: true; scales.x.title.text: periodLabel`. Gdzie `periodLabel` to rok (np. „2025") albo nazwa miesiąca (np. „Marzec") — lokalizowana przez `Intl.DateTimeFormat`.

---

### R-008: Jak ograniczyć ticki osi Y do dokładnie 5 w Chart.js 4?

**Pytanie**: Jak wymusić dokładnie 5 ticków (w tym 0) na osi Y?

**Decyzja**: `scales.y.ticks.count: 5` + `scales.y.ticks.maxTicksLimit: 5`. Opcja `count` wymusza dokładnie 5 ticków (Chart.js 4 feature). `beginAtZero: true` zapewnia że 0 jest pierwszym tickiem.

---

### R-009: Alignment serii referencyjnej na pełnej osi

**Pytanie**: Jak wyrównać dane serii referencyjnej (z innego roku/miesiąca) do slotów serii bieżącej?

**Decyzja**: Serię referencyjną mapujemy **po indeksie slotu w jej własnym okresie** (nie po timestamp). HA zwraca N punktów dla roku referencyjnego (365 lub 366 dni). Slot `i` na osi X odpowiada: dzień `i` bieżącego roku (seria bieżąca) AND dzień `i` roku poprzedniego (seria referencyjna).

Implementacja: Po wywołaniu `buildFullTimeline(period)` dla osi X (z pełną datą `current_start..fullEnd`), dla każdego slotu `i` szukamy czy w `series.current.points` istnieje punkt z `timestamp ≈ slot[i]`. Analogicznie, dla referencyjnej: slot `i` odpowiada `reference_start + i * slotDuration`.

Funkcja `buildAlignedSeries(series, fullTimeline)` w `chart-renderer.ts` (lub `ha-api.ts`).

---

### R-010: Rozmiar kontenera wykresu

**Pytanie**: Obecna wysokość `.chart-container` to 200px. Nowa = 200 × 1.45 = 290px.

**Decyzja**: Zmiana w `energy-horizon-card-styles.ts`:
```css
.chart-container {
  height: 290px;
}
```

---

## Podsumowanie decyzji

| ID | Decyzja |
|----|---------|
| R-001 | Oś X = `type: linear`, indeksy slotów; `null` dla brakujących punktów; `spanGaps: false` |
| R-002 | `buildFullTimeline(period, fullEnd)` generuje tablicę timestampów; fullEnd = koniec roku/miesiąca |
| R-003 | Custom plugin `afterDraw` rysuje pionową linię i kropki dla dziś |
| R-004 | `fill: 'origin'`, `colorWithOpacity()` przez canvas 1×1 px |
| R-005 | Linia prognozy = trzeci dataset z `borderDash`, `pointRadius: 0` |
| R-006 | `primary_color` z YAML → `--accent-color` CSS → `--primary-color` CSS → `#03a9f4` |
| R-007 | Y ticks callback dla jednostki przy max; X title dla etykiety okresu |
| R-008 | `ticks.count: 5` + `maxTicksLimit: 5` |
| R-009 | Wyrównanie po indeksie slotu, nie po timestamp cross-year |
| R-010 | `.chart-container { height: 290px }` |
