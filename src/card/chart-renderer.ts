import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import "chartjs-adapter-date-fns";
import type { ComparisonSeries } from "./types";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler
);

export class ChartRenderer {
  private chart?: Chart;
  private lastHash?: string;

  constructor(private readonly canvas: HTMLCanvasElement) {}

  destroy(): void {
    this.chart?.destroy();
    this.chart = undefined;
  }

  update(series: ComparisonSeries): void {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    const currentData = series.current.points.map((p, index) => ({
      x: index + 1,
      y: p.value
    }));

    const referenceData = series.reference
      ? series.reference.points.map((p, index) => ({
          x: index + 1,
          y: p.value
        }))
      : [];

    const hash = JSON.stringify({
      c: currentData,
      r: referenceData
    });

    if (this.lastHash === hash && this.chart) {
      return;
    }
    this.lastHash = hash;

    const data = {
      datasets: [
        {
          label: "Bieżący okres",
          data: currentData,
          borderColor: "var(--primary-color)",
          backgroundColor: "rgba(0, 150, 136, 0.2)",
          fill: true,
          pointRadius: 0,
          tension: 0.3
        },
        ...(series.reference
          ? [
              {
                label: "Okres referencyjny",
                data: referenceData,
                borderColor: "var(--secondary-text-color)",
                backgroundColor: "transparent",
                pointRadius: 0,
                borderDash: [4, 2],
                tension: 0.3
              }
            ]
          : [])
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          display: true
        },
        tooltip: {
          mode: "index" as const,
          intersect: false
        }
      },
      scales: {
        x: {
          type: "linear" as const,
          ticks: {
            precision: 0
          },
          grid: {
            color: "rgba(255, 255, 255, 0.06)"
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(255, 255, 255, 0.06)"
          }
        }
      }
    };

    if (this.chart) {
      this.chart.data = data as never;
      this.chart.options = options as never;
      this.chart.update();
    } else {
      this.chart = new Chart(ctx, {
        type: "line",
        data: data as never,
        options: options as never
      });
    }
  }
}

