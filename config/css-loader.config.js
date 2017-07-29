const _ = require('lodash');
const clone = require('lodash.clonedeep');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const productionLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: true,
      includePaths: [
        path.resolve(__dirname, '../node_modules')
      ]
    }
  },
  { loader: 'postcss-loader' },
  { loader: 'sass-loader' }
];

let devLoaders = [{ loader: 'vue-style-loader' }].concat(clone(productionLoaders));
devLoaders.forEach(loader => _.set(loader, 'options.sourceMap', true));

module.exports = {
  test: /\.(css|scss)$/,
  use: isProd
    ? ExtractTextPlugin.extract({
      use: productionLoaders,
      fallback: 'vue-style-loader'
    })
    : devLoaders
};