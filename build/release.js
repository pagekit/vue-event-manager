/* eslint-env node */

const replace = require('replace-in-file');
const version = process.argv[2];

replace({
    files: 'package.json',
    from: /("version"\s*:\s*")\d+\.\d+\.\d+("\s*,)/g,
    to: '$1' + version + '$2'
});

replace({
    files: 'README.md',
    from: /(\/|@)\d+\.\d+\.\d+/g,
    to: '$1' + version
});
