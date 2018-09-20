import { Test } from "./test.ts"

type Before = () => void
export class Context {
  befores: Before[] = []
  beforeEachs: Before[] = []
  tests: Test[] = []
  contexts: Context[] = []

  constructor(readonly description: string = "", readonly nestingLevel = 0) {}

  addTest = (description: string, callback: () => void) => {
    this.tests.push(new Test(description, callback))
  }

  addContext = (description: string, callback: (context: Context) => void) => {
    let context = new Context(description, this.nestingLevel + 1)

    this.contexts.push(context)

    callback(context)
  }

  addBefore = (before: Before) => {
    this.befores.push(before)
  }

  addBeforeEach = (beforeEach: Before) => {
    this.beforeEachs.push(beforeEach)
  }
}
