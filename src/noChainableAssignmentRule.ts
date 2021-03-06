import * as Lint from 'tslint';
import {
    isArrayLiteralExpression,
    isBinaryExpression,
    isPropertyAssignment,
    isVariableDeclaration,
} from 'tsutils';
import * as ts from 'typescript';
import { CHAINABLE_TYPE_NAME } from './config';

export class Rule extends Lint.Rules.TypedRule {
    public static FAILURE_STRING = 'Assignment Chainable to variable is forbidden.';
    public static metadata: Lint.IRuleMetadata = {
        description: Lint.Utils.dedent`
            Forbids assignment values of type "Chainable" to variables.`,
        options: {},
        optionsDescription: '',
        rationale: Lint.Utils.dedent`
            Assignment values of type "Chainable" (e.g. \`cy.get()\`) might be misleading and
            probably won't work as expected.
            Read more here - https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values
            `,
        requiresTypeInfo: true,
        ruleName: 'no-chainable-assignment',
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
            check(node, node.initializer, checker, ctx);
        } else if (isPropertyAssignment(node)) {
            check(node, node.initializer, checker, ctx);
        } else if (isBinaryExpression(node) && isEqualsToken(node.operatorToken)) {
            check(node, node.right, checker, ctx);
        } else if (isArrayLiteralExpression(node)) {
            node.elements.forEach((el: ts.Node) => {
                check(node, el, checker, ctx);
            });
        }
        return ts.forEachChild(node, cb);
    });
}

function check(
    node: ts.VariableDeclaration | ts.PropertyAssignment | ts.BinaryExpression | ts.ArrayLiteralExpression,
    value: ts.Node,
    checker: ts.TypeChecker,
    ctx: Lint.WalkContext<void>,
) {
    try {
        const type: ts.Type = checker.getTypeAtLocation(value);
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

function isEqualsToken(token: ts.Token<any>): token is ts.Token<ts.SyntaxKind.EqualsToken> {
    return token.kind === 58;
}
