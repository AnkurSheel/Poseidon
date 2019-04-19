var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
var WebpackNotifierPlugin = require("webpack-notifier");
var fs = require("fs");
const webpack = require("webpack");

const nodeModules = {};
fs.readdirSync("node_modules")
    .filter(x => {
        return [".bin"].indexOf(x) === -1;
    })
    .forEach(mod => {
        nodeModules[mod] = `commonjs ${mod}`;
    });

let rootFolder = path.resolve(__dirname, "../");

const envVars = {
    ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
};

let baseMainConfig = {
    entry: path.resolve(rootFolder, "src/main.tsx"),
    target: "electron-main",
    output: {
        filename: "main.bundle.js",
        path: path.resolve(rootFolder, "dist"),
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "source-map-loader",
                enforce: "pre",
            },
            {
                test: /\.(tsx?)$/,
                loader: "ts-loader",
            },
        ],
    },
    devtool: "source-map",
    plugins: [
        new WebpackNotifierPlugin({ title: "Poseidon" }),
        new webpack.DefinePlugin({
            "process.env": envVars,
        }),
    ],
    externals: [nodeModules],
};

let baseRendererConfig = {
    entry: path.resolve(rootFolder, "src/index.tsx"),
    target: "electron-renderer",
    output: {
        filename: "renderer.bundle.js",
        path: path.resolve(rootFolder, "dist"),
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.(tsx?)$/,
                loader: "ts-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootFolder, "src/index.html"),
        }),
        new webpack.DefinePlugin({
            "process.env": envVars,
        }),
    ],
    devtool: "inline-source-map",
    externals: [nodeModules],
};

module.exports = { baseMainConfig, baseRendererConfig };
