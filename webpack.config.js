/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require("path");
const chalk = require('chalk');

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

const isProd = process.env.NODE_ENV === "production";
const cssDev = ['style-loader', 'css-loader', postcss, 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: ['css-loader', postcss, 'sass-loader'],
              });


module.exports = {
  entry: './public/javascript/main.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "public", "dist"),
    filename: 'bundle.js',
    publicPath: "http://localhost:8080/public/dist"
  },
  module: {
    rules: [
      {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
      },
      {
        test: /\.(s+(a|c)ss|css)$/,
        use: isProd ? cssProd : cssDev
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=images/[hash:6].[ext]'
      }
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    open: false,
    overlay: true,
    port: 8080,
    hot: false,
    inline: true
  },
  plugins: [
    new ExtractTextPlugin({
       filename: 'style.css',
       allChunks: true,
       disable: !isProd
     }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin()
  ]
};

if (isProd) {
  console.log(chalk.bold("\n\n\t PRODUCTION\n\n"));
} else {
  console.log(chalk.bold("\n\n\t DEVELOPMENT\n\n"));
}

process.noDeprecation = true;

/*

https://webpack.github.io/docs/webpack-dev-server.html#combining-with-an-existing-server

*/
