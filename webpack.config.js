/* eslint-env node */

module.exports = {

    mode: 'production',

    entry: {
        'test/specs': './test/index',
    },

    output: {
        filename: './[name].js'
    },

    resolve: {
        alias: {
            'vue-event-manager': __dirname + '/src'
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }

};
