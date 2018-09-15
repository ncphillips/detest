export function expect<T = any>(actual: T) {
  return new DeferredExpectation<T>(actual)
}

class DeferredExpectation<T> {
  _not: boolean = false
  constructor(private actual: T) {}

  toBe(expected: T) {
    if (expected !== this.actual && !this._not) {
      throw new ExpectationError(`Expected ${expected} but received ${this.actual}. `)
    }
  }
  get not() {
    this._not = true
    return this
  }
}

class ExpectationError extends Error {
  name = "Expectation Error"
}
