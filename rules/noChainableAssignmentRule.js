"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    };
    Rule.FAILURE_STRING = 'Use of debugger statements is forbidden.';
    Rule.metadata = {
        description: 'Requires expressions of type `void` to appear in statement position.',
        options: {},
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["todo"], ["todo"]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["todo "], ["todo "]))),
        requiresTypeInfo: true,
        ruleName: 'no-chainable-assignment',
        type: 'functionality',
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, checker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isVariableDeclaration(node)) {
            check(node, checker, ctx);
        }
        return ts.forEachChild(node, cb);
    });
}
function check(node, checker, ctx) {
    try {
        var type = checker.getTypeAtLocation(node.initializer);
        var escapedName = type.getSymbol().getEscapedName();
        if (escapedName === 'Chainable') {
            ctx.addFailureAtNode(node, 'Cannot assign Chainable type to variable.');
        }
    }
    catch (e) {
        // do nothing
    }
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=noChainableAssignmentRule.js.map