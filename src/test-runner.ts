import { Test } from "./test.ts"
import { Context } from "./context.ts"

export interface TestRunnerListener {
  contextEntered(context: Context)
  testFinished(context: Context, test: Test)
}

export class TestRunner {
  constructor(private listeners: TestRunnerListener[] = []) {}
  async runTests(context: Context) {
    // contextEntered
    this.contextEntered(context)

    // contextSetupBegan
    context.befores.forEach(before => before())
    // contextSetupEnded
    for (let i = 0; i < context.tests.length; i++) {
      // testSetupBegan
      context.beforeEachs.forEach(beforeEach => beforeEach())
      // testSetupEnded

      // testStarted
      let test = context.tests[i]
      await test.run()

      // testFinished
      this.testFinished(context, test)
    }

    for (let i = 0; i < context.contexts.length; i++) {
      let nestedContext = context.contexts[i]
      await this.runTests(nestedContext)
    }
    // contextExited
  }

  contextEntered(context: Context) {
    this.listeners.forEach(l => l.contextEntered(context))
  }

  testFinished(context: Context, test: Test) {
    this.listeners.forEach(l => l.testFinished(context, test))
  }
}
