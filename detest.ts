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
  logger: ContextLogger = new ContextLogger()
  runTests(context: Context) {
    this.logger.context = context
    this.logger.logDescription()

    context.tests.forEach((test: Test) => {
      try {
        test.run()
        this.logger.logPassingTest(test)
      } catch (e) {
        this.logger.logFailingTest(test)
      }
    })

    context.contexts.map(nestedContext => {
      this.runTests(nestedContext)
    })
  }
}

class ContextLogger {
  public context: Context | null = null
 
  logDescription() {
    this.log(this.context.description)
  }

  logPassingTest(test: Test) {
    this.log(`  - ${test.description} (PASS)`)
  }

  logFailingTest(test: Test) {
    this.log(`  - ${test.description} (FAIL)`)
  }
 
  private get nestingLevel() {
    if (!this.context) return 0
    return this.context.nestingLevel
  }

  private get tabs(): string {
    let t = ""
    for (let i = 0; i < this.context.nestingLevel; i++) t += "  "
    return t
  }

  private log(message: string) {
    console.log(`${this.tabs}${message}`)
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
