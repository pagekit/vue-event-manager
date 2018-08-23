/* eslint-env node */

const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-js');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const {version} = require('../package.json');
const banner =
    '/*!\n' +
    ' * vue-event-manager v' + version + '\n' +
    ' * https://github.com/pagekit/vue-event-manager\n' +
    ' * Released under the MIT License.\n' +
    ' */\n';

rollup.rollup({
    input: 'src/index.js',
    plugins: [buble(), replace({__VERSION__: version})]
})
.then(bundle =>
  bundle.generate({
      format: 'umd',
      banner: banner,
      name: 'VueEventManager'
  }).then(({code}) => write('dist/vue-event-manager.js', code, bundle))
)
.then(bundle =>
  write('dist/vue-event-manager.min.js', banner + '\n' +
    uglify.minify(read('dist/vue-event-manager.js')).code,
  bundle)
)
.then(bundle =>
  bundle.generate({
      format: 'es',
      banner: banner
  }).then(({code}) => write('dist/vue-event-manager.esm.js', code, bundle))
)
.then(bundle =>
  bundle.generate({
      format: 'cjs',
      banner: banner
  }).then(({code}) => write('dist/vue-event-manager.common.js', code, bundle))
)
.catch(logError);

function read(path) {
    return fs.readFileSync(path, 'utf8');
}

function write(dest, code, bundle) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, code, err => {
            if (err) return reject(err);
            console.log(blue(dest) + ' ' + getSize(code));
            resolve(bundle);
        });
    });
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
    console.log(e);
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
