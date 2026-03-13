import { describe, it, expect } from "vitest";
import { resolveLocale, numberFormatToLocale } from "../../src/card/localize";
import type { HomeAssistant } from "../../src/ha-types";
import type { CardConfig } from "../../src/card/types";

describe("resolveLocale", () => {
  const baseHass: HomeAssistant = {
    language: "en",
    locale: {
      language: "en",
      number_format: "decimal"
    },
    config: {
      time_zone: "Europe/Warsaw"
    },
    connection: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sendMessagePromise: async <T>() => Promise.resolve({} as T)
    }
  };

  const baseConfig: CardConfig = {
    type: "custom:energy-burndown-card",
    entity: "sensor.energy",
    comparison_mode: "year_over_year"
  };

  it("uses hass.locale when no overrides are provided", () => {
    const resolved = resolveLocale(baseHass, baseConfig);

    expect(resolved.language).toBe("en");
    expect(resolved.numberFormat).toBe("decimal");
    expect(resolved.timeZone).toBe("Europe/Warsaw");
  });

  it("uses config overrides when provided", () => {
    const config: CardConfig = {
      ...baseConfig,
      language: "pl",
      number_format: "comma"
    };

    const resolved = resolveLocale(baseHass, config);

    expect(resolved.language).toBe("pl");
    expect(resolved.numberFormat).toBe("comma");
  });
});

describe("numberFormatToLocale", () => {
  it("maps comma to a comma-decimal locale", () => {
    expect(numberFormatToLocale("comma", "pl")).toBe("de");
  });

  it("maps decimal to a dot-decimal locale", () => {
    expect(numberFormatToLocale("decimal", "pl")).toBe("en");
  });

  it("uses language when numberFormat is language", () => {
    expect(numberFormatToLocale("language", "pl")).toBe("pl");
  });
});

