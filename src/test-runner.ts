import { Test } from "./test.ts"
import { Context } from "./context.ts"

interface TestRunnerListener {
  logDescription(context: Context)
  logTest(context: Context, test: Test)
}

export class TestRunner {
  constructor(private listeners: TestRunnerListener[] = []) {}
  async runTests(context: Context) {
    this.enterContext(context)

    context.befores.forEach(before => before())
    for (let i = 0; i < context.tests.length; i++) {
      context.beforeEachs.forEach(beforeEach => beforeEach())

      let test = context.tests[i]
      await test.run()

      this.testFinished(context, test)
    }

    for (let i = 0; i < context.contexts.length; i++) {
      let nestedContext = context.contexts[i]
      await this.runTests(nestedContext)
    }
  }

  enterContext(context: Context) {
    this.listeners.forEach(l => l.logDescription(context))
  }

  testFinished(context: Context, test: Test) {
    this.listeners.forEach(l => l.logTest(context, test))
  }
}
