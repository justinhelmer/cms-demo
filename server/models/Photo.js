const keystone = require('keystone');
const Types = keystone.Field.Types;
 
const Photo = new keystone.List('photo');
 
Photo.add({
  name: { type: Types.Text, initial: true, required: true, index: true },
  path: { type: Types.Text, initial: true, required: true, nodedit: true }
});
 
Photo.register();