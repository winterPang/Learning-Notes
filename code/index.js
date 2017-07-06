/**
 * 实现js 深拷贝
 * 数据类型基本数据类型和引用数据类型（array object function）
 * 实现深拷贝：
 * 1、基本数据类型直接赋值
 * 2、引用类型只有遍历赋值（对象值存在内存中，不能直接操作内存，只能操作引用）
 * typeof 无法判断function 和array 。需要使用Object.prototype.toString方法
 */

function type(obj){
	var toString = Object.prototype.toString;
	var map = {
		"[object Boolean]":"boolean",
		"[object Number]":"number",
		'[object String]':"string",
		'[object Function]':'function',
		'[object Array]':'array',
		'[object RegExpl]':'regExp',
		'[object Date]':'date',
		'[object Undefined]':'undefined',
		'[object Null]':'null',
		'[object Object]':'object'
	}

	if(obj instanceof Element){
		return 'element';
	}

	return map[toString.call(obj)];
}


function deepClone(data){
	var t = type(data),o,i,ni;
	if(t ==='array'){
		o = [];
		for (i = 0; i< data.length; i++){
			o.push(data[i]);
		}
		return o;
	}else if(t ==='object'){
		0 = {};
		for(i in data){
			o[i] = data[i]
		} 
		return o;
	}else{
		return data;
	}

}

/**
 * JS实现对象继承方式
 * 1、组合继承
 * 2、原型式继承
 * 3、寄生式继承
 * 4、寄生组合式继承
 */


//原型式对象继承
//不需要预先定义构造函数的情况下实现继承，
//本质：执行对给定对象的浅复制。
//并且复制得到的副本还可以进一步改造
function object(o){
	function F(){};
	F.prototype = o;
	return new F;
}

var Person = {
	name:"历史",
	friends:['shell','Court','Van']
};

var antherPerson = object(Person);
antherPerson.name = '是是是';
antherPerson.friends.push('Rob');





/**
 * 对象创建  js模拟对象
 * 三个特性：
 * 1、封装
 * 2、继承
 * 3、多态
 * 
 */
/**
 *  封装特性讲解
 *  
 *  核心：
 *  将所需方法和属性抽象封装到一个Book类中
 *  
 *  对象封装创建方式：
 *  1、this 构造函数
 *  2、prototype原型对象上赋值
 *  问题：通过this 和 prototype对象创建的属性区别？
 *  答案：
 *  通过this定义的属性方法试实例对象自身拥有的，每次new 创建对象this指向实例本身.
 *  通过prototype对象定义的属性和方法，是每个实例通过作用域链（__proto__）进行查找创建对象的prototype查找
 *
 * 
 */
var Book = function(id,name,price){
	this.id = id;
	this.name = name;
	this.price = price;
}

Book.prototype.getPrice = function(){
	console.log(this.price)
}

var book = new Book('1',"设计模式"，100)

//test Code 
console.log(book.__proto__ == Book.prototype); //true

/**
 *  私有方法 属性 特权方法 对象公有属性 方法 构造器
 * 	问题：
 *  	Book 通过.或者prototype定义属性和方法区别
 *  答案：通过.定义，例如：Book.isChinese是类静态共有属性（t构造函数内部通过this访问不到），
 *  只有通过类访问。
 *  prototype定义的属性 方法是可以通过this访问.实例原型链(__proto__）指向父类的原型。称在上面定义的属性
 *  方法为共有属性/方法，
 *  	
 */
var Book = function(id,name,price){
	//私有属性 方法
	var num = 1;
	function checkId(){

	}
	//特权方法
	this.getName = function(){
		console.log(this.isChinese);//类静态公有属性 undefined
		console.log(this.isJsBook);//类公有属性 false
	};
	this.setName = function(){};
	//对象公有属性 方法
	this.id = id;
	this.copy = function(){};

	//构造函数(初始化数据)
	this.setName(name);
}

//类静态公有属性 方法
Book.isChinese = true;
Book.restTime = function(){
	console.log('new time');
}

//公有属性 方法
Book.prototype = {
	isJsBook :false,
	display : function(){}
}

/**
 * 创建对象闭包使用
 */
function Book(id,name,price){
	//静态私有属性 方法
	var isChinese = false;
	var restTime = function(){
		console.log('new time');
	}
	
	function _book() {
	    //私有属性 方法
	    var num = 1;

	    function checkId() {

	    }
	    //特权方法
	    this.getName = function() {
	        console.log(this.isChinese); //类静态公有属性 undefined
	        console.log(this.isJsBook); //类公有属性 false
	    };
	    this.setName = function() {};
	    //对象公有属性 方法
	    this.id = id;
	    this.copy = function() {};

	    //构造函数(初始化数据)
	    this.setName(name);
	}
	//公有属性 方法
	_book.prototype = {
		isJsBook :false,
		display : function(){}
	}
	return _book;
}

