export class Context {
  tests: Test[] = []
  contexts: Context[] = []
  nestingLevel = 0

  constructor(readonly description) {}

  addTest(description: string, callback: () => void) {
    this.tests.push(new Test(description, callback))
  }

  addContext(description: string, callback: (context: Context) => void) {
    let context = new Context(description)
    context.nestingLevel = this.nestingLevel + 1
    this.contexts.push(context)
    callback(context)
  }
}

class Test {
  constructor(readonly description, private callback: () => void) {}
  run() {
    this.callback()
  }
}

export class TestRunner {
  logger: Logger = new Logger()
  runTests(context: Context) {
    this.logger.context = context
    // Passing self to self
    this.logger.logDescription()

    context.tests.forEach((test: Test) => {
      try {
        test.run()
        this.logger.log(`  - ${test.description} (PASS)`)
      } catch (e) {
        this.logger.log(`  - ${test.description} (FAIL)`)
      }
    })

    context.contexts.map(nestedContext => {
      this.runTests(nestedContext)
    })
  }
}

class Logger {
  public context: Context | null = null

  get nestingLevel() {
    if (!this.context) return 0
    return this.context.nestingLevel
  }

  get tabs(): string {
    let t = ""
    for (let i = 0; i < this.context.nestingLevel; i++) t += "  "
    return t
  }

  log = (message: string) => {
    console.log(`${this.tabs}${message}`)
  }

  logDescription = () => {
    this.log(this.context.description)
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
