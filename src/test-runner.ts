import { Test } from "./test.ts"
import { Context } from "./context.ts"
import { ContextLogger } from "./context-logger.ts"


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
