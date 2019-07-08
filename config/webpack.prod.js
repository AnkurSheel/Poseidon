const merge = require('webpack-merge');
const { baseMainConfig, baseRendererConfig } = require('./webpack.common.js');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

let mainConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
};

let rendererConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new CspHtmlWebpackPlugin(
            {
                // 'base-uri': "'self'",
                'default-src': "'none'",
                // 'object-src': "'none'",
                // 'script-src': "'self'",
                // 'style-src': "'self'",
                // 'connect-src': "'self' http://localhost:3000",
            },
            {
                enabled: true,
                hashingMethod: 'sha256',
                hashEnabled: {
                    'script-src': true,
                    'style-src': true,
                },
                nonceEnabled: {
                    'script-src': true,
                    'style-src': true,
                },
            }
        ),
    ],
};

module.exports = [merge.smart(mainConfig, baseMainConfig), merge.smart(rendererConfig, baseRendererConfig)];
