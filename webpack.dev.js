const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {
    default: merge
} = require('webpack-merge');
const common = require('./webpack.common')

// merge common config with dev config
module.exports = merge(common, {

    // change the mode to development
    mode: "development",

    // make dist as the directory
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },

    // make index.js as the template
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }, )
    ],

    //whenever scss files are encountered, convert them to css and inject it to DOM using style loader
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", //3. Inject styles into DOM
                "css-loader", //2. Turns css into commonjs
                "sass-loader" //1. Turns sass into css
            ]
        }]
    }
});