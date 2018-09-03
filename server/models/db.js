var mongoose =require('mongoose');

mongoose.Promise =require('bluebird');

var mongoDB = 'mongodb://127.0.0.1:27017/employee';

mongoose.connect(mongoDB, function (err, db){
    if(err){
        console.log('mongodb hatasi: ' + err);
    }
    else {
        console.log('mongodb baglandı: '+ mongoDB);

    }
}); 