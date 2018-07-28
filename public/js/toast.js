/**
 * Created by chunting on 2018/7/28.
 */
 var toast = null;
(function(){
	var styleCss = '.toast-wrap{position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0);z-index:999}.toast-wrap .toast{position:absolute;left:50%;top:46%;-webkit-transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);transform:translate(-50%, -50%);background-color:rgba(0, 0, 0, .7);min-width:5rem;text-align:center;padding:.6rem .97rem;color:#fff;font-weight:700;font-size:.75rem;box-shadow:0 0 .5rem rgba(0, 0, 0, .6);border-radius:.2rem;-webkit-transition: all .3s;transition: all .3s;opacity:0}';
	var styleNode = document.createElement('style');
	styleNode.type = 'text/css';

	if(styleNode.styleSheet){
		styleNode.styleSheet.cssText = styleCss;
	} else {
		styleNode.innerHTML = styleCss;
	}
	document.getElementsByTagName('head')[0].appendChild(styleNode);

	var bodyNode = document.getElementsByTagName('body')[0];
	var timer1 = null,timer2 = null,timer3 = null;
	toast = function(config){
		
		config = config || {};
		var text = config.text || '提示';
		var duration = config.duration || 2000;
		clearToast();
		var ele = document.createElement('div');
		ele.className = 'toast-wrap';
		ele.innerHTML = '<div class="toast">'+text+'</div>';
		bodyNode.appendChild(ele);
		var toastEle = ele.getElementsByClassName('toast')[0];
		timer1 = setTimeout(function(){
			toastEle.style.opacity = 1;
		},10);
		timer2 = setTimeout(function(){
			toastEle.style.opacity = 0;	
			timer3 = setTimeout(function(){
				clearToast();
			},300);
		},duration);
	}
	function clearToast(){
		var toastNode = document.getElementsByClassName('toast-wrap');
		if(toastNode.length>0){
			for(var i=0;i<toastNode.length;i++){
				if(toastNode[i]){
					bodyNode.removeChild(toastNode[i]);
				}
				
			}
		}
		clearTimeout(timer1);
		clearTimeout(timer2);
		clearTimeout(timer3);
	}


})()