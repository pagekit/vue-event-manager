/* eslint-env node */

const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const {uglify} = require('rollup-plugin-uglify');
const {name, version, homepage} = require('./package.json');
const license =
    '/*!\n' +
    ' * ' + name + ' v' + version + '\n' +
    ' * ' + homepage + '\n' +
    ' * Released under the MIT License.\n' +
    ' */\n';

module.exports = [

    {
        file: `dist/${name}.js`,
        name: 'VueEventManager',
        format: 'umd'
    },
    {
        file: `dist/${name}.min.js`,
        name: 'VueEventManager',
        format: 'umd',
        plugins: [uglify({output: {preamble: license}})]
    },
    {
        file: `dist/${name}.esm.js`,
        format: 'es',
    },
    {
        file: `dist/${name}.common.js`,
        format: 'cjs',
    }

].map(output => ({

    input: 'src/index.js',
    output: {banner: license, ...output},
    plugins: [
        babel(),
        replace({__VERSION__: version})
    ].concat(output.plugins)

}));
