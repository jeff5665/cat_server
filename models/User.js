/**
 * User: jeff.zhang
 * Date: 13-6-7
 * Time: 下午3:48
 */

var Db= require('./db');

function User(user){
    this.user_id=user.user_id;
    this.user_name=user.user_name;
    this.user_psw=user.user_psw;
}



User.prototype={

};

User.get=function(username,callback){
        var user={
            user_id:this.user_id,
            user_name:this.user_name,
            user_psw:this.user_psw
        };

        Db.query("SELECT * FROM user WHERE user_name= ?",username, function(err, results) {
            if (err) throw err;
            if(results.length>0){//帐号存在
                callback(err,new User(results[0]));
            }else{//用户不存在
                callback(err,null);
            }
        });
};

module.exports = User;