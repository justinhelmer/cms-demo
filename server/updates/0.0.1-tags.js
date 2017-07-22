const keystone = require('keystone');
const Taxonomy = keystone.list('taxonomy');

module.exports = done => {
  new Taxonomy.model({
    name: 'Tags'
  }).save(done);
}