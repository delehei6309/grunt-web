

//手机校验
let checkPhone = (phone) => {
    let regPhone = /^(0|86|17951)?(1)[0-9]{10}$/;
    if(regPhone.test(phone)){
        return true;
    }else{
        return false;
    }
};

var $orderCancel = $('#order-cancel');
var $orderSure = $('#order-sure');
// $orderSure.click(()=>{
// 	var phone = $('#phone').val();
// 	if(checkPhone(phone)){
// 		$('#mes').show();
// 	}else{
// 		Toast('请输正确手机号');
// 	}
	
// });
$orderCancel.click(()=>{
	$('#mes').show();
});
$('#message-cancel').click(()=>{
	$('#mes').hide();
});
$('#message-sure').click(()=>{
	$('#mes').hide();
	window.history.back();
});
function Toast(tit,time){
	//必须引入flex.css
	time = time || 2000;
	let dom = `<div class="toast-wrap" flex="main:center cross:center"><div class="toast">${tit}</div></div>`;
	$('body').append(dom);
	setTimeout(()=>{
		$('.toast-wrap').remove();
	},time);
}