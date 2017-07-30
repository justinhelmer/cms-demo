const _ = require('lodash');
const $ = require('jquery');
const Foundation = require('foundation-sites/js/foundation.core').Foundation;

module.exports = function(options = {}) {
  _.defaults(options, {
    plugins: []
  });

  let init = () => {
    Foundation.addToJquery($);

    require('foundation-sites/js/foundation.util.touch').Touch.init($);
    require('foundation-sites/js/foundation.util.triggers').Triggers.init($, Foundation);

    options.plugins.forEach(plugin => {
      Foundation.plugin(require('foundation-sites/js/foundation.' + _.lowerFirst(plugin))[plugin], plugin);
    });

    $(document).foundation();
  };

  init();

  return Foundation;
};