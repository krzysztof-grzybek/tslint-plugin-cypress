import { helper } from '../spec/lintRunner';
import { Rule } from '../src/noChainableArgumentsRule';

describe('noChainableAssignment rule', () => {
    it(`should throw error at argument pass`, () => {
        const EXPECTED_FAILURE_START = { line: 50, character: 16 };
        const EXPECTED_FAILURE_END = { line: 50, character: 17 };

        const failure = helper().failures[4];
        const failureStart = failure.getStartPosition().getLineAndCharacter();
        const failureEnd = failure.getEndPosition().getLineAndCharacter();

        expect(failureStart).toEqual(EXPECTED_FAILURE_START);
        expect(failureEnd).toEqual(EXPECTED_FAILURE_END);
        expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
    });
});
