// add Vitest functions here globally
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Run cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

beforeEach(() => {
  // https://github.com/vitest-dev/vitest/issues/4223
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.scrollTo = vi.fn<any>();
});
