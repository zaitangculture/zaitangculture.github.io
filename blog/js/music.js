window.onload = function(){
	/* 个位数转两位数 */
	function doubleNum(n){
		return (n <10) ? ("0" + n) : (n);
	}
	/* 储存信息 */
	var songName =["至此流年各天涯", "当我唱起这首歌"]
	var singers =["李志", "小贱"]
	/* 动态插入css代码片段 */
	var head = $('head')[0];
	function loadCssCode(code){
		var style = document.createElement('style');
		style.type = 'text/css';
		style.rel = 'stylesheet';
		style.id = 'style';
		try{
			//for Chrome Firefox Opera Safari
			style .appendChild(document.createTextNode(code));
		}catch(ex){
			//for IE
			style.styleSheet.cssText = code;
		}
		head.appendChild(style);
	}
	/* 定时器 */
	function oTimer(){
		real = setInterval( function(){
			realTime = parseInt(myMusic.currentTime);
			realMinute = doubleNum(parseInt(realTime/60));
			realSecond = doubleNum(realTime%60);
			oRealTime.innerHTML = realMinute + ":" + realSecond;
			left = (realTime*400)/totalTime;
			oSpot.style.left = (left-10) + "px";
			oProgress.style.width = left + "px";
			if(myMusic.ended){
				Play = false;
				oPaly.className = "play iconfont Iconfont icon-zanting";
				oPaly.title = "播放";
			}
		},1000)
	}
	/* 更新信息 */
	function update(){
		for(let i=0; i < 2; i++){
			$(".songName")[i].innerHTML = songName[I];
			$(".singer")[i].innerHTML = singers[I];
		}
		Txt = "#txt" + I;
		TXT = $(Txt);
		lrc = TXT.value;
		Initialize();
	}
	/* 上一首 */
	var I = 0; var arr = null; var Txt = null; var TXT = null;
	var lrc = txt0.value;
	var oLast = $(".last")[0];
	oLast.onclick = function(){
		--I; (I < 0) ? I = 1 : I = I;
		if($("#style") != null){
			head.removeChild(style);
			loadCssCode(`.Opage::before{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: -30px; z-index: -1; content: ''; background: url(./music-img/${I}.jpg) no-repeat; background-size:100% 100%; filter: blur(20px); }`);
		}else{
			loadCssCode(`.Opage::before{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: -30px; z-index: -1; content: ''; background: url(./music-img/${I}.jpg) no-repeat; background-size:100% 100%; filter: blur(20px); }`);
		}
		$("img")[0].src = `./music-img/${I}.jpg`;
		$("img")[1].src = `./music-img/${I}.jpg`;
		myMusic.pause();
		myMusic.src = `./music/ogg/${I}.ogg`;
		Play = true;
		oPaly.className = "play iconfont Iconfont icon-bofang";
		oPaly.title = "暂停";
		/* 延时获取totalTime */
		setTimeout( function(){
			if(myMusic.readyState == 4){
				totalTime = parseInt(myMusic.duration);
			}else{
				location.reload();
				alert("信息获取错误，自动刷新页面")
			}
			realTime = parseInt(myMusic.currentTime);
			totalMinute = doubleNum(parseInt(totalTime/60));
			totalSecond = doubleNum(totalTime%60);
			oTotalTime.innerHTML = totalMinute + ":" + totalSecond;
			left = 0;
			myMusic.play();
			oLyric.scrollTop = 0;
			clearInterval(real);
			oTimer();
			progress();
		},300);
		/* 更新信息 */
		update();
	}
	/* 下一首 */
	var oNext = $(".next")[0];
	oNext.onclick = function(){
		++I; (I > 1) ? I = 0 : I = I;
		if($("#style") != null){
			head.removeChild(style);
			loadCssCode(`.Opage::before{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: -30px; z-index: -1; content: ''; background: url(./music-img/${I}.jpg) no-repeat; background-size:100% 100%; filter: blur(20px); }`);
		}else{
			loadCssCode(`.Opage::before{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: -30px; z-index: -1; content: ''; background: url(./music-img/${I}.jpg) no-repeat; background-size:100% 100%; filter: blur(20px); }`);
		}	
		$("img")[0].src = `./music-img/${I}.jpg`;
		$("img")[1].src = `./music-img/${I}.jpg`;
		myMusic.pause();
		myMusic.src = `./music/ogg/${I}.ogg`;
		Play = true;
		oPaly.className = "play iconfont Iconfont icon-bofang";
		oPaly.title = "暂停";
		/* 延时获取totalTime */
		setTimeout( function(){
			if(myMusic.readyState == 4){
				totalTime = parseInt(myMusic.duration);
			}else{
				location.reload();
				alert("信息获取错误，自动刷新页面")
			}
			realTime = parseInt(myMusic.currentTime);
			totalMinute = doubleNum(parseInt(totalTime/60));
			totalSecond = doubleNum(totalTime%60);
			oTotalTime.innerHTML = totalMinute + ":" + totalSecond;
			left = 0;
			myMusic.play();
			oLyric.scrollTop = 0;
			clearInterval(real);
			oTimer();
			progress();
		},200);
		/* 更新信息 */
		update();
	}
	/* 播放/暂停 */
	var oPaly = $(".play")[0];
	var Play = false;
	oPaly.onclick = function(){
		if(Play){
			myMusic.pause();
			Play = false;
			oPaly.className = "play iconfont Iconfont icon-zanting";
			oPaly.title = "播放";
			clearInterval(real);
		}else{
			myMusic.play();
			Play = true;
			oPaly.className = "play iconfont Iconfont icon-bofang";
			oPaly.title = "暂停";
			oTimer();
		}
	}
	/* 歌曲进度条 */
	var oProgress = $(".progress")[0];
	var oSpot = $(".spot")[0];
	progress();
	function progress(){
		oSpot.onmousedown = function(event){
			event = event || window.event;
			var offsetX = event.clientX - oSpot.offsetLeft -oSpot.offsetWidth/2;
			document.onmousemove = function(event){
				myMusic.muted = true;
				var left = event.clientX - offsetX;
				if(left < 0){
					left = 0;
				}else if(left > 400){
					left =400;
				}
				oSpot.style.left = (left-10) + "px";
				oProgress.style.width = left + "px";
				realTime = parseInt((left*totalTime)/400);
				realMinute = doubleNum(parseInt(realTime/60));
				realSecond = doubleNum(realTime%60);
				oRealTime = $(".realTime")[0];
				myMusic.currentTime = realTime;
				oRealTime.innerHTML = realMinute + ":" + realSecond;
			}
		}
	}
	/* 音频时间 */
	//总时长
	var real;
	var myMusic = $("#myMusic");
	var totalTime;
	var totalMinute;
	var totalSecond;
	var oTotalTime;
	/* 确保获取成功 */
	setTimeout( function(){
		if(myMusic.readyState == 4){
			totalTime = parseInt(myMusic.duration);
		}else{
			location.reload();
		}
		totalMinute = doubleNum(parseInt(totalTime/60));
		totalSecond = doubleNum(totalTime%60);
		oTotalTime = $(".totalTime")[0];
		oTotalTime.innerHTML = totalMinute + ":" + totalSecond;
	},200);
	/* 当前时长 */
	var realTime = parseInt(myMusic.currentTime);
	var realMinute = doubleNum(parseInt(realTime/60));
	var realSecond = doubleNum(realTime%60);
	var oRealTime = $(".realTime")[0];
	/* 音量 */
	var oShengyin = $(".icon-shengyin")[0];
	var oVolumeBox = $(".volumeBox")[0];
	var display = false;
	oShengyin.onclick = function(){
		if(display){
			oVolumeBox.style.display = "none";
			display = false;
		}else{
			oVolumeBox.style.display = "";
			display = true;
		}
	}
	/* 音量进度条 */
	var oVolume = $(".volume")[0];
	var ovolumeSpot = $(".volumeSpot")[0];
	ovolumeSpot.onmousedown = function(event){
		event = event || window.event;
		var offsetY = event.clientY - ovolumeSpot.offsetTop + ovolumeSpot.offsetHeight/2;
		document.onmousemove = function(event){
			var bottom = (80- (event.clientY - offsetY));
			if(bottom < 0){
				bottom = 0;
			}else if(bottom > 80){
				bottom =80;
			}
			ovolumeSpot.style.bottom = (bottom + 5) + "px";
			oVolume.style.height = bottom + "px";
			myMusic.volume = bottom/80;
		}
	}
	document.onmouseup  = function(){
		myMusic.muted = false;
		document.onmousemove = null;
		oVolumeBox.style.display = "none";
		display = false;
	}
	/* 单曲/列表/随机循环图标 */
	var oLoop = $(".loop")[0];
	var Num = 1;
	var Company = 1;
	oLoop.onclick = function(){
		switch(Num){
			case 1:
				oLoop.className = "iconfont loop icon-suiji";
				Num = 2;
				myMusic.loop = false;
				break;
			case 2:
				oLoop.className = "iconfont loop icon-danquxunhuan";
				Num = 3;
				myMusic.loop = true;
				break;
			case 3:
				oLoop.className = "iconfont loop icon-liebiaoxunhuan";
				Num = 1;
				myMusic.loop = false;
				break;
		}
	}
	if( Num ==1 ){
		/* 循环播放 */
		myMusic.onended = function(){
			oNext.click();
		}
	}else if( Num ==3 ){
		/*随机播放*/
		myMusic.onended = function(){
			I = Math.floor(Math.random() * 2);
			(I > 1) ? I = 0 : I = I;
			loadCssCode(`.Opage::before{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: -30px; z-index: -1; content: ''; background: url(./music-img/${I}.jpg) no-repeat; background-size:100% 100%; filter: blur(20px); }`);
			$("img")[0].src = `./music-img/${I}.jpg`;
			$("img")[1].src = `./music-img/${I}.jpg`;
			myMusic.pause();
			myMusic.src = `./music/ogg/${I}.ogg`;
			Play = true;
			oPaly.className = "play iconfont Iconfont icon-bofang";
			oPaly.title = "暂停";
			/* 延时获取totalTime */
			setTimeout( function(){
				if(myMusic.readyState == 4){
					totalTime = parseInt(myMusic.duration);
				}else{
					location.reload();
					alert("信息获取错误，自动刷新页面")
				}
				realTime = parseInt(myMusic.currentTime);
				totalMinute = doubleNum(parseInt(totalTime/60));
				totalSecond = doubleNum(totalTime%60);
				oTotalTime.innerHTML = totalMinute + ":" + totalSecond;
				left = 0;
				myMusic.play();
				oLyric.scrollTop = 0;
				clearInterval(real);
				oTimer();
				progress();
			},200);
			/* 更新信息 */
			update();
		}
	}
	/* 喜爱 */
	var oLove = $(".love")[0];
	var state = false;
	oLove.onclick = function(){
		if(state){
			oLove.className = "iconfont love icon-xihuan1";
			state = false;
		}else{
			oLove.className = "iconfont love icon-xihuan2";
			state = true;
		}
	}
	/* 播放列表 */
	var oLiebiao = $(".liebiao")[0];
	var oList = $(".list")[0];
	var oListTriangle = $(".listTriangle")[0];
	var Open1 = false;
	oLiebiao.onclick = function(){
		if(Open1){
			oList.style.display = "none";
			oListTriangle.style.display = "none";
			Open1 = false;
		}else{
			oList.style.display = "";
			oListTriangle.style.display = "";
			Open1 = true;
		}
	}
	/* 更多 */
	var oGengduo = $(".gengduo")[0];
	var oGengduoBox = $(".gengduoBox")[0];
	var oBoxTriangle = $(".boxTriangle")[0];
	var Open2 = false;
	oGengduo.onclick = function(){
		if(Open2){
			oGengduoBox.style.display = "none";
			oBoxTriangle.style.display = "none";
			Open2 = false;
		}else{
			oGengduoBox.style.display = "";
			oBoxTriangle.style.display = "";
			Open2 = true;
		}
	}
	/* 初始化页面 */
	var str = "";
	/* 歌曲,歌手名称，歌单 */
	for(let i=0; i < 2; i++){
		$(".songName")[i].innerHTML = songName[0];
		$(".singer")[i].innerHTML = singers[0];
		str += `<p><span class="l">${songName[i]}</span><span >--</span><span class="r">${singers[i]}</span></p>`;
		$(".Song")[0].innerHTML = str;
	}
	/* 解析lrc */
	var lrcArr = lrc.split("[");
	var html = "";
	var oLyric = $(".Lyric")[0];
	Initialize();
	function Initialize(){
		for(let i=0; i < lrcArr.length ; i++){
			lrcArr = lrc.split("[");
			arr = lrcArr[i].split("]");
			var time = arr[0].split(".");
			var timer = time[0].split(":");
			var ms = timer[0] * 60 + timer[1] * 1;
			var text = arr[1];
			if(text){
				html += "<p id=" + ms +">" + text + "</p>";
			}
			oLyric.innerHTML = html;
			arr[0] = null; arr[1] = null;
		}
		html = "";
	}
	var oP = oLyric.getElementsByTagName("p");
	/*歌词滚动*/
	myMusic.addEventListener("timeupdate",function(){
	    if($("#"+realTime)){
			/*清除样式*/
	        for(let i=0; i < oP.length ; i++){
	            oP[i].style.cssText = "font-size: 16px;";
	        }
			/* 歌词滚动 */
	        $("#"+realTime).style.cssText = "background: linear-gradient(-3deg,rgba(255,255,255,0.8) 0%,rgba(128,128,128,0.8) 60%);-webkit-background-clip: text;color: transparent;font-size: 20px;";
			//获得滚动窗口距离浏览器的距离
			var Distance1 = oLyric.offsetTop;
			//获得当前歌词距离浏览器顶部的距离
			var Distance2 = $("#"+realTime).offsetTop;
			//获得当前歌词距离滚动窗口的距离
			var Distance3 = Distance2-Distance1;
			//获得滚动窗口的滚动距离
			var Rolling = Distance2-Distance1-153;
			//比较当前歌词距离滚动窗口的距离，大于153，就让窗口滚动
			if(Distance3>153){
				oLyric.scrollTop = Rolling;
			}
	    }
		/* 播放完毕归位 */
		if(realTime >= (totalTime-1)){
			oLyric.scrollTop = 0;
		}
	})
	
}