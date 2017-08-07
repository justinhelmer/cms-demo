const $ = require('jquery');
const Foundation = require('foundation-sites/js/foundation.core').Foundation;

module.exports = function(options = {}) {
  (options.plugins || []).forEach(plugin => {
    Foundation.plugin(require('foundation-sites/js/foundation.' + plugin.toLowerCase())[plugin], plugin);
  });
};