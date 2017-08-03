const keystone = require('keystone');
const Types = keystone.Field.Types;
 
const Actor = new keystone.List('actor');
 
Actor.add({
  name: { type: Types.Text, initial: true, required: true, index: true },
  thumbs: { type: Types.Text, nodedit: true }
});

Actor.schema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.thumbs = ret.thumbs.split(',');
    return ret;
  }
});

Actor.register();