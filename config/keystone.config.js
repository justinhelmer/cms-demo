const path = require('path');
const config = require('../config');

module.exports = {
  'name': config.title,
  'favicon': '../public/logo-48.png',
  'mongo': 'mongodb://localhost:27017/demo',
  'updates': path.resolve(__dirname, '../server/updates'),
  'auto update': true,

  'session': true,
  'auth': true,
  'user model': 'user',
  'cookie secret': '24634sdfhsdfgh346y34'
};