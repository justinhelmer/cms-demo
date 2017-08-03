const _ = require('lodash');
const compression = require('compression');
const express = require('express');
const path = require('path');
const config = require('../../config');

const isProd = process.env.NODE_ENV === 'production';
const serve = (relativePath, cache) => express.static(path.resolve(__dirname, relativePath), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

module.exports = app => {
  app.use(compression({ threshold: 0 }));
  app.use('/dist', serve('../../dist', true));
  app.use('/public', serve('../../public', true));
  app.use(config.screensPath, serve(config.screensPath, true));
  app.use(config.thumbsPath, serve(config.thumbsPath, true));

  Object.keys(config.assetPaths).forEach(list => {
    let assetPaths = config.assetPaths[list];
    if (!_.isArray(assetPaths)) {
      assetPaths = [assetPaths];
    }

    assetPaths.forEach(assetPath => {
      app.use(assetPath, serve(assetPath, true));
    });
  });
}