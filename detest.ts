import { Test } from "./src/test.ts"
import { Context } from "./src/context.ts"
import { TestRunner } from "./src/test-runner.ts"
export { Context } from "./src/context.ts"
export { TestRunner } from "./src/test-runner.ts"
export { expect } from "./src/expect.ts"

/**
 * In order to make the describe-it syntax work with
 * lamda functions, we must track the current context
 * using a closure.
 *
 * Althoug describes are not async, I have a bit of a
 * concern that tests may at times end up in the
 * wrong context.
 */
class TestingFramework {
  context: Context
  activeContext: Context

  constructor() {
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
    new TestRunner().runTests(this.context)
  }
}

let { describe, it, before, beforeEach, test, runTests } = new TestingFramework()

export { describe, it, test, before, beforeEach, runTests }

/**
 * For now this method must be explicitly called.
 *
 * Once Deno progresses (or I learn how to use it better) this
 * will be ba commandline tool, and this will be mostly be
 * an internal function.
 */

