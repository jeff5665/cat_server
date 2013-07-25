/**
 * User: jeff.zhang
 * Date: 13-6-7
 * Time: 下午4:09
 */
var Db= require('./db');
var Account= require('./Account');
function AccountList(){
}

module.exports = AccountList;

AccountList.get=function(user_id,callback){
    //根据session中的user_id查找account表中的记录
    Db.query("SELECT * FROM account WHERE user_id= ? ORDER BY `pc_group`,`account_id`",user_id, function(err, results) {
        if (err) throw err;
        callback(err,results);
    });

};