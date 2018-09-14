export class Context {
  tests: Test[] = []
  contexts: Context[] = []
  nestingLevel = 0

  constructor(readonly description) {}

  get tabs(): string {
    let t = ""
    for (let i = 0; i < this.nestingLevel; i++) t += "  "
    return t
  }

  log(message: string) {
    console.log(`${this.tabs}${message}`)
  }

  logDescription() {
    this.log(this.description)
  }

  addTest(description: string, callback: () => void) {
    this.tests.push(new Test(description, callback))
  }

  addContext(context: Context) {
    context.nestingLevel = this.nestingLevel + 1
    this.contexts.push(context)
  }
}

class Test {
  constructor(readonly description, private callback: () => void) {}
  run() {
    this.callback()
  }
}

export class TestRunner {
  runTests(context: Context) {
    // Passing self to self
    context.logDescription()
    context.tests.forEach((test: Test) => {
      try {
        test.run()
        context.log(`  - ${test.description} (PASS)`)
      } catch (e) {
        context.log(`  - ${test.description} (FAIL)`)
      }
    })

    context.contexts.map(nestedContext => {
      this.runTests(nestedContext)
    })
  }
}

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
