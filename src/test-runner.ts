import { Test } from "./test.ts"
import { Context } from "./context.ts"
import { ContextLogger } from "./context-logger.ts"


export class TestRunner {
  logger: ContextLogger = new ContextLogger()
  runTests(context: Context) {
    this.logger.context = context
    this.logger.logDescription()

    context.tests.forEach(async (test: Test) => {
      try {
        let promise: Promise<void> | void = test.run()
        if (promise) {
          await promise
        }
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
