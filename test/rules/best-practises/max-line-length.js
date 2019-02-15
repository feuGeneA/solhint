const assert = require('assert')
const { assertErrorMessage, assertNoErrors } = require('./../../common/asserts')
const linter = require('./../../../lib/index')

describe('Linter - max-line-length', () => {
  it('should raise error when line length exceed 120', () => {
    const code = ' '.repeat(121)

    const report = linter.processStr(code, {
      rules: { 'max-line-length': 'error' }
    })
    assert.equal(report.errorCount, 1)
    assertErrorMessage(report, 0, 'Line length must be no more than')
  })

  it('should not raise error when line length exceed 120 and custom config provided', () => {
    const code = ' '.repeat(130)

    const report = linter.processStr(code, {
      rules: { 'max-line-length': ['error', 130] }
    })

    assertNoErrors(report)
  })
})
