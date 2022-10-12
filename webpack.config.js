require('dotenv').config();
var path = require('path');

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "/client/src/index.jsx"),
    output: {
        path: path.join(__dirname, '/client/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /nodeModules/,
              use: {
                loader: "babel-loader",
              },
            }
        ]
    },
    devtool: 'source-map'
};