/*
 * GET home page.
 */
var User= require('../models/User');
var Account= require('../models/Account');
var AccountList= require('../models/AccountList');

function needNotLogin(req,res,next){
    if(req.session.user){
        req.flash('error','已登录');
        return res.redirect('/');
    }
    next();
}

function needLogin(req,res,next){
    console.log(req.session['user_id']);
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}

/**
 * 获取客户端IP
 * @param req
 * @returns {*}
 */
function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};

module.exports = function(app){
    app.get('/login',needNotLogin);
    app.get('/login', function(req,res){//用户登录页
        res.render('login', {
            title: '登录',
            msg:req.flash('msg').toString()
        });
    });

    app.post('/login',needNotLogin);
    app.post('/login',function(req,res){//登录页
        if(req.body.username===''){
            req.flash('msg','请输入用户名');
            res.redirect('/login');
            return ;
        }

        User.get(req.body.username,function(err,user){
            if(!user){
                req.flash('msg', '用户不存在');
                return res.redirect('/login');
            }

            if(req.body.psw != user.user_psw){
                req.flash('msg', '密码错误');
                return res.redirect('/login');
            }
            req.session.user=user;
            res.redirect('/');
        });
    });


    app.get('/',needLogin);
    app.get('/', function(req,res){//account列表页
        AccountList.get(req.session.user.user_id,function(err, results){
            if (err) throw err;
            res.render('index', {
                title: 'Express' ,
                user_name:req.session.user.user_name,
                accountList:results,
                accountList_str:JSON.stringify(results[0])
            });
        });
    });


    app.post('/update',function(req,res){//更新account  主要用于更新account中的type
        var account={type:req.body.type};
        Account.update(account,req.body.id,function(msg){
            res.json({msg:msg});
        });
    });

    app.post('/update/group',function(req,res){ //更新pc_group 主要用户更新account中的pc_group
        var account={pc_group:req.body.pc_group};
        Account.update(account,req.body.id,function(msg){
            res.json({msg:msg});
        });
    });

    app.post('/delete',function(req,res){//删除account  主要用于删除account中的数据
        Account.delete(req.body.id,function(msg){
            res.json({msg:msg});
        });
    });

    app.post('/step/update',function(req,res){//更新新手教程步骤
        var account={step:req.body.step};
        console.log(account,req.body.gamename);
        Account.updateStep(account,req.body.gamename,function(msg){
            res.json({msg:msg});
        });

    });

    app.post('/step/get',function(req,res){//获取帐号的新手教程步骤
        Account.getAccountByGameName(req.body.gamename,function(account){
            res.json({account:account});
        });
    });


    app.post('/save', function(req,res,next){//保存account 主要用于新增或者更新account表

        var account=new Account({
            account_name:req.body.name,
            account_gamename:req.body.gamename,
            account_money:req.body.money,
            account_food:req.body.food,
            account_maxfood:req.body.maxfood,
            account_army:req.body.army,
            account_trade:req.body.trade,
            account_blood:req.body.blood,
            account_builded:req.body.builded,
            account_resources:req.body.resources,
            account_lasttime:req.body.lasttime,
            user_id:req.body.user_id,
            type:req.body.type||0,
            pc_group:req.body.pc_group,
            account_lastip: getClientIp(req)    //这里可以这样来获取客户端IP
        });
        Account.save(account,function(msg){
            res.json({msg:msg});
        });
    });
};