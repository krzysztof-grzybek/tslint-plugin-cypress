interface Chainable<Subject = any> {
    example: string
}

// should throw err in L8C7-8
const chain: Chainable<string> = null;
const a = 'example string';
const c = chain;
const b = 24;
