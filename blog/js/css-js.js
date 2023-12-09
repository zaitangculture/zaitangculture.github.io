window.onload = function(){
//闪烁
	$(".box")[0].onclick = function() {
		$(".light")[0].style.animation = "Light 0.6s";
		setTimeout( function(){
			$(".light")[0].style.animation = "";
		},610)
	}
//仿真按钮
	$('.switch__toggle')[0].onclick = function() {
		if($(".switch__status")[0].innerHTML == "OFF"){
			$(".switch")[0].classList.add("switch-off");
			$(".switch__status")[0].innerHTML = "ON";
		}else{
			$(".switch")[0].classList.remove("switch-off");
			$(".switch__status")[0].innerHTML = "OFF";
		}
	}
//点击完成按钮
	$('.c-box7')[0].onclick = function() {
		$('.c-box7')[0].getElementsByTagName('span')[0].style.width = "40px";
		$('.c-box7')[0].getElementsByTagName('span')[0].innerHTML = "";
		$('.c-box7')[0].getElementsByTagName('span')[0].style.color = "#ee6a62";
		setTimeout( function(){
			$('.c-box7')[0].getElementsByTagName('span')[0].style.borderRadius = "50%";
		},50)
		setTimeout( function(){
			$('.c-box7')[0].getElementsByTagName('span')[0].innerHTML = "√";
			$('.c-box7')[0].getElementsByTagName('span')[0].style.background = "#FFF";
			$('.c-box7')[0].getElementsByTagName('div')[0].style.display = "block";
		},800)
		setTimeout( function(){
			$('.c-box7')[0].getElementsByTagName('div')[0].classList.add("click");
		},850)
		setTimeout( function(){
			$('.c-box7')[0].getElementsByTagName('div')[0].style.display = "none";
			$('.c-box7')[0].getElementsByTagName('div')[0].classList.remove("click");
			$('.c-box7')[0].getElementsByTagName('span')[0].style.borderRadius = "20px";
			$('.c-box7')[0].getElementsByTagName('span')[0].style.width = "130px";
			$('.c-box7')[0].getElementsByTagName('span')[0].style.background = "linear-gradient(135deg, #FEB692 0%, #EA5455 100%)";
			$('.c-box7')[0].getElementsByTagName('span')[0].style.color = "#FFF";
			$('.c-box7')[0].getElementsByTagName('span')[0].innerHTML = "click";
		},3000)
	}
//菜单1
	for(let i=0; i<$('.ull')[0].getElementsByClassName("li").length; i++){
		$('.li')[i].onmouseover = function() {
			$('.lii')[0].style.display = "none";
			$('.lii')[i].style.display = "block";
		}
		$('.li')[i].onmouseout = function() {
			$('.lii')[i].style.display = "none";
		}
	}
//菜单2
	$(".lii2")[0].getElementsByTagName("li")[0].style.top = "45px"
	$(".lii2")[0].getElementsByTagName("li")[1].style.top = "90px"
	$(".lii2")[0].getElementsByTagName("li")[2].style.top = "135px"
	for(let i=0; i<$('.ull')[1].getElementsByClassName("li2").length; i++){
		$('.li2')[i].onmouseover = function() {
			$(".lii2")[i].getElementsByTagName("li")[0].style.top = "45px"
			$(".lii2")[i].getElementsByTagName("li")[1].style.top = "90px"
			$(".lii2")[i].getElementsByTagName("li")[2].style.top = "135px"
		}
		$('.li2')[i].onmouseout = function() {
			$(".lii2")[0].getElementsByTagName("li")[0].style.top = "0"
			$(".lii2")[0].getElementsByTagName("li")[1].style.top = "0"
			$(".lii2")[0].getElementsByTagName("li")[2].style.top = "0"
			$(".lii2")[i].getElementsByTagName("li")[0].style.top = "0"
			$(".lii2")[i].getElementsByTagName("li")[1].style.top = "0"
			$(".lii2")[i].getElementsByTagName("li")[2].style.top = "0"
		}
	}
//轮播图1
	var n = 0; var N = 0; var timer;
	//清除所有curr
	function El() {
		for( let i=0; i<$('.li-i').length; i++){
			$('.a-img-ban')[i].classList.remove("img-ban-curr");
			$('.li-i')[i].classList.remove("curr");
		}
	}
	//点击切换
	for( let i=0; i<$('.li-i').length; i++){
		$('.li-i')[i].onclick = function(){
			El();
			$('.a-img-ban')[i].classList.add("img-ban-curr");
			$('.li-i')[i].classList.add("curr");
			n = i;
			clearInterval(tir);
			Banner();
		}
	}
	//定时切换
	function Banner() {
		tir = setInterval(function(){
			(n >= $('.a-img-ban').length) ? (n = 0) : (n);
			N = n + 1;
			(N >= $('.a-img-ban').length) ? (N = 0) : (N);
			El();
			$('.a-img-ban')[N].classList.add("img-ban-curr");
			$('.li-i')[N].classList.add("curr");
			n++;
		},3000)
	}
	Banner();
//轮播图2
	//清除所有curr
	function El2() {
		for( let i=0; i<$("#ul2").getElementsByTagName("li").length; i++){
			$('#ul2').getElementsByTagName("li")[i].classList.remove("curr");
		}
	}
	//点击切换
	var oDeg = 0; var num = 0;
	$("#lt").onclick = function(){
		oDeg += 90; --num; (num<0) ? (num=3) : (num);
		$("#ul1").style.transform = 'rotateY('+ oDeg + 'deg)';
		El2();
		$('#ul2').getElementsByTagName("li")[num].classList.add("curr");
		clearInterval(tir2);
		Banner2();
	}
	$("#gt").onclick = function(){
		oDeg -= 90; ++num; (num>3)?(num=0):(num);
		$("#ul1").style.transform = 'rotateY('+ oDeg + 'deg)';
		El2();
		$('#ul2').getElementsByTagName("li")[num].classList.add("curr");
		clearInterval(tir2);
		Banner2();
	}
	//定时切换
	function Banner2() {
		tir2 = setInterval(function(){
			oDeg -= 90;
			$("#ul1").style.transform = 'rotateY('+ oDeg + 'deg)';
			++num; (num>3)?(num=0):(num); El2();
			$('#ul2').getElementsByTagName("li")[num].classList.add("curr");
		},3000)
	}
	Banner2();
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