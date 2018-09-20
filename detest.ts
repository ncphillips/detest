import { TestingFramework } from "./src/testing-framework.ts"
import { ContextLogger } from "./src/context-logger.ts"

let listeners = [new ContextLogger()]
let { describe, it, before, beforeEach, test, runTests } = new TestingFramework(listeners)

export { describe, it, test, before, beforeEach, runTests }
export { expect } from "./src/expect.ts"
