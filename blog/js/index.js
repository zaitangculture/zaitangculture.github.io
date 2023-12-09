window.onload = function(){
//轮播图
	var n = 0; var N = 0; var timer;
	//清除所有curr
	function Eliminate() {
		for( let i=0; i<$('.li-img').length; i++){
			$('.a-img-ban')[i].classList.remove("img-ban-curr");
			$('.li-img')[i].classList.remove("curr");
		}
	}
	//点击切换
	for( let i=0; i<$('.li-img').length; i++){
		$('.li-img')[i].onclick = function(){
			Eliminate();
			$('.a-img-ban')[i].classList.add("img-ban-curr");
			$('.li-img')[i].classList.add("curr");
			n = i;
			clearInterval(timer);
			Banner();
		}
	}
	//定时切换
	function Banner() {
		timer = setInterval(function(){
			(n >= $('.a-img-ban').length) ? (n = 0) : (n);
			N = n + 1;
			(N >= $('.a-img-ban').length) ? (N = 0) : (N);
			Eliminate();
			$('.a-img-ban')[N].classList.add("img-ban-curr");
			$('.li-img')[N].classList.add("curr");
			n++;
		},4000)
	}
	Banner();
	//预览图
	for( let i=0; i<$('.li-img').length; i++){
		$('.li-img')[i].onmouseover = function(){
			$(".mask")[i].style.display = "block";
		}
		$('.li-img')[i].onmouseout = function(){
			$(".mask")[i].style.display = "none";
		}
	}
	
	
	
}