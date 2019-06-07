const merge = require('webpack-merge');
const { baseMainConfig, baseRendererConfig } = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

let mainConfig = {
    mode: 'production',
};

let rendererConfig = {
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{ loader: MiniCssExtractPlugin.loader }],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFileName: '[id].css',
        }),
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
