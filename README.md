# tslint-plugin-cypress

[![Build Status](https://travis-ci.org/krzysztof-grzybek/tslint-plugin-cypress.svg?branch=master)](https://travis-ci.org/krzysztof-grzybek/tslint-plugin-cypress)

Set of tslint rules for testing with [cypress.io](https://www.cypress.io/).

# Motivation

Main purpose of this package is to prevent working with return values of Cypress commands.

From [cypress.io](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values):

> You cannot assign or work with the return values of any Cypress command. Commands are enqueued and run asynchronously.

## How to use?

Typescript and tslint has to be installed and setup.

```
npm i -D tslint-plugin-cypress
```

Then add these to your `tslint.json` file.
```
{
  "extends": "tslint-plugin-cypress"
}
```

Run

```
./node_modules/.bin/tslint -c tslint.json -p . cypress/**/*.ts -t stylish
```

If you have troubles with setup, Look at example repo [here](https://github.com/krzysztof-grzybek/tslint-plugin-cypress-example).

Note: Unfortunately, VS code [doesn't support](https://github.com/Microsoft/vscode-tslint/blob/master/tslint/README.md#faq) plugins which requires type information.

# Rules

### no-chainable-assignment
Prevents assignment return values of Cypress commands (type `Chainable`) to variables. Includes variable declaration, assignment to existing variable, object property assignment and array literal expressions.

### no-chainable-arguments
Prevents passing return values of Cypress commands (type `Chainable`) to function arguments.
