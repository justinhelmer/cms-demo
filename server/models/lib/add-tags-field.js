const keystone = require('keystone');
const Taxonomy = keystone.list('taxonomy');
const Types = keystone.Field.Types;

const lists = ['photo', 'video'];

module.exports = () => {
  return Taxonomy.model
    .findOne({ name: 'Tags' })
    .exec()
    .then(result => {
      lists.forEach(list => {
        keystone.list(list).add({
          tags: { type: Types.Relationship, ref: 'category', filter: { taxonomy: result._id }, many: true }
        });
      });
    });
}