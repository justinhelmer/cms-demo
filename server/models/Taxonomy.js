var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Taxonomy = new keystone.List('taxonomy');
 
Taxonomy.add({
  name: { type: Types.Text, initial: true, required: true, index: true }
});
 
Taxonomy.register();