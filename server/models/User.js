var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var User = new keystone.List('user');
 
User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  password: { type: Types.Password, initial: true },
  canAccessKeystone: { type: Boolean, initial: true }
});
 
User.register();