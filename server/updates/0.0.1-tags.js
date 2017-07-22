const keystone = require('keystone');
const Taxonomy = keystone.list('taxonomy');
const Types = keystone.Field.Types;

module.exports = done => {
  new Taxonomy.model({
    name: 'Tags'
  }).save((err, result) => {
    if (!err) {
      ['photo', 'video'].forEach(list => keystone.list(list).add({
        tags: { type: Types.Relationship, ref: 'category', filters: { taxonomy: result._id }, many: true }
      }));
    }

    done();
  });
}