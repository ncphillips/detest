export function expect<T = any>(actual: T) {
  return new DeferredExpectation<T>(actual)
}

class DeferredExpectation<T> {
  _not: boolean = false
  constructor(private actual: T) {}

  toBe(expected: T) {
    let isGood = expected === this.actual
    let failureMessage = `Expected ${expected} but received ${this.actual}.`

    this.check(isGood, failureMessage)
  }

  toBeNull() {
    let isGood = this.actual === null
    let failureMessage = `Expected ${this.actual} to be null.`
    
    this.check(isGood, failureMessage)
  }

  toBeUndefined() {
    let isGood = typeof this.actual === "undefined" 
    let failureMessage = `Expected ${this.actual} to be undefined.`

    this.check(isGood, failureMessage)
  }

  get not() {
    this._not = true
    return this
  }

  private check(isGood: boolean, failureMessage: string) {
    if ((!(isGood && !this._not) && !(!isGood && this._not))) {
      throw new ExpectationError(failureMessage)
    }
  }


}

class ExpectationError extends Error {
  name = "Expectation Error"
}
