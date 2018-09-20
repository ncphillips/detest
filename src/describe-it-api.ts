import { Context } from "./context.ts"
import { TestRunner, TestRunnerListener } from "./test-runner.ts"

export class DescribeItApi {
  context: Context
  activeContext: Context
  testRunner: TestRunner

  constructor(private listeners: TestRunnerListener[]) {
    this.testRunner = new TestRunner(this.listeners)
    this.context = new Context("")
    this.activeContext = this.context
  }

  describe = (description: string, callback: () => void) => {
    let parentContext: Context = this.activeContext

    parentContext.addContext(description, ctx => {
      this.activeContext = ctx
      callback()
    })

    this.activeContext = parentContext
  }

  it = (description: string, callback: () => void) => {
    this.activeContext.addTest(description, callback)
  }

  test = (description: string, callback: () => void) => {
    this.it(description, callback)
  }

  before = (callback: () => void) => {
    this.activeContext.addBefore(callback)
  }

  beforeEach = (callback: () => void) => {
    this.activeContext.addBeforeEach(callback)
  }

  runTests = () => {
    this.testRunner.runTests(this.context)
  }
}
