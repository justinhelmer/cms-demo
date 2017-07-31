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

      if (scrollTop > lastScrollPos) {
        events.trigger('scroll.down', { isBottom: $(window).height() + scrollTop === $wrapper.height() });
      } else if (scrollTop < lastScrollPos) {
        events.trigger('scroll.up', { isTop: scrollTop === 0 });
      }

      lastScrollPos = scrollTop;
    }
  },

  on: (direction, cb) => events.on('scroll.' + direction, cb)
};