// webpack config
var webpack = require('webpack');

var ProvidePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
})

var DefinePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
})

var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common.js')

module.exports = {

  context: __dirname + '/app',

  entry: {
    javascript: './index.js',
    html: './index.html',
  },

  output: {
    filename: 'index.js',
    path: __dirname + '/dist',
  },

  plugins: [
    DefinePlugin,
    ProvidePlugin,
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(gif|svg|mp4|mov|m4a|vtt)$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ],
  },

  postcss: function () {
    return [
      require('autoprefixer'),
      require('precss'),
      require('postcss-simple-vars'),
      require('postcss-color-function'),
      require('postcss-math'),
    ];
  }
}
