var userx= require('../models/users');

module.exports.index = function(req,res){
    if(!req.session.userId)
        res.render('login');
    else{
        res.redirect('./login/userlist');
      
    }
}

module.exports.loginPost = function(req,res,next){
    if(req.body.user && req.body.password){
        userx.authenticate(req.body.user, req.body.password, function(error, user){
            
            if(error || !user){
               console.log(error);
            }else {
                req.session.userId = user.id;
                req.session.save;
                // res.render('layout', {islogin: 'true'});
                return res.redirect('./login/userlist');
            }
        });

    }
}
        
module.exports.signupGet = function(req,res){
            res.render('signup');
        }

module.exports.signupPost = function(req,res){

    if(req.body.password==req.body.againpassword && req.body.password && req.body.againpassword && req.body.username && req.body.email){
       
        var newUser =  new userx({
            ad: req.body.firstname,
            soyad:req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        
       newUser.save(function(err){
           if(err){
               console.log(err);
           }
           else{
              console.log(newUser);
               
           }
       });
    }
    else{
        console.log('Password alani bos olmamali ve ayni olmali.. !')
    }

    res.render('signup');
}

module.exports.userlist = function(req, res){
    
    userx.find(function(err,result){
       res.render('userlist',{users: result});
    });
}

module.exports.userdelete = function(req,res){
    
    userx.findOneAndRemove({user:req.params.username}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log(req.params.username);
        }
    })
    res.redirect('/login/userlist');
}

module.exports.logout = function(req,res, next){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }else {
                return res.redirect('/');
            }
        });
    }
}
