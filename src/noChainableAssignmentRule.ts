import * as Lint from 'tslint';
import * as ts from 'typescript';
import { isVariableDeclaration } from 'tsutils';

export class Rule extends Lint.Rules.TypedRule {
    static FAILURE_STRING = 'Use of debugger statements is forbidden.';
    public static metadata: Lint.IRuleMetadata = {
        ruleName: 'no-chainable-assignment',
        description: 'Requires expressions of type `void` to appear in statement position.',
        optionsDescription: Lint.Utils.dedent`todo`,
        options: {},
        rationale: Lint.Utils.dedent`todo `,
        requiresTypeInfo: true,
        type: 'functionality',
        typescriptOnly: false,
    };

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    }
}

function walk(ctx: Lint.WalkContext<void>, checker: ts.TypeChecker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
        if (isVariableDeclaration(node)) {
            check(node, checker, ctx);
        }
        return ts.forEachChild(node, cb);
    });
}

function check(node: ts.VariableDeclaration, checker: ts.TypeChecker, ctx: Lint.WalkContext<void>) {
    try {
        const type: ts.Type = checker.getTypeAtLocation(node.initializer);
        const escapedName = type.getSymbol().getEscapedName();
        if (escapedName === 'Chainable') {
            ctx.addFailureAtNode(
                node,
                'Cannot assign Chainable type to variable.'
            );
        }
    } catch(e) {
        // do nothing
    }

}
