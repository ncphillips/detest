type Run = () => void | Promise<void>

type TestStatus = "pending" | "running" | "pass" | "fail"

export class Test {
  status: TestStatus = "pending"
  error: Error | null

  constructor(readonly description, readonly callback: Run) {
    //
  }

  async run() {
    try {
      this.status = "running"
      this.callback
      this.status = "pass"
    } catch(e) {
      this.status = "fail"
    }
  }
}
