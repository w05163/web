var fs = require("fs");


var g,p,req,res;
//用于把当前环境变量赋值，这样可以直接使用res，比较方便
function pretreatment(){
	g=this.g;//gei参数
	p=this.p;//post参数存放
	req=this.q;
	res=this.r;
}

function start(){
	pretreatment.call(this);
	// fs.open('input.txt', 'w+', function(err, fd) {
	//   	if (err) {
	//        return console.error(err);
	//    	}
	//   	res.send("文件打开成功！"+fd);  
	//   	var data = '123123123 hello world';
 // 		fs.write(fd, data, 0 , 'utf-8',function(err, written, string){
	// 	  	if(err){
	// 	   		throw err;
	// 	  	}
	// 	  	console.log(written);
	// 	  	console.log(string);
		 
	// 	  	fs.close(fd,function(err){
	// 	  		if(err){
	// 			    throw err;
	// 		    }
	//   		    console.log('file closed');
	// 	    });
	// 	 });
	// });
	fs.writeFile("./s_rtc/session/in","1231321",function(err){
		if(err)
			res.send(JSON.stringify(err));
		else
			res.send("文件写完"+__dirname);

	});
}




exports.start=start;