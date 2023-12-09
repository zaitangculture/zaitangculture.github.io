//闪烁
	$(".box")[0].onclick = function() {
		$(".light")[0].style.animation = "Light 0.6s";
		setTimeout( function(){
			$(".light")[0].style.animation = "";
		},610)
	}
//火箭
	var obtn = $(".rocket")[0];
	var timer = null; var isTop = true;
	window.onscroll = function() {
		var sTop  = document.documentElement.scrollTop || document.body.scrollTop;
		if(sTop > 320){
			$(".aside")[0].style.position = "fixed";
			$(".aside")[0].style.top = "20px";
			obtn.style.display = "block";
			setTimeout( function(){
				obtn.style.opacity = "0.5";
			},600)
		}else{
			$(".aside")[0].style.position = "static";
			obtn.style.display = "none";
			obtn.style.opacity = "1";
		}
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
	}
	obtn.onclick = function() {
		timer = setInterval(function(){
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var speed = Math.floor(-osTop / 10);
			document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
			isTop =true;
			if(osTop == 0){
				clearInterval(timer);
			}
		},30);
	}
//图集
	//移入
	function Onmouseover(){
		$('.album')[0].style.transform = "rotate(30deg) translate(30px,-50px)";
		$('.album')[1].style.transform = "rotate(-30deg) translate(-30px,-40px)";
	}
	//移出
	function Onmouseout(){
		$('.album')[0].style.transform = "";
		$('.album')[1].style.transform = "";
	}
	for( let i=0; i<$('.album').length; i++){
		$('.album')[i].onmouseover = function() {
			Onmouseover();
		}
		$('.album')[i].onmouseout = function() {
			Onmouseout();
		}
	}