
export class Test {
  constructor(readonly description, private callback: () => Promise<void> | void) {}
  run() {
    return this.callback()
  }
}
