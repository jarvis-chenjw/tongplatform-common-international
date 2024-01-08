import cookies from "./cookie.js"
export default {
	/**
	 * 获取浏览器信息
	 */
	getBrowserInfo: function() {
		var userAgent = navigator.userAgent.toLowerCase();
		return browser = {
			version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
			safari: /webkit/.test(userAgent),
			opera: /opera/.test(userAgent),
			msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
			mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
		};
	},

	/**
	 * 获取长度为len的随机字符串 (默认32位)
	 */
	getRandomString: function(len) {

		len = len || 32;

		// 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1  
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = $chars.length;
		var pwd = '';
		for (var i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	
	/**
	 * 获取url参数如index.htm?id=1 返回1
	 * url将URL中的字符串时进行分解获取参数name的实际值
	 * modify by jc 20100420
	 */
	getUrlParameter: function(name, url) {
		var params = null;
		if (url) {
			params = url.replace(/[^\?\&]*(\?|&)/, "").split('&');
		} else {
			params = window.location.search.slice(1).split('&');
		}
		for (var i = 0; i < params.length; i++) {
			var temp = params[i].split("=");
			if (temp[0] == name) {
				//支持值里面有=，如&purl=unid=123&，取出的值为unid=123 mdf by jc 20110311
				return params[i].replace(/^[\w]*=/, "");
			}
		}
		return "";
	},
	
	/**
	 * 替换指定传入参数的值,paramName为参数,replaceWith为新值
	 */
	replaceParamVal : function(url, paramName, replaceWith) {
	    var oUrl = url.toString();
	    var re = eval('/('+ paramName+'=)([^&]*)/gi');
	    var newUrl = oUrl.replace(re, paramName+'='+replaceWith);
	    return newUrl;
	},

	/**
	 * 添加URL的参数
	 * @param name   名称
	 * @param value  值
	 * @param url    链接地址
	 */
	addUrlParam: function(name, value, url) {
		if (!value) {
			return url;
		}
		var tmpUrl = url;
		
		if(tmpUrl.indexOf(name + "=") > -1){
			return tmpUrl = this.replaceParamVal(tmpUrl, name, value);
		}

		// 判断是否已经有其他参数
		if (tmpUrl.indexOf("?") >= 0) {
			tmpUrl += "&";
		} else {
			tmpUrl += "?";
		}
		tmpUrl += name + "=" + value;

		return tmpUrl;
	},
	
	/**
	 * 过滤js标签和换行转换
	 */
	replaceJsContent : function(s) {
		
		s = s || "";
        return (typeof s != "string") ? s : s.replace(/</g,'《').replace(/>/g,'》').replace(/(\r\n)|(\n)|(\r)/g,'<br>');
	},
	
	/**
	 * 获取基础参数
	 */
	getAuthClient : function(){
		
		return {
			"base-params" : JSON.stringify({
				clientParams : {
					os: cookies.getCookie("os_type") || "H5",
					network: "",
					deviceId: cookies.getCookie("deviceId") || "H5",
					appVersion: ""
				},
				areaCode : cookies.getCookie("AREA_CODE") || "",
				appId : cookies.getCookie("APP_ID") || ""
			}),
			token : cookies.getCookie("token")
		}
	},
	
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	dateExtend : function() {
		Date.prototype.Format = function (fmt) {  
		    var o = {
		        "M+": this.getMonth() + 1, //月份 
		        "d+": this.getDate(), //日 
		        "h+": this.getHours(), //小时 
		        "m+": this.getMinutes(), //分 
		        "s+": this.getSeconds(), //秒 
		        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		        "S": this.getMilliseconds() //毫秒 
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		}		
	}
}
