import { Test } from "./test.ts"
import { Context } from "./context.ts"

export class ContextLogger {
  public context: Context | null = null
 
  logDescription() {
    if (this.context) {
      this.log(this.context.description)
    }
  }

  logTest(test: Test) {
    if (test.didPass) {
      this.logPassingTest(test)
    } else {
      this.logFailingTest(test)
    }
  }

  logPassingTest(test: Test) {
    this.log(`  - ${test.description} (PASS)`)
  }

  logFailingTest(test: Test) {
    this.log(`  - ${test.description} (FAIL)`)
    this.log(`      ERROR: ${test.error.message}`)
  }
 
  private get nestingLevel() {
    if (!this.context) return 0
    return this.context.nestingLevel
  }

  private get tabs(): string {
    let t = ""
    for (let i = 1; i < this.context.nestingLevel; i++) t += "  "
    return t
  }

  private log(message: string) {
    console.log(`${this.tabs}${message}`)
  }

}
