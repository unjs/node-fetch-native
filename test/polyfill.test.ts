import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("polyfill", () => {
  let originalFetch: any;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    delete globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should work as expected", async () => {
    expect(globalThis.fetch).toBeUndefined();

    await import("../src/polyfill");

    const result = await globalThis
      .fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json());

    expect(result).toMatchObject({ id: 1 });
  });
});
