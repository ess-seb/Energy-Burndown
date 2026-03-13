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
    sendMessagePromise<T = unknown>(msg: Record<string, unknown>): Promise<T>;
  };
}

export interface LovelaceCard extends HTMLElement {
  hass: HomeAssistant;
  setConfig(config: unknown): void;
  getCardSize?(): number;
}

