interface Chainable<Subject = any> {
    example: string
}

// 1 should throw err at L8C7-8
const chain: Chainable<string> = null;
const a = 'example string';
const c = chain;
const b = 24;


// 2 should throw err at L17C4-12
const dexample = {
    a: 'testing',
    b: 'example',
};
const eexample = {
    c: chain,
    b: false,
};

// 3 should throw err at L26C0-11
const f: { [keyof: string]: any } = {
    a: 'testing',
    b: 'example',
};
f.c = chain;

// 4 should throw err at L35C10-L37C1
const g = [
    'asdf',
    1,
    2,
];
const h = [
    g,
    chain,
];


// 5 should throw err at L50C16-17

function someFunction(a, b) {
    return false;
}
const i: Chainable<string> = null;
const j = 'example string';
const k = 24;
someFunction(j, k);
someFunction(j, j);
someFunction(k, i);

