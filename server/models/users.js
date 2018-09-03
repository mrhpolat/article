var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userShchema = new Schema({
    ad:String,
    soyad:String,
    email:String,
    username: {type:String, required:true, unique:true, trim: true},
    password: {type:String, required:true, trim: true},

});

userShchema.statics.authenticate = function(username, password, callback){
    users.findOne({username:username})
        .exec(function(err,users){
            
            if(err){
                return callback(err);
            }else if(!users){
                var err = new Error('User bulunamadi..');
                err.status = 401;
                return callback(err);
            }

            bcrypt.compare(password,users.password, function(err,result){
                
                if(result){
                    return callback(null,users);
                }else{
                    return callback();
                }
            });
         });
}

userShchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var users = mongoose.model('users', userShchema);

module.exports = users;