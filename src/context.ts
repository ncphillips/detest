import { Test } from "./test.ts"

type Before = () => void
export class Context {
  befores: Before[] = []
  tests: Test[] = []
  contexts: Context[] = []
  nestingLevel = 0

  constructor(readonly description) {}

  addTest = (description: string, callback: () => void) => {
    this.tests.push(new Test(description, callback))
  }

  addContext = (description: string, callback: (context: Context) => void) => {
    let context = new Context(description)
    context.nestingLevel = this.nestingLevel + 1
    this.contexts.push(context)
    callback(context)
  }

  addBefore = (before: Before) => {
    this.befores.push(before)
  }

}
