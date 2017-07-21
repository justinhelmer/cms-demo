const keystone = require('keystone');
const mongodb = require('mongodb');
const path = require('path');

const config = require('../config');
require('./models');

keystone.init({
  'name': config.title,
  'favicon': '../public/logo-48.png',
  'mongo': 'mongodb://localhost:27017/demo',
  'updates': path.resolve(__dirname, './updates'),
  'auto update': true,

  'session': true,
  'auth': true,
  'user model': 'user',
  'cookie secret': '24634sdfhsdfgh346y34'
});

keystone.set('routes', require('./routes'));
keystone.start();