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
let { describe, it, before, beforeEach, test, context } = (() => {
  let activeContext = new Context("")

  /**
   * Nests a new Context
   */
  function describe(description: string, callback: () => void) {
    let parentContext: Context = activeContext

    parentContext.addContext(description, ctx => {
      activeContext = ctx
      callback()
    })

    activeContext = parentContext
  }

  /**
   * Adds a test to the current context.
   */
  function it(description: string, callback: () => void) {
    activeContext.addTest(description, callback)
  }

  function before(callback: () => void) {
    activeContext.addBefore(callback)
  }

  function beforeEach(callback: () => void) {
    activeContext.addBeforeEach(callback)
  }

  return { describe, it, test: it, before, context: activeContext, beforeEach }
})()


export { describe, it, test, before, beforeEach } 

/**
 * For now this method must be explicitly called.
 *
 * Once Deno progresses (or I learn how to use it better) this 
 * will be ba commandline tool, and this will be mostly be
 * an internal function.
 */
export function runTests() {
  new TestRunner().runTests(context)
}
