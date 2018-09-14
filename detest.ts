import { Test } from "./src/test.ts"
export { Context } from "./src/context.ts"
export { TestRunner } from "./src/test-runner.ts"


export function expect<T = any>(actual: T) {
  return new DeferredExpectation<T>(actual)
}

class DeferredExpectation<T> {
  constructor(private actual: T) {}
  toBe(expected: T) {
    if (expected !== this.actual) {
      throw new ExpectationError(`Expected ${expected} but received ${this.actual}. `)
    }
  }
}

class ExpectationError extends Error {
  name = "Expectation Error"
}