/**
 * 创建对象安全模式（防止忘记使用new）
*/

var Book  = function(id,name,price){
	if(this instanceof Book){
		this.id = id;
		this.name = name;
		this.price = price;
	}else{
		return new Book(id,name,price);
	}
}
	
/**
 * 二、继承
 * 对象继承特性
 */

//父类
function Animal(name){
	this.name = name;
	this.sleep = function(){
		console.log(this.name + "sleep")
	}
}

Animal.prototype.eat = function(food){
	console.log(this.name +"eating" + food);
}

/**
 * 原型链继承（类式继承）
 * 原理：
 * 将父类的实例作为子类的原型
 * 特点:
 * 纯粹的继承关系。实现是子类的实例，也是父类的实例。
 * 父类新增原型方法和原型属性，子类也可以访问到
 * 简单、易于实现
 * 缺点：
 * 1、想为子类新增属性和方法，必须new Animal()语句执行后，不能放到构造函数
 * 无法实现多继承
 * 2、来自原对象的【引用类型属性】是所有实例共享的（）
 * 3、创建子类实例时，【无法向父类构造函数传参】
 * 建议：
 * 不推荐
 * 
*/
function Cat(){}

Cat.prototype = new Animal();
Cat.prototype.name = 'cat';


//test代码
var cat = new Cat();
console.log(cat.name);
console.log(cat.eat('fish'));
console.log(cat.sleep());
//校验实现是否是子类、父类的实例
console.log(cat instanceof Animal);
console.log(cat instanceof Cat);


/**
 * 原型式继承()
 * 总结：对类式继承的抽象创建一个过渡对象
 */
function inheritObject(o){
	//声明过度对象
	function F(){};
	//过度函数的原型继承父对象
	F.prototype = o;

	return new F();
}
var cat = inheritObject(new Animal());



/**
 * 寄生式继承
 *
 * 
 */

var book = {
	name:"JS",
	alikeBook:['css book','js模拟对象']
}

function creatObject(book){
	//通过原型继承方式继承对象（寄生：寄托于过渡对象）
	var o = new inheritObject(book);
	o.getName = function(){
		console.log(this.name);
	}
	return o;
}

/**
 * 寄生组合继承
 * 核心：
 * 通过寄生方式，砍掉父类的实例属性，这样在调用两次父类的结构时，
 * 就不会初始化两次实例方法和属性，避免组合继承缺点
 * 特点：
 * 完美
 * 缺点
 * 实现复杂
 */

function inheritPrototype(subClass,superClass){
	/**
	 * 原型式继承()
	 * 总结：对类式继承的抽象创建一个过渡对象
	 */
	function inheritObject(o){
		//声明过度对象
		function F(){};
		//过度函数的原型继承父对象
		F.prototype = o;

		return new F();
	}
	//复制一份父类的原型副本保存在变量p
	var p  = inheritObject(superClass.prototype);
	//修正因为重写子类原型导致子类的constructor属性被修改
	p.constructor = subClass;
	//设置子类原型
	subClass.prototype = p;
}


//测试code
function SuperClass(name){
	this.name  = name;
	this.colors = ['red','blue'];
}

SuperClass.prototype.getName = function(){
	console.log(this.name);
}

function SubClass (name,time){
	//构造函数继承
	SuperClass.call(this,name);
	//子类新属性
	this.time = time;
}
//寄生式继承父类原型
inheritPrototype(SubClass,SuperClass);

SubClass.prototype.getTime = function(){
	console.log(this.time);
}

//测试实例
var instance1 =  new SubClass("lisi","444");
var instance2 =  new SubClass("语音","33");

instance1.colors.push("black");

console.log(instance1.colors);
console.log(instance2.colors);

instance2.getName();
instance2.getTime();

/**
 * 寄生组合继承
 * 核心：
 * 通过寄生方式，砍掉父类的实例属性，这样在调用两次父类的结构时，
 * 就不会初始化两次实例方法和属性，避免组合继承缺点
 * 特点：
 * 完美
 * 缺点
 * 实现复杂
 */
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}

(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
})();



// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true


/**
 * 构造继承
 * 原理：
 * 使用父类的构造函数来增强子类实例，
 * 等于是复制父类的实例属性给子类（没用到原型）
 * 特点：
 * 解决了原型继承中，子类实例共享父类引用属性问题
 * 创建子类实例时，可以向父类传达参数
 * 可以实现多继承（call多个父类对象）
 * 缺点：
 * 实例并不是父类的实例，只是子类实例
 * 只能继承父类的实例属性和方法，不能继承原型属性和方法
 * 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
 * 推荐：
 * 不推荐
 */

