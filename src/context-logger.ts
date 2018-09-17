import { Test } from "./test.ts"
import { Context } from "./context.ts"

export class ContextLogger {
  logDescription(context: Context) {
    this.log(context, context.description)
  }

  logTest(context: Context, test: Test) {
    if (test.didPass) {
      this.logPassingTest(context, test)
    } else {
      this.logFailingTest(context, test)
    }
  }

  logPassingTest(context: Context, test: Test) {
    this.log(context, `  - ${test.description} (PASS)`)
  }

  logFailingTest(context: Context, test: Test) {
    this.log(context, `  - ${test.description} (FAIL)`)
    this.log(context, `      ERROR: ${test.error.message}`)
  }
 
  private tabs(context: Context): string {
    let t = ""
    for (let i = 1; i < context.nestingLevel; i++) t += "  "
    return t
  }

  private log(context: Context, message: string) {
    console.log(`${this.tabs(context)}${message}`)
  }

}
