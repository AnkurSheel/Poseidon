const merge = require("webpack-merge");
const { baseMainConfig, baseRendererConfig } = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let mainConfig = {
    mode: "production",
};

let rendererConfig = {
    mode: "production",
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
            filename: "[name].css",
            chunkFileName: "[id].css",
        }),
    ],
};

module.exports = [
    merge.smart(mainConfig, baseMainConfig),
    merge.smart(rendererConfig, baseRendererConfig),
];
