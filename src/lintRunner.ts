import {Configuration, Linter, Replacement} from 'tslint';

export const helper = () => {
    
    const configurationFilename = 'tslint.json';
    const program = Linter.createProgram('src/devtsconfig.json');
    const linter = new Linter({fix: false}, program);

    const files = Linter.getFileNames(program);
    files.forEach(file => {
        const fileContents = program.getSourceFile(file).getFullText();
        const configuration = Configuration.findConfiguration(configurationFilename, file).results;
        linter.lint(file, fileContents, configuration);
    });
    return linter.getResult();
};

export const getFixedResult = ({src, rule}) => {
    const result = helper();
    return Replacement.applyFixes(src, [result.failures[0].getFix()]);
};
