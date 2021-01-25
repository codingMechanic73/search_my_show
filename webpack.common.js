module.exports = {
    // this is the entry point for the script
    entry: {
        main: './src/js/index.js',
    },

    // during the parsing of html if it encounters svg, png, jpg, gif it will call the file loader
    module: {
        rules: [{
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "assets",
                        publicPath: 'assets',
                    }
                }
            }
        ]
    }


};