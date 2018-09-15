import { expect, runTests, describe, it, test, before, beforeEach } from "./detest.ts"

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

describe("multiple before", () => {
  let a: number
  before(() => (a = 1))
  before(() => (a = 2))
  test("a === 2", () => expect(a).toBe(2))
})

describe("beforeEach", () => {
  let a = 0
  beforeEach(() => (a = 1))
  test("a === 1 should pass", () => {
    expect(a).toBe(1)
    a++
  })
  test("a === 2 should fail", () => {
    expect(a).toBe(2)
    a++
  })
  test("a === 1 should pass again", () => expect(a).toBe(1))
})

describe("expectations", () => {
  describe("not", () => {
    test("expect(1).toBe(2) should pass", () => {
      expect(1).not.toBe(2)
    })
    test("expect(2).toBe(2) should fail", () => {
      expect(2).not.toBe(2)
    })
  })
  describe("toBeNull", () => {
    test("expect(null).toBeNull() should pass", () => expect(null).toBeNull())
    test("expect(null).not.toBeNull() should fail", () => expect(null).not.toBeNull())
    test("expect(1).toBeNull() should fail", () => expect(1).toBeNull())
    test("expect(undefined).toBeNull() should fail", () => expect(undefined).toBeNull())
    test("expect([]).toBeNull() should fail", () => expect([]).toBeNull())
  })
  describe("toBeUndefined", () => {
    test("expect(undefined).toBeUndefined() should pass", () => expect(undefined).toBeUndefined())
    test("expect(null).toBeUndefined() should fail", () => expect(null).toBeUndefined())
    test("expect(1).toBeUndefined() should fail", () => expect(1).toBeUndefined())
    test("expect([]).toBeUndefined() should fail", () => expect([]).toBeUndefined())
  })
})

function waitForNumber() {
  return new Promise(resolve => setTimeout(resolve.bind(this, 42), 100))
}

runTests()
