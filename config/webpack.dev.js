const merge = require('webpack-merge');
const { baseMainConfig, baseRendererConfig } = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

let mainConfig = {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
};

let rendererConfig = {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../', 'dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        publicPath: 'http://localhost:3000/assets/',
    },
    devServer: {
        inline: true,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CspHtmlWebpackPlugin(
            {
                // 'base-uri': "'self'",
                'default-src': "'none'",
                // 'object-src': "'none'",
                // 'script-src': "'self'",
                // 'style-src': "'self'",
                'connect-src': "'self' http://localhost:3000",
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
