interface Chainable<Subject = any> {
    and: string
}
const b: Chainable<string> = null;
const a = b;