var MobileDetect = require('mobile-detect');

module.exports = app => {
  app.use(function(req, res, next) {
    const md = new MobileDetect(req.headers['user-agent']);
    const sourceUA = req.headers['x-user-agent']; // store.js sets x-user-agent so SSR API calls can know the original UA for the app
    req.locals = {};

    if (sourceUA === 'tablet' || md.tablet()) {
      req.locals.userAgent = 'tablet';
      req.locals.tablet = true;
    } else if (sourceUA === 'mobile' || md.mobile()) {
      req.locals.userAgent = 'mobile';
      req.locals.mobile = true;
    } else {
      req.locals.userAgent = 'desktop';
      req.locals.desktop = true;
    }

    next();
  });

  require('./static')(app);
  require('./api')(app);
  require('./app')(app);
}
