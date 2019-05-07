import { helper } from '../spec/lintRunner';
import { Rule } from '../src/noCyWaitRule';

describe('noCyWait rule', () => {
  it('should throw error at cy.wait(Number)', () => {
    const EXPECTED_FAILURE_START = { line: 60, character: 0 };
    const EXPECTED_FAILURE_END = { line: 60, character: 19 };

    const failure = helper().failures[5];
    const failureStart = failure.getStartPosition().getLineAndCharacter();
    const failureEnd = failure.getEndPosition().getLineAndCharacter();

    expect(failureStart).toEqual(EXPECTED_FAILURE_START);
    expect(failureEnd).toEqual(EXPECTED_FAILURE_END);
    expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
  });

  it('should throw error at cy.wait(LiteralNumber)', () => {
    const EXPECTED_FAILURE_START = { line: 61, character: 0 };
    const EXPECTED_FAILURE_END = { line: 61, character: 16 };

    const failure = helper().failures[6];
    const failureStart = failure.getStartPosition().getLineAndCharacter();
    const failureEnd = failure.getEndPosition().getLineAndCharacter();

    expect(failureStart).toEqual(EXPECTED_FAILURE_START);
    expect(failureEnd).toEqual(EXPECTED_FAILURE_END);
    expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
  });
});
