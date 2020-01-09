const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack')
const { version } = require('./package.json');

const latestVersionStr = JSON.stringify({
  version,
  src: `${process.env.SELF_URL}/web-sdk-${version}.js`
}, null, 4)

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `web-sdk-${version}.js`,
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
        }),
        new CreateFileWebpack({
            path: path.resolve(__dirname, 'dist'),
            fileName: 'version.json',
            content: latestVersionStr
        })
    ]
};
