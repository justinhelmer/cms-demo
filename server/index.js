const keystone = require('keystone');
require('./models');

keystone.init(require('../config/keystone.config'));
keystone.set('routes', require('./routes'));

keystone.start(() => {
  require('./models/lib/add-tags-field')()
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});