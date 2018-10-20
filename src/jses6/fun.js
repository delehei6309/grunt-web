let acfun = (content, fun) => {
	let txt = content || '提示';
	let html = `<div flex="main:center cross:center" class="mode">
		        <div flex="dir:top main:justify" class="mode-wrap">
		            <div class="mode-content">
		                <div class="mode-txt">${txt}</div>
		            </div>
		            <div class="mode-btn">确认</div>
		        </div>
		    </div>`;
	$('body').append(html);
	setTimeout(() => {
		$('.mode-btn').tap(function() {
			$('.mode').remove();
			if (fun) {
				fun();
			}
		});
	});
};