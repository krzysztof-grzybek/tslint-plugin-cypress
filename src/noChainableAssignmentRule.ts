import * as Lint from 'tslint';
import * as ts from 'typescript';
import {isVariableDeclaration} from 'tsutils';

export class Rule extends Lint.Rules.TypedRule {
    static FAILURE_STRING = 'Use of debugger statements is forbidden.';

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    }
}

function walk(ctx: Lint.WalkContext<void>, checker: ts.TypeChecker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
        if (isVariableDeclaration(node)) {
            check(node, checker);
        }
        return ts.forEachChild(node, cb);
    });
}

function check(node: ts.Node, checker: ts.TypeChecker) {
    const type: ts.Type = checker.getTypeAtLocation(node);
}
