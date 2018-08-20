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
var config_1 = require("./config");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    };
    Rule.FAILURE_STRING = 'Passing Chainable as function argument is forbidden.';
    Rule.metadata = {
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            Forbids passing values of type \"Chainable\" to function arguments."], ["\n            Forbids passing values of type \"Chainable\" to function arguments."]))),
        options: {},
        optionsDescription: '',
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            Passing values of type \"Chainable\" (e.g. `cy.get()`) might be misleading and\n            probably won't work as expected.\n            Read more here - https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values\n            "], ["\n            Passing values of type \"Chainable\" (e.g. \\`cy.get()\\`) might be misleading and\n            probably won't work as expected.\n            Read more here - https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values\n            "]))),
        requiresTypeInfo: true,
        ruleName: 'no-chainable-argument',
        type: 'functionality',
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, checker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isCallExpression(node)) {
            node.arguments.forEach(function (argNode) {
                check(argNode, checker, ctx);
            });
        }
        return ts.forEachChild(node, cb);
    });
}
function check(node, checker, ctx) {
    try {
        var type = checker.getTypeAtLocation(node);
        var escapedName = type.getSymbol().getEscapedName();
        if (escapedName === config_1.CHAINABLE_TYPE_NAME) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
    }
    catch (e) {
        // do nothing
    }
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=noChainableArgumentsRule.js.map