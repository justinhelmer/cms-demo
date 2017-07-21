const keystone = require('keystone');

module.exports = app => {
  app.get('/api/*', (req, res) => {
    const List = keystone.list(req.params[0]);
    List.model
      .find()
      .exec((err, items) => {
        if (err) {
          console.error(err);
          res.status(500).send(err).end();
        } else {
          console.log('ITEMS:', items);
          res.send(items).end();
        }
      });
  });
}