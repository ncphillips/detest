export function expect<T = any>(actual: T) {
  return new DeferredExpectation<T>(actual)
}

class DeferredExpectation<T> {
  _not: boolean = false
  constructor(private actual: T) {}

  toBe(expected: T) {
    let isGood = expected === this.actual
    let failureMessage = `Expected ${expected} but received ${this.actual}.`

    this.checkAndThrow(isGood, failureMessage)
  }

  toBeNull() {
    let isGood = this.actual === null
    let failureMessage = `Expected ${this.actual} to be null.`

    if (this.check(isGood)) {
      throw new ToBeNullError(this.actual, this._not)
    }
  }

  toBeUndefined() {
    let isGood = typeof this.actual === "undefined"
    let failureMessage = `Expected ${this.actual} to be undefined.`

    this.checkAndThrow(isGood, failureMessage)
  }

  get not() {
    this._not = true
    return this
  }

  private checkAndThrow(isGood: boolean, failureMessage: string) {
    if (!(isGood && !this._not) && !(!isGood && this._not)) {
      throw new ExpectationError(failureMessage)
    }
  }

  private check(isGood: boolean) {
    return !(isGood && !this._not) && !(!isGood && this._not)
  }
}

class ExpectationError extends Error {
  name = "Expectation Error"
}

class ToBeNullError extends ExpectationError {
  name = "Expected to be null"
  constructor(public actual: any, public not: boolean) {
    super()
  }
  get message() {
    if (this.not) return "Expected value not to be null."
    return `Expecte value to be null, but received ${this.actual}`
  }
}
