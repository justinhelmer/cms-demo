// global mixins - https://github.com/postcss/postcss-mixins

module.exports = {
  font: function (mixin, fontSize) {
    return {
      '&': {
        'font-size': fontSize,
        'line-height': '1.4'
      }
    };
  }
};