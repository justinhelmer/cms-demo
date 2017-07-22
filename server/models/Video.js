const keystone = require('keystone');
const Types = keystone.Field.Types;
 
const Video = new keystone.List('video');
 
Video.add({
  name: { type: Types.Text, initial: true, required: true, index: true },
  path: { type: Types.Text, initial: true, required: true, nodedit: true }
});
 
Video.register();