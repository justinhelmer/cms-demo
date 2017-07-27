const keystone = require('keystone');

module.exports = app => {
  app.get('/api/:endpoint/:id?', (req, res) => {
    const List = keystone.list(req.params.endpoint);
    let query;

    if (req.params.id) {
      query = List.model.findById(req.params.id);
    } else {
      query = List.paginate({
        page: req.query.page || 1,
        perPage: 28,
        maxPages: 15
      });
    }

    query.exec((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err).end();
      } else {
        res.send(result).end();
      }
    });
  });
}