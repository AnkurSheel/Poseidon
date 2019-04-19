console.log("Environment: " + process.env.ENVIRONMENT);
if (process.env.ENVIRONMENT === "production") {
    module.exports = require("./webpack.prod.js");
} else {
    module.exports = require("./webpack.dev.js");
}
