var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Photo = new keystone.List('photo');
 
Photo.add({
  name: { type: Types.Text, initial: true, required: true, index: true },
  path: { type: Types.Text, initial: true, required: true, nodedit: true },
  tags: { type: Types.Relationship, ref: 'category', filters: { taxonomy: '59725f6c9eea4209d251d99b' }, many: true }
});
 
Photo.register();