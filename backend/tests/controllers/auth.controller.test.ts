import { expect, test } from 'vitest'

test("Exact value matchers", () => {
  expect(2*2).toBe(4);
  expect(4-2).not.toBe(1);
})