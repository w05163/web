/**
 *服务器入口
 */

var express = require('express');



var app = express();


var sN="home";//静态资源目录名
var r=__dirname+"/";//应用根目录
var s=r+sN+"/";//静态资源目录
var target;


app.use(express.static(sN));//设置静态资源目录



//s_开头的目录，是可公开访问的服务目录
app.get('/s_*/*', function (req, res) {
   	console.log(req.path+"请求");
   	if(req.path.indexOf(".")>-1)
   		return;
	//var path=req.path.slice(5);
	if(!target||target.path!=req.path)
   		target=require('.'+req.path);
   	pretreatment(req,res);//预处理数据
   	target.start();
})


//  POST 请求
app.post('/abc', function (req, res) {
   	console.log("主页 POST 请求");
})



//  /home 页面 GET 请求
app.get('/home/', function (req, res) {
   console.log("/home GET 请求");
   res.sendFile(s+'test.html');
})


// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
// app.get('/ab*cd', function(req, res) {   
//    console.log("/ab*cd GET 请求");
//    res.send('正则匹配');
// })





function pretreatment(req,res){
	target.q=req;//当前请求
	target.r=res;//返回
	target.g=req.query;//gei参数
	target.p=req.body;//post参数存放
	target.path=req.path;//用于识别当前target（相同模块默认不重新加载，如果需要每次重新加载，
						 //则可以在模块内的start方法内把this.path置空或delete）
}







//启动http服务器
var server = app.listen(80, function () {
  var port = server.address().port;
  console.log("http服务器启动成功,端口："+port);
})







//https服务器
var https = require('https')
    ,fs = require("fs");

var options = {
    key: fs.readFileSync('./csr/privatekey.pem'),
    cert: fs.readFileSync('./csr/certificate.pem')
};

var server_https=https.createServer(options, app);
var SkyRTC = require('skyrtc').listen(server_https);


SkyRTC.rtc.on('new_connect', function(socket) {
  console.log('创建新连接');
});

SkyRTC.rtc.on('remove_peer', function(socketId) {
  console.log(socketId + "用户离开");
});

SkyRTC.rtc.on('new_peer', function(socket, room) {
  console.log("新用户" + socket.id + "加入房间" + room);
});

SkyRTC.rtc.on('error', function(error) {
  console.log("发生错误：" + error.message);
});

server_https.listen(233, function () {
    console.log('Https服务器启动成功');
});