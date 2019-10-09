const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const conf;
{
  entry: 'src/script.js',
    output;
:
  {
    path: path.resolve(__dirname, 'dist'),
      filename;
  :
    'main.js',
      publicPath;
  :
    'dist';
  }
,
  devServer:{
    overlay: true;
  }
,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      }
    ];
  }
,

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: 'dist/bundle.css'
    })
  ],
}
;

module.exports = conf;