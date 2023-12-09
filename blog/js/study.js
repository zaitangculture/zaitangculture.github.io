window.onload = function(){
//闪烁
	$(".box")[0].onclick = function() {
		$(".light")[0].style.animation = "Light 0.6s";
		setTimeout( function(){
			$(".light")[0].style.animation = "";
		},610)
	}
//滚动条
	//清除leaf选中样式
	function Eliminate() {
		for( let i=0; i<$("dd").length; i++){
			$("dd")[i].classList.remove("current");
		}
	}
	//点击dt
	for(let i=0; i<$("dt").length; i++){
		$("dt")[i].onclick = function(){
			if($("dl")[i].style.height == "47px"){
				for(let j=0; j<($("dl")[i].getElementsByTagName("dd").length); j++){
					$("dl")[i].style.height = Top+6+ToP*(j+1)+"px";
					$("dl")[i].getElementsByTagName("dd")[j].style.top = "0";
				}
			}else{
				for(let j=0; j<($("dl")[i].getElementsByTagName("dd").length); j++){
					$("dl")[i].style.height = "47px";
					$("dl")[i].getElementsByTagName("dd")[j].style.top = -Top-ToP*j+"px";
				}
			}
		}
	}
	//点击dd
	for(let i=0; i<$("dd").length; i++){
		$("dd")[i].onclick = function() {
			document.documentElement.scrollTop = $("h3")[i].offsetTop - 5;
			Eliminate();
			$("dd")[i].classList.add("current");
		}
	}
	//点击火箭
	var obtn = $(".rocket")[0];
	var timer = null; var isTop = true;
	var sTop  = document.documentElement.scrollTop || document.body.scrollTop;
	function oPosition(){
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
	}
	oPosition();
	var Top = 42;
	var ToP = 31;
	//初始化dlheight
	for(let i=0; i<($("dl").length); i++){
		for(let j=1; j<=($("dl")[i].getElementsByTagName("dd").length); j++){
			$("dl")[i].style.height = Top+6+ToP*j+"px";
		}
	}
	//监听滚动条
	window.onscroll = function() {
		sTop  = document.documentElement.scrollTop || document.body.scrollTop;
		oPosition();
		//显示/隐藏火箭
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
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
		//侧栏滚动切换
		for(let j=1; j<($("dd").length); j++){
			if(sTop >= ($("h3")[j-1].offsetTop-10) && sTop < ($("h3")[j].offsetTop)-10){
				Eliminate();
				$("dd")[j-1].classList.add("current");
			}else if(sTop >= (($("h3")[($("dd").length)-1].offsetTop)-10)) {
				Eliminate();
				$("dd")[($("dd").length)-1].classList.add("current");
			}
		}
		//侧栏收缩
		for(let i=1; i<($("h2").length); i++){
			for(let j=0; j<($("dl")[i-1].getElementsByTagName("dd").length); j++){
				if(sTop > $("h2")[i].offsetTop){
					$("dl")[i-1].getElementsByTagName("dd")[j].style.top = -Top-ToP*j+"px";
					$("dl")[i-1].style.height = "47px";
				}else{
					$("dl")[i-1].style.height = Top+6+ToP*(j+1)+"px";
					$("dl")[i-1].getElementsByTagName("dd")[j].style.top = "0";
				}
			}
		}
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
}