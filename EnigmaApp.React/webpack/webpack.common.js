const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMqpackerPlugin = require('css-mqpacker-webpack-plugin')
const CssnanoPlugin = require('cssnano-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './media/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
        generator: {
          filename: './media/[name][ext]',
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: './js/main.js',
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(), // Clears the dist folder
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'), // Copies index.html to dist folder
    }),
    new MiniCssExtractPlugin({
      filename: './css/main.css',
    }), // Extracts CSS into separate files
  ],
  optimization: {
    minimizer: [
      new CssMqpackerPlugin(), // pack same css media query rules into one using PostCSS
      //new CssnanoPlugin(), // Optimize and minify css file
    ],
  },
  stats: 'errors-only',
}
