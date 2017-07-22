const keystone = require('keystone');
const Types = keystone.Field.Types;
 
const Taxonomy = new keystone.List('taxonomy');
 
Taxonomy.add({
  name: { type: Types.Text, initial: true, required: true, index: true }
});
 
Taxonomy.register();