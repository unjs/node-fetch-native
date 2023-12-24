export function createProxy() {
  return {
    agent: undefined,
    dispatcher: undefined,
  };
}

export function createFetch() {
  return globalThis.fetch;
}

export const fetch = globalThis.fetch;