function Cat(name){
	Animal.call(this); //使用call继承
	this.name = name || 'Tom';
}

//test代码
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
//校验实现是否是子类、父类的实例
console.log(cat instanceof Animal); //false
console.log(cat instanceof Cat); //true

/**
 * 实例继承
 * 核心：
 * 为父类实例添加新特性，作为子类返回实例
 * 特点：
 * 不限制调用方式，不管是new子类()还是子类(),
 * 返回的对象具有相同效果
 * 缺点：
 * 1、实例是父类的实例，不是子类的实例
 * 2、不支持多继承
 * 推荐：
 * 不推荐
 */

function Cat(name){
	var instance = new Animal();
	instance.name = name ||'Tom';
	return instance;
}
//test 代码
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // false


/**
 * 拷贝继承
 * 特点：
 * 支持多继承
 * 缺点
 * 1、效率较低，内存占用高（拷贝父类的属性）
 * 2、无法获取父类不可枚举的属性和方法（）
 * 推荐
 * 严重建议不推荐
 */
function Cat(name){
	var animal  = new Animal();
	for(var v in animal){
		Cat.prototype[p] = animal[p];
	}
	Cat.prototype.name = name || 'Tom';
}

//test 测试
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true


/**
 * 组合继承
 * 核心：
 * 通过调用父类构造，继承父类的属性并保留传参的优点，
 * 然后通过将父类的实例作为子类原型，实现函数复用
 * （原型继承和构造继承组合）
 * 特点：
 * 1、弥补构造继承缺陷，可以继承实例属性和方法，也可以继承原型属性和方法
 * 2、即是子类实例，也是父类实例
 * 3、不存在引用属性共享问题
 * 4、可传参
 * 5、函数可以复用
 * 确点：
 * 调用了两次父类构造器，
 * 生成两份实例（子类实例将子类原型上的那份屏蔽）
 * 推荐：
 * 建议使用
 */

function Cat(name){
	Animal.call(this);
	this.name = name || "Tom"; 
}
Cat.prototype = new Animal();

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true




/**
 * 多继承
 * 多个对象拷贝继承扩展extend方法
 * 摘自jquery extend方法
 * 
 */
 function extend() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation 校验是否是深拷贝
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};



/*
* @{title}设计模式
*/


/*
* @{catalogName} 工厂模式
* @{type}
*   1.简单工厂模式
*	2.安全工厂模式
*	3.抽象工厂模式
*/

/*
*@{lists} 简单工厂模式
*@{description}
*	两种简单模式工厂方法
*	1.通过类实例化对象来创建
*	2.通过创建一个新对象然后包装该对象属性 功能来实现
*	结论：
*	1、创建多对象，根据不同类型生产不同对象实例化（如果存在集成关系）
*
*/

/*
* @{listItem} 实例化对象
*/

//定义不同对象，封装不同属性 功能
function Basketball(info){
	this.info = info;
}
Basketball.prototype = {
	name:"basketball",
	getPrice:function () {
		// body...
		cosnole.log(this.price);
	}
}
function Football(info){
	this.info = info;
}
Football.prototype = {
	name:"football",
	getPrice:function () {
		// body...
		cosnole.log(this.price);
	}
}
// 创建工厂函数
// 通过实例化不同对象return不同实例对象
function creatSportFactory(type,info){
	switch(type){
		case "basketball":
			return new Basketball(info);
		case "football":
			return new Football(info);
		default:
			return new Object();
	}
}

/*
* @{listItem} 创建新对象
*/
function creatSportFactory(type,info){
	var o = new Object();
	o.info = info;
	if(type == "basketball"){
		//TODO  特性
	}
	if(type == "football"){

	}
	return o;
}

/*
* @{lists} 安全工厂模式
*
*/

var Factory = function(type,content){
	if(this instanceof Factory){
		var o = new this[type](content);
	}else{
		new Factory(type,content);
	}
}

Factory.prototype = {
	java: function(content){
		//todo
	},
	ui: function(content){
		//todo
	}
}


/**
* @{lists}抽象工厂模式
* @{description}
*	抽象工厂模式，抽象类定义的方法只是显性的定义一些功能，没有具体实现。
*	一般不用于创建真实对象。
*
**/

function VehicleFactory(subType,superType){
	//判断抽象工厂是否有抽象类()
	if(typeof VehicleFactory(superType) === 'function'){
		//缓冲类
		function F(){};
		//集成父类的属性、方法
		F.prototype = new VehicleFactory[superType]();
		//将子类constructor指向子类
		subType.constructor = subType;
		//子类原型集成 "父类“
		subType.prototype = new F();

	}else{
		throw new Error('未创建该抽象类')
	}
}

//定义