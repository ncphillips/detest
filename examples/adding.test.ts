import { describe, it, expect, runTests } from "../detest.ts"

describe("adding zeros", () => {

  it("should be 0 if there's two of them", () => {
    expect(0 + 0).toBe(0)
  })

})

runTests()
