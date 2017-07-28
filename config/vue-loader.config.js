const isProd = process.env.NODE_ENV === 'production';
let scss = require('./css-loader.config').use;
scss[1].options.modules = false;

module.exports = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    cssSourceMap: !isProd,
    cssModules: {
      localIdentName: '[path][name]---[local]---[hash:base64:5]'
    },
    extractCSS: isProd,
    preserveWhitespace: !isProd,
    loaders: { scss }
  }
};