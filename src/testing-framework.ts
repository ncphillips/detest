import { Context } from "./context.ts"
import { TestRunner } from "./test-runner.ts"
import { ContextLogger } from "./context-logger.ts"

export class TestingFramework {
  context: Context
  activeContext: Context
  testRunner: TestRunner
  logger: ContextLogger

  constructor() {
    this.logger = new ContextLogger()
    this.testRunner = new TestRunner(this.logger)
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
