# Detest

A [Deno](https://github.com/denoland/deno) Testing Library

> We don't just hate bugs, we detest them!

## Use

```typescript
import { describe, it, test, runTests} from "./detest/detest.ts"

describe("adding numbers", () => {
  describe("positive numbers", () => {
    test("1 + 1", () => expect(1 + 1).toBe(2))
    test("1 + 2", () => expect(1 + 2).toBe(3))
    test("1 + 3", () => expect(1 + 2).toBe(0))
  })
  it("works", () => { 1 + 1 })"
  describe("positive numbers", () => {
    test("1 + -1", () => expect(1 + (-1)).toBe(0)) 
    test("1 + -2", () => expect(1 + (-2)).toBe(-5)) 
    test("1 + -3", () => expect(1 + (-3)).toBe(-2)) 
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

### describe



### it

### runTest

### expect


## Development

Run Tests

```bash
deno detest.test.ts
```

## Roadmap

* Async `it`/`test` callbacks
* before/after 
* beforeEach/afterEach
* expand expectation library
