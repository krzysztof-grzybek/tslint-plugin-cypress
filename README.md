# tslint-plugin-cypress

In development...

Set of tslint rules for testing with [cypress.io](https://www.cypress.io/).

## How to use?

Prerequisites:

Typescript installed and setup.

Install package:
```
npm i -D tslint-plugin-cypress
```

Then add these to your `tslint.json` file.
```
{
  "rulesDirectory": ["node_modules/tslint-plugin-cypress/rules"],
  "rules": {
    "no-chainable-assignment": true,
    "no-chainable-arguments": true,
  }
}
```

# Rules

Main purpose of this package is to prevent working with return values of Cypress commands.

From [cypress.io](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values):

***
You cannot assign or work with the return values of any Cypress command. Commands are enqueued and run asynchronously.
***

There are only 2 rules:

### no-chainable-assignment
Prevents assignment return values of Cypress commands (type `Chainable`) to variables. Includes variable declaration, assignment to existing variable, object property assignment and array literal expressions.

### no-chainable-arguments
Prevents passing return values of Cypress commands (type `Chainable`) to function arguments.
