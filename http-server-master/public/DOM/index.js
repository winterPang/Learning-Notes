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

	/*
     *
	 *================ 业务模块 DOM交互 =========================
	 *
	 */

	 function getTextDoc(){
	 	var request = getHttpRequestObj();
	 	if(request){
	 		request.open('GET','test.txt',true);
	 		request.onreadystatechange = function(){
	 			if(request.readyState == 4){
	 				var paraPEle = document.createElement('p');
	 				// DOM
	 				paraPEle.textContent = request.responseText + 
	 				"元素的属性textContent";
	 				var txt = document.createTextNode(request.responseText);
	 				paraPEle.appendChild(txt);
	 				document.getElementById('new').appendChild(paraPEle);
	 			}
	 		}
	 		request.send(null);
	 	}else{
	 		alert('不支持XMLHttpRequest');
	 	}
	 }

	function prepareImageEle(){
		//创建元素节点
		var imgEle = document.createElement('img');
		//设置属性节点
		imgEle.setAttribute('id','showArea');
		imgEle.setAttribute('width',600);
		imgEle.setAttribute('height',300);
		imgEle.setAttribute('alt','展示图片');
		imgEle.setAttribute('src','');
		var pEle = document.createElement('p');
		pEle.setAttribute('id','imgdescription')
		var pDesText = document.createTextNode('choose an image');
		var imagegalleryEle = document.getElementById('imagegallery');
		pEle.appendChild(pDesText);
		
		insertAfter(imgEle,imagegalleryEle);
		insertAfter(pEle,imgEle);

	}

	// 书写a标签的href 属性 方便实现浏览器的     
	function showPic(changedPic){
		var source = changedPic.getAttribute('href');
		var sourecTitle = changedPic.getAttribute('title');
		var showArea = document.getElementById('showArea');
		var desEle = document.getElementById('imgdescription');
		if(source&&sourecTitle&&showArea&&desEle){
			showArea.setAttribute('src',source); 
			// alert(desEle.nodeValue);//null
			/* 节点定义：想要获取p元素的value值；
			 *实际是获取的p元素
			 *文本子节点的的nodeValue数值。*/
			// alert(desEle.childNodes[0].nodeValue);
			// alert(desEle.lastChild.nodeValue);
			// alert(desEle.firstChild.nodeValue);
			if(desEle.firstChild.nodeType != 3) return false; 
			desEle.firstChild.nodeValue = sourecTitle;
			 return true; 
		}else{
			return false;
		}
		
	}
	
	function getBodyElement(){
		var bodyEle = document.getElementsByTagName('body')[0];
		var childNodes = bodyEle.childNodes;
		for(var i = 0 ; i <childNodes.length;i++){
			//alert(childNodes[i].nodeType);//获取节点类型
			//1 2 3 元素 属性 文本
		}
	}

	//事件绑定独立html 
	function galleryImg(){
		//校验存在型
		if(!document.getElementsByTagName) return false;
		if(!document.getElementById) return false;
		if(!document.getElementById('imagegallery')) return false;
		var gallery  = document.getElementById('imagegallery');
		var links = gallery.getElementsByTagName('a');

		for(var i = 0; i < links.length; i++){
			links[i].onclick = function(){
				return !showPic(this);
				//return false;
			}
			links[i].onkeypress = links[i].onclick;
		}

	}

	addLoadEvent(getTextDoc);
	addLoadEvent(prepareImageEle);
	addLoadEvent(galleryImg);
	
	//galleryImg();
	//window.showPic =showPic;
	//window.onload = getBodyElement();
	//window.onload();
})(window);