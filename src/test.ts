type Run = () => void | Promise<void>

enum TestStatus { 
  pending = "pending",
  running = "running" ,
  pass = "pass" ,
  fail = "fail",
}

export class Test {
  status: TestStatus = TestStatus.pending
  error: Error | null

  constructor(readonly description, readonly callback: Run) {
    //
  }

  async run() {
    try {
      this.status = TestStatus.running
      this.callback
      this.status = TestStatus.pass
    } catch(e) {
      this.status = TestStatus.fail
    }
  }

  get didPass() {
    return this.status === TestStatus.pass
  }
}
