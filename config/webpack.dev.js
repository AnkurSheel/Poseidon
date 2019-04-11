const merge = require("webpack-merge");
const { baseMainConfig, baseRendererConfig } = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");

let mainConfig = {
    mode: "development",
};

let rendererConfig = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader"],
            },
            {
                test: /\.(tsx?)$/,
                use: [{ loader: "react-hot/webpack" }, { loader: "ts-loader" }],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "../", "dist"),
        filename: "[name].js",
        sourceMapFilename: "[name].map",
        publicPath: "http://localhost:3000/assets/",
    },
    devServer: {
        inline: true,
        hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = [merge.smart(mainConfig, baseMainConfig), merge.smart(rendererConfig, baseRendererConfig)];
