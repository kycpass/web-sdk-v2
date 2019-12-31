const webpack = require('webpack');
const path = require('path');
var dotenv = require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
        library:'entify',
        libraryExport: 'default'
    },
    plugins: [
        new webpack.DefinePlugin({
            "ENFY_VERISON": JSON.stringify(require("./package.json").version),
            "FRAME_URL": JSON.stringify(process.env.FRAME_URL)
        }),
        new HtmlWebpackPlugin({
          template: './example/index.html'
        })
    ]
};
