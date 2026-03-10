import { describe, it, expect } from "vitest";
import "../helpers/setup-dom";
import "../../src/index";

describe("energy-burndown-card integration", () => {
  it("can be instantiated without crashing", () => {
    const el = document.createElement("energy-burndown-card");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeDefined();
  });
});

