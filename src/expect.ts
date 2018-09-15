export function expect<T = any>(actual: T) {
  return new DeferredExpectation<T>(actual)
}

class DeferredExpectation<T> {
  private shouldBeTrue: boolean = true 
  constructor(private actual: T) {}

  toBe(expected: T) {
    let isGood = expected === this.actual
    let failureMessage = `Expected ${expected} but received ${this.actual}.`

    this.checkAndThrow(isGood, failureMessage)
  }

  toBeNull() {
    if (!this.check(this.actual === null)) {
      throw new ToBeNullError(this.actual, this.shouldBeTrue)
    }
  }

  toBeUndefined() {
    let isGood = typeof this.actual === "undefined"
    let failureMessage = `Expected ${this.actual} to be undefined.`

    this.checkAndThrow(isGood, failureMessage)
  }

  get not() {
    this.shouldBeTrue = false
    return this
  }

  private checkAndThrow(isGood: boolean, failureMessage: string) {
    if (!this.check(isGood)) {
      throw new ExpectationError(failureMessage)
    }
  }

  private check(isGood: boolean) {
    let trueAndShouldBe = isGood && this.shouldBeTrue

    let falseAndShouldBe = !isGood && !this.shouldBeTrue

    return trueAndShouldBe || falseAndShouldBe 
  }
}

class ExpectationError extends Error {
  name = "Expectation Error"
}

class ToBeNullError extends ExpectationError {
  name = "Expected to be null"
  constructor(public actual: any, public shouldBeTrue: boolean) {
    super()
  }
  get message() {
    if (!this.shouldBeTrue) return "Expected value not to be null."
    return `Expected value to be null, but received ${this.actual}`
  }
}
