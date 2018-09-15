import { TestingFramework } from "./src/testing-framework.ts"

let { describe, it, before, beforeEach, test, runTests } = new TestingFramework()

export { describe, it, test, before, beforeEach, runTests }
export { expect } from "./src/expect.ts"
