//以后的个人框架的核心文件

//执行错误直接弹出
onerror=function(msg,url,l){
    var flie=self.location.href.split(/[\\\/.]/);
    var flieName=flie[flie.length-2];
    url=url.split(/[\\\/.]/);
    url=url[url.length-2];
    alert("错误："+msg+";\n界面："+flieName+";\n文件："+url+";\n行数："+l);
}

var c={//config,配置文件
	root:'http://'+location.hostname,
	https:'https://'+location.hostname+':233'
}

var u = navigator.userAgent;
var a={//浏览器类型
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') == -1, //是否web应用程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) == " qq" //是否QQ
}
u=undefined;




/**
 *核心选择器
 **/
function i (str,needAll) {
	if(needAll)
		return document.querySelectorAll(str);
	else
		return document.querySelector(str);
}
/**
 *选择祖辈元素
 **/
Element.prototype.parents=function(){

}

//添加事件监听
Element.prototype.on=function(type,fun,useCapture){
	if(type==='animationend'){
		this.addEventListener('webkitAnimationEnd',fun,useCapture);
	}
	this.addEventListener(type,fun,useCapture);
}


//空函数，应付不传参数的默认情况
function _noop(){}


//框架ajax
function ajax(url,options) {
	var json={
		dataType:"json",
		timeout:10000,
		type:"GET",
		success:_noop,
		error:_noop
	}
	var headers = {
		"X-Requested-With": "XMLHttpRequest",
		"Accept": "*/*",
		"Content-Type": "application/x-www-form-urlencoded"
	};
	json.url=url;
	jsonConcat(json,options);
	jsonConcat(headers,options.headers);
	json.type=json.type.toUpperCase();
    var data="";
    if(json.data){
	    for (items in json.data){
			data+="&"+items+"="+json.data[items];
		}
		if(json.type=="GET")
			json.url+="?"+data.slice(1);
    }
	
	var xmlhttp=new XMLHttpRequest();
	if (json.timeout>0){//--------------------------------
		xmlhttp.abortTimeout=setTimeout(function(){
			xmlhttp.onreadystatechange=_noop;
			xmlhttp.abort();
			json.error(xmlhttp,'timeout',json);
		}, json.timeout);
	}//----------------------------------------------timeout的处理机制应该有更好的方法
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState === 4) {
			xmlhttp.onreadystatechange = _noop;
			clearTimeout(xmlhttp.abortTimeout);
			var result, error = false;
			if ((xmlhttp.status >= 200 && xmlhttp.status < 300) || xmlhttp.status === 304 ||xmlhttp.status === 0){
				var dataType=json.dataType;
				var resultText = xmlhttp.responseText;
				try {
					if (dataType === 'xml') {
						result = xmlhttp.responseXML;
					} else if (dataType === 'json') {
						result = JSON.parse(resultText);
					}
				} catch (e) {
					error = e;
				}
				if (error) {
					json.error(xmlhttp,'parsererror',json);
				} else {
					json.success(result, xmlhttp, json);
				}
			} else {
				json.error(xmlhttp,xmlhttp.status ? 'error' : 'abort', json);
			}
		}
	}
	xmlhttp.open(json.type,json.url,true);
	
	for (var name in json.headers) {
		xmlhttp.setRequestHeader(name,json.headers[name]);
	}
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(data);
    
    return xmlhttp;
}

//get方式的ajax，只返回json
function getJson(url,data,success){
	var options={
		data:data,
		dataType:"json",
		type:'GET',
		timeout:10000,
		success:success,
		error:function(xhr,type,errorThrown){
			console.log(type+"___url:"+url);
		}
	};
	ajax(url,options);
}

//设置或取出本地存储的json
i.ls=function(name,val,cover){
	if(typeof val=='undefined'){
		return JSON.parse(localStorage.getItem(name));
	}else{
		var j;
		if(cover)
			return localStorage.setItem(name,JSON.stringify(val));
		j=JSON.parse(localStorage.getItem(name));
		if(j)
			i.jsonConcat(j,val);
		else
			j=val;
		localStorage.setItem(name,JSON.stringify(j));
	}
	
}
//取出本地存储的字符串
i.l=function(name,val){
	if(typeof val=='undefined')
		return localStorage.getItem(name);
	localStorage.setItem(name,val);
}

/**
 * 合并两个json对象，如果存在相同属性，取第二个json的属性值
 * @param {Object} json1
 * @param {Object} json2
 */
i.jsonConcat=function(json1,json2){
	for(key in json2){
		json1[key]=json2[key];
	}
}


/**
 * 设置或者获取cookie，expiredays负数代表分钟，正数的单位为“天”（24小时）path为cookie的有效路径
 * @param {String} c_name
 * @param {String} value
 * @param {Number} expiredays
 * @param {String} path
 */
cookie=function(c_name,value,expiredays,path){
	if(value){//设置cookie
		var exdate=new Date();
		expiredays=expiredays||1;//默认为1天
		if(expiredays>1)
			exdate.setDate(exdate.getDate()+expiredays);
		else if(expiredays>0)
			exdate.setHours(exdate.getHours()+expiredays*24);
		else 
			exdate.setMinutes(exdate.getMinutes()-expiredays);
		var domain="";
		if(path){
			domain="; path="+path+";";
		}else{
			domain="; path=/; domain="+document.domain;
		}
		var tem=c_name+"="+encodeURIComponent(value)+((expiredays==null)?"":";expires="+exdate.toGMTString())+domain;
		document.cookie=tem;
	}else{//获取cookie
		if(document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name+"=");
			if (c_start!=-1){ 
			    c_start=c_start + c_name.length+1;
			    c_end=document.cookie.indexOf(";",c_start);
			    if(c_end==-1)c_end=document.cookie.length;
			    return decodeURIComponent(document.cookie.substring(c_start,c_end));
		    } 
		}
	}
}


i.trim=function(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}