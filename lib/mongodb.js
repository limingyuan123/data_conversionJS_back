const config = require('../config/config')
const mongoose = require('mongoose');

//连接111数据库
let db1 = mongoose.createConnection(config.dataConversionDB, {useNewUrlParser:true});
db1.on('error', console.error.bind(console,'111 db connection error: '));
db1.once('open', function(){
    console.log("111 db connected");
})

exports.mongoose = mongoose;
exports.DB1 = db1