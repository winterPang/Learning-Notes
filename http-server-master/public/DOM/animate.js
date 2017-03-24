(function (window) {
	// body...
	/*
     *
	 *================   TOOL工具函数   ============================
	 *
	 */

	//AJax技术
	// XMLHttpRequest对象处理,兼容所有浏览器的XMLHttpRequest对象
	function getHttpRequestObj(){
		if(typeof XMLHttpRequest == 'undefined'){
			try{
				return new ActiveXObject('Msxml2.XMLHTTP.6.0');
			}catch(e){

			}

			try{
				return new ActiveXObject('Msxml2.XMLHTTP.3.0');
			}catch(e){

			}

			try{
				return new  ActiveXObject('Msxml2.XMLHTTP');
			}catch(e){

			}
			return false;
		}

		return new XMLHttpRequest();
	}

	//添加onload 函数 为页面加载完毕执行的函数创建队列
	function addLoadEvent(func){
		var oldOnload = window.onload;
		if(typeof window.onload != 'function'){
			window.onload = func;
		}else{
			window.onload = function(){
				oldOnload();
				func();
			}
		}

	}

	//DOM 操作新增，删除插入元素节点
	function insertAfter(newElement,targetElement){
		var parent = targetElement.parentNode;
		if(parent.lastChild == targetElement){
			parent.appendChild(newElement);
		}else{
			parent.insertBefore(newElement,targetElement.nextSibling)
		}
	}
	//addClass
	function addClass(element,className){
		var newClassName = "";
		if(!element.className){
			element.className = className
		}else{
			newClassName = element.className;
			newClassName += " ";
			newClassName += className;
			element.className = newClassName;
		}
	}

	/*
	 *========================业务函数========================
	 *
	 */

	//c抽象函数
	function moveElement(eleId,final_x,final_y,inteval){
		if(!document.getElementById) return false;
	 	if(!document.getElementById(eleId)) return false;
		//todo 入参校验
	 	var elem = document.getElementById(eleId);
	 	var xpos = parseInt(elem.style.left||0);
	 	var ypos = parseInt(elem.style.top||0);

	 	if(xpos == final_x && ypos ==final_y){
			return true;
			clearTimeout(moment);
	 	}
			
		if(xpos < final_x){
			xpos++;
		}else{
			xpos--
		}

		if(ypos < final_y){
			ypos++
		}else{
			ypos--
		}
		elem.style.left =xpos + "px";
		elem.style.top = ypos + 'px';
		// console.log(this.moveMessage);
		// var  moment =setTimeout('moveMessage()',10); 
		//不可用报moveMessage undefined错误,匿名函数调用moveMessage函数
		//执行指针指向this.moveMessage this指向window
		var  moment =setTimeout(function(){
		  	moveMessage(eleId,final_x,final_y,inteval)
		  },inteval);

	}
		
	 function moveMessage(){
	 	if(!document.getElementById) return false;
	 	if(!document.getElementById('message')) return false;
	 	var elem = document.getElementById('message');
	 	elem.style.position = 'absolute';
	 	var xpos = 0;
	 	var ypos = 0;
	 	moveElement('message',200,100,10);
	 // 	if(!document.getElementById) return false;
	 // 	if(!document.getElementById('message')) return false;

	 // 	var elem = document.getElementById('message');
	 // 	elem.style.position = 'absolute';
	 // 	var xpos = parseInt(elem.style.left||0);
	 // 	var ypos = parseInt(elem.style.top||0);

	 // 	if(xpos == 200 && ypos ==100){
		// 	return true;
		// 	clearTimeout(moment);
	 // 	}
			
		// if(xpos < 200){
		// 	xpos++;
		// }else{
		// 	xpos--
		// }

		// if(ypos < 100){
		// 	ypos++
		// }else{
		// 	ypos--
		// }
		// elem.style.left =xpos + "px";
		// elem.style.top = ypos + 'px';
		// // console.log(this.moveMessage);
		// // var  moment =setTimeout('moveMessage()',10); 
		// //不可用报moveMessage undefined错误,匿名函数调用moveMessage函数
		// //执行指针指向this.moveMessage this指向window
		// var  moment =setTimeout(function(){
		//   	moveMessage()
		//   },10);
	 }
	// var moment = setTimeout(function(){
	// 	moveMessage()
	// },10);
	addLoadEvent(moveMessage);
})(window)