/**
 * Created by chunting on 2017/5/28.
 */
// 获取url 参数
var getRequest = function() {   
    var url = location.search; //获取url中"?"符后的字串   
    var theRequest = new Object();   
    if (url.indexOf("?") != -1) {   
        var str = url.substr(1);   
        strs = str.split("&");   
        for(var i = 0; i < strs.length; i ++) {   
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
        }   
    }   
    return theRequest;   
} 
var checkPhone = function(phone){
    var regPhone = /^(0|86|17951)?(1)[0-9]{10}$/;
    if(regPhone.test(phone)){
        return true;
    }else{
        return false;
    }
};
