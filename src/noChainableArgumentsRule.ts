import * as Lint from 'tslint';
import {
    isCallExpression,
} from 'tsutils';
import * as ts from 'typescript';
import { CHAINABLE_TYPE_NAME } from './config';

export class Rule extends Lint.Rules.TypedRule {
    public static FAILURE_STRING = 'Passing Chainable as function argument is forbidden.';
    public static metadata: Lint.IRuleMetadata = {
        description: Lint.Utils.dedent`
            Forbids passing values of type "Chainable" to function arguments.`,
        options: {},
        optionsDescription: '',
        rationale: Lint.Utils.dedent`
            Passing values of type "Chainable" (e.g. \`cy.get()\`) might be misleading and
            probably won't work as expected.
            Read more here - https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values
            `,
        requiresTypeInfo: true,
        ruleName: 'no-chainable-argument',
        type: 'functionality',
        typescriptOnly: false,
    };

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    }
}

function walk(ctx: Lint.WalkContext<void>, checker: ts.TypeChecker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
        if (isCallExpression(node)) {
            node.arguments.forEach((argNode) => {
                check(argNode, checker, ctx);
            });
        }
        return ts.forEachChild(node, cb);
    });
}

function check(
    node: ts.Node,
    checker: ts.TypeChecker,
    ctx: Lint.WalkContext<void>,
) {
    try {
        const type: ts.Type = checker.getTypeAtLocation(node);
        const escapedName = type.getSymbol().getEscapedName();
        if (escapedName === CHAINABLE_TYPE_NAME) {
            ctx.addFailureAtNode(
                node,
                Rule.FAILURE_STRING,
            );
        }
    } catch (e) {
        // do nothing
    }
}
