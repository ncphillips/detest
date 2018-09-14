import { expect, Context, TestRunner } from  "./detest.ts"


let context = new Context("example tests")

context.addTest("should pass", () => expect(1 + 1).toBe(2) )
context.addTest("should fail", () => expect(1 + 2).toBe(2) )
context.addContext((() => {
  let context = new Context("nested context")

  context.addTest("should be further indented", () => {})

  return context
})())


let testRunner = new TestRunner()

testRunner.runTests(context)
