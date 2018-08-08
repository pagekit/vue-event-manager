const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = (baseConfig, configType, config) => {

    // remove babel-loader
    config.module.rules.shift();

    // add buble-loader
    config.module.rules.unshift({
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'buble-loader'
    });

    // add alias
    config.resolve.alias['vue-event-manager'] = path.resolve(__dirname, '../src')

    // https://github.com/storybooks/storybook/issues/3267
    config.plugins.push(new VueLoaderPlugin());

    return config;
};