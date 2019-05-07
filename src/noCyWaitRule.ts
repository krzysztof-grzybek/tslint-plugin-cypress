import * as Lint from 'tslint';
import {
  isCallExpression,
  isTypeAssignableToNumber,
} from 'tsutils';
import * as ts from 'typescript';
import { CHAINABLE_TYPE_NAME } from './config';

export class Rule extends Lint.Rules.TypedRule {
  public static FAILURE_STRING = 'Cy.wait is forbidden.';
  public static metadata: Lint.IRuleMetadata = {
    description: Lint.Utils.dedent`
            Forbids using Cy.wait method.`,
    options: {},
    optionsDescription: '',
    rationale: Lint.Utils.dedent`
            Waiting for arbitrary time periods using \`cy.wait(Number)\` is an anti-pattern.
            In Cypress, you almost never need to use cy.wait() for an arbitrary amount of time.
            If you are finding yourself doing this, there is likely a much better, simpler way.
            Read more here - https://docs.cypress.io/guides/references/best-practices.html#Unnecessary-Waiting
            `,
    requiresTypeInfo: true,
    ruleName: 'no-cy-wait',
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
      check(node, checker, ctx);
    }

    return ts.forEachChild(node, cb);
  });
}

function check(
  node: ts.CallExpression,
  checker: ts.TypeChecker,
  ctx: Lint.WalkContext<void>,
) {
  try {
    if (
      isCyWaitMethodCall(node, checker) &&
      isNumberArgumentPassed(node, checker)
    ) {
      ctx.addFailureAtNode(
        node,
        Rule.FAILURE_STRING,
      );
    }
  } catch (e) {
    // do nothing
  }
}

function isNumberArgumentPassed(node: ts.CallExpression, checker: ts.TypeChecker): boolean {
  const arg = node.arguments[0];
  if (!arg) {
    return false;
  }

  const argType: ts.Type = checker.getTypeAtLocation(arg);
  return isTypeAssignableToNumber(checker, argType);
}

function isCyWaitMethodCall(node: ts.CallExpression, checker: ts.TypeChecker): boolean {
  if (!isPropertyAccessExpression(node.expression)) {
    return false;
  }

  const objType: ts.Type = checker.getTypeAtLocation(node.expression.expression);
  const objTypeSymbol = objType.getSymbol();
  const objTypeName = objTypeSymbol.getEscapedName();

  return objTypeName === CHAINABLE_TYPE_NAME && node.expression.name.text === 'wait';
}

function isPropertyAccessExpression(node: ts.Node): node is ts.PropertyAccessExpression {
  return node.kind === ts.SyntaxKind.PropertyAccessExpression;
}
