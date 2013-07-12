/**
 * User: jeff.zhang
 * Date: 13-6-7
 * Time: 下午3:53
 */

var Db= require('./db');

function Account(account){
        this.account_name=account.account_name;
        this.account_gamename=account.account_gamename;
        this.account_money=account.account_money;
        this.account_food=account.account_food;
        this.account_maxfood=account.account_maxfood;
        this.account_army=account.account_army;
		this.account_trade=account.account_trade;
		this.account_blood=account.account_blood;
		this.account_builded=account.account_builded;
		this.account_resources=account.account_resources;
        this.account_lasttime=account.account_lasttime;
        this.user_id=account.user_id;
}

module.exports = Account;

/**
 * 保存account记录 目前主要用于新增或者更新account
 * @param account
 * @param callback
 */
Account.save=function(account,callback){
        console.log(account);
        var sql;
        sql="SELECT account_id FROM account WHERE account_gamename= ?";
        Db.query(sql,account.account_gamename, function(err, account_idArr) {//查询id
            if (err) throw err;
            console.log(account_idArr);
            if(account_idArr.length>0){//id存在 执行更新数据
                sql="UPDATE  account SET ? WHERE  `account_id` =?; ";
                Db.query(sql,[account,account_idArr[0]['account_id']],function(err,result){
                    console.log(result);
                    if (err) throw err;
                    callback("update success");
                });
            }else{//id 不存在 执行 插入数据
                sql="INSERT INTO account SET ?";
                Db.query(sql,account,function(err,result){
                    if (err) throw err;
                    callback("insert success");
                });
            }
        });
};

/**
 * 更新account 目前主要更新account表中的type
 * @param account
 * @param account_id
 * @param callback
 */
Account.update=function(account,account_id,callback){//更新
    sql="UPDATE  account SET ? WHERE  `account_id` = "+account_id ;

    Db.query(sql,account,function(err,result){
        console.log(result);
        if (err) throw err;
        callback("update success");
    });
};

Account.updateStep=function(account,gamename,callback){
    sql="UPDATE  account SET ? WHERE  `account_gamename` = ?" ;
    Db.query(sql,[account,gamename],function(err,result){
        console.log(result);
        if (err) throw err;
        callback("update step success");
    });
};

Account.getAccountByGameName=function(gameName,callback){
    var sql;
    sql="SELECT * FROM account WHERE account_gamename= ?";
    Db.query(sql,gameName, function(err, result) {//查询id
        if (err) throw err;
        callback(result);
    });
};

