const path = require('path');
const {
    default: merge
} = require('webpack-merge');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// merge is used to merge different webpack config files
module.exports = merge(common, {
    //change the mode to production
    mode: 'production',

    // set the output directory to dist
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name]-[contenthash]-bundle.js",
    },

    //using optimizers to optimize css and html files
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWithWhitespace: true,
                    removeComments: true
                }
            })
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css'
        }),
        new CleanWebpackPlugin()
    ],

    // reads the sass files, converts them to css files and then optimises them
    module: {
        rules: [{
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }]
    },
})