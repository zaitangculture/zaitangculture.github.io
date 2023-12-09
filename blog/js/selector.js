//封装选择器
function $(selector){
	//获取第一个字符
	let c=selector.substring(0,1);
	//封装id选择器
	if(c=="#"){
		//返回相应的元素
		return document.getElementById(selector.substring(1,selector.length));
	//封装class选择器
	}else if(c=="."){
		//从索引为1的元素往后取
		var className=selector.substring(1);
		//判断浏览器是否支持getElementsByClassName
		if(document.getElementsByClassName){
			return document.getElementsByClassName(className)
			//document.querySelectorAll('.cls')兼容性有问题
		}else{
			//document.getElementsByTagName('*')+正则表达式
			//\s空白字符 ^开始 $结束
			var reg=new RegExp('^|\\s'+className+'$|\\s');
			//获取页面中所有元素
			var elems=document.getElementsByTagName("*");
			var arr=[];//保存获取到的指定className的元素
			for(var i=0;i<elems.length;i++){
				//如果和模式匹配上
				if(reg.test(elems[i].className)){
					arr.push(elem[i]);
				}
			}
			return arr;
		}
	//封装标签选择器  
	}else{
		return document.getElementsByTagName(selector);
	}
}