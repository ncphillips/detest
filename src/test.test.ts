import { Test } from "./test.ts"

let fails = 0

function assert(assertion: boolean, failMessage: string) {
  if (!assertion) {
    console.log(failMessage)
    fails++
  }
}

async function runTests() {
  // new Tests haven't passed yet
  assert(!new Test("", () => {}).didPass, "test.didPass should have been false")

  // tests run passes if callback finishes without error
  let a = new Test("", () => {})
  await a.run()
  assert(a.didPass, "src/test.ts - Expected test to have passed")

  // test run fails if callback throws error
  let b = new Test("", () => { throw new Error()})
  await b.run()
  assert(!b.didPass, "src/test.ts – Expected test to have failed")

  // tests taht fail have the error
  let error = new Error()
  let c = new Test("", () => { throw error })
  await c.run()
  assert(c.error === error, "src/test.ts – Expected error to be stored")
}

runTests()
