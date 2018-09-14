import { Test } from "./src/test.ts"
import { Context } from "./src/context.ts"

export { Context } 

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
