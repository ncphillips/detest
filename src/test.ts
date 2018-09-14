export class Test {
  constructor(readonly description, private callback: () => void) {}
  run() {
    this.callback()
  }
}
