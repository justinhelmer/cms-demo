var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Category = new keystone.List('category');
 
Category.add({
  name: { type: Types.Text, initial: true, required: true, index: true },
  taxonomy: { type: Types.Relationship, ref: 'taxonomy' }
});
 
Category.register();