import {getFixedResult, helper} from './lintRunner';
import {Rule} from './noChainableAssignmentRule';

const rule = 'no-chainable-assignment';

describe('myCustomRule test examples [actually a sample rule that disallows debugger statements]', () => {
    it(`testing failure example`, () => {
        const result = helper();
        expect(result.errorCount).toBe(1);
    });
});
