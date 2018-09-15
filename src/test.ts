type Run = () => void | Promise<void>

export class Test {
  constructor(readonly description, readonly run: Run) {
    //
  }
}
