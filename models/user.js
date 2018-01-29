var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  }
});

UserSchema.pre('save',function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model('User', UserSchema);

UserSchema.statics.authenticate = function(email,password,callback) {
  User.findOne({email:email}, function(err, user) {
    if(err)
      return callback(err);
    if(!user)
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    bcrypt.compare(password, user.password, function(err, result){
      if(result === true)
        return callback(null, user);
      var err = new Error('Wrong password!');
      err.status = 401;
      return callback();
    });
  });
}
module.exports = User;