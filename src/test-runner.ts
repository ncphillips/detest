import { Test } from "./test.ts"
import { Context } from "./context.ts"
import { ContextLogger } from "./context-logger.ts"


export class TestRunner {
  logger: ContextLogger = new ContextLogger()
  async runTests(context: Context) {
    this.logger.context = context
    this.logger.logDescription()

    context.befores.forEach(before => before())
    for (let i = 0; i < context.tests.length; i++) {
      let test = context.tests[i]
      try {
        context.beforeEachs.forEach(beforeEach => beforeEach())
        await test.run()
        this.logger.logPassingTest(test)
      } catch (e) {
        this.logger.logFailingTest(test)
      }
    }

    for (let i = 0; i < context.contexts.length; i++) {
      let nestedContext = context.contexts[i]
      await this.runTests(nestedContext)
    }
  }
}
