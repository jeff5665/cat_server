/**
 * User: jeff.zhang
 * Date: 13-6-7
 * Time: 下午3:32
 */
var settings= require('../settings'),
    mysql = require('mysql');
    connection = mysql.createConnection(settings);
    connection.connect();
module.exports=connection;

