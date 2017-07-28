// Currently, vue-loader only supports postcss.config.js in the project root

module.exports = ({ file, options, env }) => ({
  parser: false,
  plugins: {
    'postcss-icss-values': {},
    'postcss-cssnext': {},
    'postcss-mixins': { mixins: require('./src/css/global/mixins') },
    'cssnano': env === 'production' ? {} : false
  }
});