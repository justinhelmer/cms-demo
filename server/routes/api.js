const keystone = require('keystone');

module.exports = app => {
  app.get('/api/:endpoint/:id?', (req, res) => {
    const List = keystone.list(req.params.endpoint);
    let query;

    const opts = {
      mobile: {
        perPage: 12,
        maxPages: 5
      },
      tablet: {
        perPage: 24,
        maxPages: 10,
      },
      desktop: {
        perPage: 120,
        maxPages: 15
      }
    };

    if (req.params.id) {
      query = List.model.findById(req.params.id);
    } else {
      query = List.paginate(Object.assign({
        page: req.query.page || 1
      }, opts[req.locals.userAgent]));
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