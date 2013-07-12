
/**
 * Module dependencies.
 */

var express = require('express'),
     routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    ejs = require('ejs'),
    settings= require('./settings'),
    flash= require('connect-flash');
Db= require('./models/db');

var app = express();

app.configure(function(){
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "@#$TYHBVGHJIY^TWEYKJHNBGFDWGHJKUYTWE#$%^&*&^%$#",
        Db:Db
    }));
    app.use(flash());
});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html',ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.use(function(req,res,next){
    var msg = req.flash('msg');

    res.locals.user = req.session.user;
    res.locals.msg = msg.length ? msg : null;
    next();
});


routes(app);
app.enable("jsonp callback");
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
