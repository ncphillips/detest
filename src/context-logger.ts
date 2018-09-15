import { Test } from "./test.ts"
import { Context } from "./context.ts"

export class ContextLogger {
  public context: Context | null = null
 
  logDescription() {
    this.log(this.context.description)
  }

  logPassingTest(test: Test) {
    this.log(`  - ${test.description} (PASS)`)
  }

  logFailingTest(test: Test) {
    this.log(`  - ${test.description} (FAIL)`)
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
