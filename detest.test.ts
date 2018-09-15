import { expect, runTests, describe, it, test, before } from "./detest.ts"

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


describe("asnyc tests", () => {
  it("should pass", async () => {
    let num = await waitForNumber()

    expect(num).toBe(42)
  })
  it("should fail", async () => {
    let num = await waitForNumber()

    expect(num).toBe(0)
  })

})

describe("before", () => {
  let a: number
  before(() => (a = 1))
  test("a === 1", () => expect(a).toBe(1))
})

function waitForNumber() {
  return new Promise(resolve => setTimeout(resolve.bind(this, 42), 100))
}

runTests()

