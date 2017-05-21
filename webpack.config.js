/* eslint-disable no-unused-vars */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require("path");

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

const css = ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: ['css-loader', postcss, 'sass-loader'],
              });


module.exports = {
  entry: './public/javascript/main.js',
  output: {
    // path: path.resolve(__dirname, "public", "dist"),
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
        use: ['style-loader', 'css-loader', postcss, 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=images/[hash:6].[ext]'
      }
    ]
  },
  devServer: {
    // contentBase: "path.join(__dirname, "dist")",
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
         disable: true
       }),
      // new webpack.HotModuleReplacementPlugin(),
      // new webpack.NamedModulesPlugin()
  ]
};

process.noDeprecation = true;

/*

https://webpack.github.io/docs/webpack-dev-server.html#combining-with-an-existing-server

*/
