const path = require('path');

module.exports = (baseConfig, configType, config) => {

    // add alias
    config.resolve.alias['vue-event-manager'] = path.resolve(__dirname, '../src')

    return config;
};