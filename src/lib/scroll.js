const $ = require('jquery');
const events = require('./global-events');

module.exports = {
  init: () => {
    const $wrapper = $(document);
    let didScroll;
    let lastScrollPos = 0;

    $wrapper.on('scroll', () => {
      didScroll = true;
    });

    setInterval(() => {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      const scrollTop = $wrapper.scrollTop();
      const documentHeight = $wrapper.height();

      if (scrollTop > lastScrollPos) {
        events.trigger('scroll.down', {scrollTop, documentHeight});
      } else if (scrollTop < lastScrollPos) {
        events.trigger('scroll.up', {scrollTop, documentHeight});
      }

      lastScrollPos = scrollTop;
    }
  },

  on: (direction, cb) => events.on('scroll.' + direction, cb)
};