import { DescribeItApi } from "./src/describe-it-api.ts"
import { ContextLogger } from "./src/context-logger.ts"

let listeners = [new ContextLogger()]
let { describe, it, before, beforeEach, test, runTests } = new DescribeItApi(listeners)

export { describe, it, test, before, beforeEach, runTests }
export { expect } from "./src/expect.ts"
