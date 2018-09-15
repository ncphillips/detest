import { expect, runTests, describe, it } from "./detest.ts"

describe("suite 1", () => {
  it("should pass", () => {
    expect(1).toBe(1)
  })
  it("should fail", () => {
    expect(1).toBe(2)
  })
  describe("two", () => {
    it("should fail", () => {
      expect(1).toBe(2)
    })
    describe("three", () => {
      it("should pass", () => {
        expect(2).toBe(2)
      })
    })
  })
})

describe("suite 2", () => {
  it("shold be okay", () => {})
})

runTests()
