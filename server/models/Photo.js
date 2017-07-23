const keystone = require('keystone');
const Types = keystone.Field.Types;
 
const Photo = new keystone.List('photo');
 
Photo.add({
  name: { type: Types.Text, initial: true, required: true, index: true },
  path: { type: Types.Text, initial: true, required: true, nodedit: true },
  thumbnails: { type: Types.Text, nodedit: true }
});

Photo.schema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.thumbnails = ret.thumbnails.split(',');
    return ret;
  }
});

Photo.register();