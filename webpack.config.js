const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const conf = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
            publicPath: 'dist'
        },
        devServer: {
            overlay: true
        },
        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },  {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                publicPath: '../'
                            }
                        }
                        'css-loader'
                    ]
                }
            ]
        },


        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                filename: 'bundle.css'
            })
        ],
    }
;

module.exports = conf;