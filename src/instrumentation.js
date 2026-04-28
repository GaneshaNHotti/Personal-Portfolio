export function register() {
  // Patch localStorage if it exists but is broken (e.g. Claude Code injects
  // --localstorage-file with an invalid path, leaving localStorage defined but
  // with non-function methods). This guard runs once at server startup, before
  // any SSR rendering, so libraries that touch localStorage won't throw.
  if (
    typeof localStorage !== "undefined" &&
    typeof localStorage.getItem !== "function"
  ) {
    const store = {};
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: (k) => store[k] ?? null,
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
        clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
        get length() { return Object.keys(store).length; },
        key: (n) => Object.keys(store)[n] ?? null,
      },
      writable: true,
      configurable: true,
    });
  }
}
