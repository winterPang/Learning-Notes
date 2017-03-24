/*
 * 编写js 函数fn ,有一个参数n , 实现返回数组，n个随机且不重复的整数值。
 * 返回的整数值范围[2,32]之间。
 */

//可用性
function isCheck(value){
		console.log("========"+value);
		var j = 0 ;
		for(var i = 0; i< randomArr.length; i++){
			console.log("========"+i);
			if(value == randomArr[i]){
				break; 
			}else{
				j++
			}
		}
		if(i == j){
			return true;
		}else{
			return false;
		}
}

function getSection(min,max){
	//toDo check
	min = parseInt(Number(min));
	max = parseInt(Number(max));

	if(isNaN(min)) return 0;
	if(isNaN(max)) return 0;

	var maxLength = max.toString().length; 
	var valueStr = Math.random() +"E"+maxLength;
	var val = parseInt(new Number(valueStr)); 
	console.log('=====getSection========'+val);
	if(val&&val > min && val <max){
		console.log('=====getSection====333===='+val);
		return val;
	}
}

/*
* 获取指定个数的 随机整数  范围[2,32]
* @param n 需要的整数个数
* @return {array}  返回包含n个整数的数组，如果n非法返回空数组
**/
function getNRandomArr(n){
	var arr = [],min = 1, max = 33;
	//Todo check 
	if(!isThere(n)) return [];
	if(!typeOk(n) && !isOkStr(n)) return [];
	n = formaIntNumber(n);
	if(!israngeOk(n,min,max)) return [];
	for(var i = 0; i < n ; i++){
		var value = getRandom(min,max);// 获取区间随机数
		if(checkInArrs(arr,value)){
			i--;
		}else{
			arr.push(value);
		}
	}

	return arr;
}