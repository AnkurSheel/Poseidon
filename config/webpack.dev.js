const merge = require("webpack-merge");
const { baseMainConfig, baseRendererConfig } = require("./webpack.common.js");

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
        ],
    },
};

module.exports = [merge.smart(mainConfig, baseMainConfig), merge.smart(rendererConfig, baseRendererConfig)];
