# Detest

A [Deno](https://github.com/denoland/deno) Testing Library

> We don't just hate bugs, we detest them!

## Use

```typescript
import { describe, it, test, runTests} from "./detest/detest.ts"

describe("testing", () => {
  it("works", () => { 1 + 1 })"

  describe("describes can be nested", () => {
    test("1 + -1", () => expect(1 + (-1)).toBe(0)) 
    test("1 + -3", () => expect(1 + (-3)).toBe(-2)) 
  })

  describe("async testing", () => {
    it("is also possible", async () => {
      let value = await fetchValue()

      expect(value).toBe("found")
    })
  })

  describe("before(each)", () => {
    let setupValue
    let resets

    before(() => {
      setupValue = 12345
    })

    beforeEach(() => {
      resets = 0
    })

    it("should be 0", () => { 
      expect(resets).toBe(0)

      resets++
    })
    it("should still be 0", () => expect(resets).toBe(0))
  })
})

runTest()
```

Output:

```
adding numbers
  - it works (PASS)
  positive numbers
    - 1 + 1 (PASS)
    - 1 + 2 (PASS)
    - 1 + 3 (FAIL)
  negative numbers
    - 1 + -1 (PASS)
    - 1 + -2 (FAIL)
    - 1 + -3 (PASS)
  
```

### API

* `function describe(description: string, callback: () => void): void`
* `function it(description: string, callback: () => void | Promise<void>): void`
* `function test`: Alias for `it`.
* `function before(callback: () => void): void`
* `function beforeEach(callback: () => void): void`
* `function expect(actual: any): DeferredExpectation`
* `class DeferredExpectation`
  * `toBe(expected: any)`u

## Development

Run Tests

```bash
deno detest.test.ts
```

## Roadmap

* after/afterEach
* expand expectation library
