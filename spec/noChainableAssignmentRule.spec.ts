import { helper} from '../spec/lintRunner';
import { Rule } from '../src/noChainableAssignmentRule';

describe('noChainableAssignment rule', () => {
    it(`should throw error at simple assignment`, () => {
        const EXPECTED_FAILURE_START = { line: 7, character: 6 };
        const EXPECTED_FAILURE_END = { line: 7, character: 15 };

        const failure = helper().failures[0];
        const failureStart = failure.getStartPosition().getLineAndCharacter();
        const failureEnd = failure.getEndPosition().getLineAndCharacter();

        expect(failureStart).toEqual(EXPECTED_FAILURE_START);
        expect(failureEnd).toEqual(EXPECTED_FAILURE_END);
        expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
    });
});
