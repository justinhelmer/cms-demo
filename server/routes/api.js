const keystone = require('keystone');

module.exports = app => {
  app.get('/api/*', (req, res) => {
    switch (req.params[0]) {
      case 'users':
        User = keystone.list('User');

        User.model.find()
          .exec(function(err, users) {
            if (err) {
              console.error(err);
              res.status(500).send(err).end();
            } else {
              console.log('USERS:', users);
              res.send(users).end();
            }
          });
      break;
      default:
        res.sendStatus(404).end();
      break;
    }
  });
}