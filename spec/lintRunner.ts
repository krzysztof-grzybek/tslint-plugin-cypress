import { Configuration, Linter } from 'tslint';

export const helper = () => {
    const configurationFilename = 'spec/tslint.json';
    const program = Linter.createProgram('spec/tsconfig.json');
    const linter = new Linter({fix: false}, program);

    const files = Linter.getFileNames(program);
    files.forEach((file) => {
        const fileContents = program.getSourceFile(file).getFullText();
        const configuration = Configuration.findConfiguration(configurationFilename, file).results;
        linter.lint(file, fileContents, configuration);
    });
    return linter.getResult();
};
