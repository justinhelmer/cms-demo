const keystone = require('keystone');
const Types = keystone.Field.Types;
 
const Video = new keystone.List('video');
 
Video.add({
  name: { type: Types.Text, initial: true, required: true, index: true },
  path: { type: Types.Text, initial: true, required: true, nodedit: true },
  thumbs: { type: Types.Text, nodedit: true },
  screens: { type: Types.Text, nodedit: true }
});

Video.schema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.thumbs = ret.thumbs.split(',');
    ret.screens = ret.screens.split(',');
    return ret;
  }
});

Video.register();