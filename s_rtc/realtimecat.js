//接入实时猫主要处理文件


// 引入依赖的模块
var https = require('https');
var querystring = require('querystring');
var fs = require("fs");



//var cat_url='https://api.realtimecat.com';
var g,p,req,res;

// 实时猫的请求设置,还需额外设置path
var options = {
    hostname: 'api.realtimecat.com',
    port: 443,
    path: '/v0.1/tokens',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': 0,
        'X-RTCAT-APIKEY': 'a68159b8-f7eb-43f0-bdee-b117c4ca949a',
        'X-RTCAT-SECRET': '31348812-2d4d-4a79-8279-b51993015ba1'
    }
};

function start(){
	//文件入口
	pretreatment.call(this);//用于把当前环境变量赋值，这样可以直接使用res，比较方便

	var session=getSession(g.key);

}

//用于把当前环境变量赋值，这样可以直接使用res，比较方便
function pretreatment(){
	g=this.g;//gei参数
	p=this.p;//post参数存放
	req=this.q;
	res=this.r;
}


//从实时猫获取一个新session,
//参数new_file为布尔值，如果为真，表示无论session文件是否存在，都获取新session
function getSession(str,new_file){
	var file_path=__dirname+"/session/"+str+".json";//session保存文件

	if(new_file){//如果new_file为真，则删除原来的文件
		fs.unlinkSync(file_path);
	}

	var ex=fs.existsSync(file_path);
	if(ex){
    	//文件原本就存在，则读取内容
    	fs.open(file_path,"r",function(err,fd){
	    	if(err){
	    		console.log("打开文件出错："+err);
	    		return;
	    	}
	    	var buf = new Buffer(1024);
			fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
				if (err){
					console.log(err);
				}
				fs.close(fd,logError);//关闭文件
				// 仅输出读取的字节
				if(bytes > 0){
					var text=buf.slice(0, bytes).toString();
					getSessionSuccess(text);//
				}
			});
	    });
    	return;
    }

	// 设置session类型，此处以p2p
    options.data=querystring.stringify({
        'type': "p2p"
    });
    options.path='/v0.1/sessions';//请求路径

    send(options,function(re){
        getSessionSuccess(re);
    	fs.writeFile(file_path,re,logError);
    });
}

function getSessionSuccess(re){//获取本地文件存储的session成功
    var response = JSON.parse(re);

    if(response.error){
        console.log('获取实时猫sessions失败: ' + re);
    }

    getToken(response.session_id,'pub');//获取token
}


//从实时猫获取一个新token
function getToken(session,type){
	//session_id以及创建的用户角色，此处以发布者（pub）为例
    options.data=querystring.stringify({
        'session_id': session,
        'type': type
    });
    options.path='/v0.1/tokens';//请求路径

    send(options,function (re) {
        var response = JSON.parse(re);
        // 服务器端返回了token，此时response形如{token: "1234567890abcdefghijklmnopqrstuvwxyz"}
        if(response.error){
        	console.log('token获取出错: ' + re);
        }
        if(response.error=="RTCAT-ERROR-201"){
        	getSession(g.key,true);
        	return;
        }
        res.send(re);
    });
}


//发送请求
function send(op,callback,error){
	var postData=op.data;
	delete op.data;
	op.headers['Content-Length']=postData.length;//post体的长度
	// 向服务器端发出请求
    var myReq = https.request(op, function (response) {
        //console.log('STATUS: ' + response.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data',callback);
    });

    myReq.on('error',error||errorBack);

    // write data to request body
    myReq.write(postData);
    myReq.end();
}


//默认的请求失败处理
function errorBack(error) {
    console.dir('problem with request: ' + error.message);
}

//异常输出
function logError(err){
    if(err){
        console.log(err);
    }
}






























exports.start=start;




    
