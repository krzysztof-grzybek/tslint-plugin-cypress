import { helper} from '../spec/lintRunner';
import { Rule } from '../src/noChainableAssignmentRule';

describe('noChainableAssignment rule', () => {
    it(`should throw error at variable assignment`, () => {
        const EXPECTED_FAILURE_START = { line: 7, character: 6 };
        const EXPECTED_FAILURE_END = { line: 7, character: 15 };

        const failure = helper().failures[0];
        const failureStart = failure.getStartPosition().getLineAndCharacter();
        const failureEnd = failure.getEndPosition().getLineAndCharacter();

        expect(failureStart).toEqual(EXPECTED_FAILURE_START);
        expect(failureEnd).toEqual(EXPECTED_FAILURE_END);
        expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
    });

    it(`should throw error at property assignment`, () => {
        const EXPECTED_FAILURE_START = { line: 17, character: 4 };
        const EXPECTED_FAILURE_END = { line: 17, character: 12 };

        const failure = helper().failures[1];
        const failureStart = failure.getStartPosition().getLineAndCharacter();
        const failureEnd = failure.getEndPosition().getLineAndCharacter();

        expect(failureStart).toEqual(EXPECTED_FAILURE_START);
        expect(failureEnd).toEqual(EXPECTED_FAILURE_END);
        expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
    });

    it(`should throw error at binary expression`, () => {
        const EXPECTED_FAILURE_START = { line: 26, character: 0 };
        const EXPECTED_FAILURE_END = { line: 26, character: 11 };

        const failure = helper().failures[2];
        const failureStart = failure.getStartPosition().getLineAndCharacter();
        const failureEnd = failure.getEndPosition().getLineAndCharacter();

        expect(failureStart).toEqual(EXPECTED_FAILURE_START);
        expect(failureEnd).toEqual(EXPECTED_FAILURE_END);
        expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
    });

    it(`should throw error at array literal expression`, () => {
        const EXPECTED_FAILURE_START = { line: 34, character: 10 };
        const EXPECTED_FAILURE_END = { line: 37, character: 1 };

        const failure = helper().failures[3];
        const failureStart = failure.getStartPosition().getLineAndCharacter();
        const failureEnd = failure.getEndPosition().getLineAndCharacter();

        expect(failureStart).toEqual(EXPECTED_FAILURE_START);
        expect(failureEnd).toEqual(EXPECTED_FAILURE_END);
        expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
    });
});
