/*IIFE*/
/*bad example*/
var x = 10,
    y = 100;
 
// Declaring variables in the global scope is resulting in global scope pollution. All variables declared like this
// will be stored in the window object. This is very unclean and needs to be avoided.
console.log(window.x + ' ' + window.y);


/*good example*/
// We declare a IIFE and pass parameters into the function that we will use from the global space
(function(log, w, undefined){
  'use strict';
 
  var x = 10,
      y = 100;
 
  // Will output 'true true'
  log((w.x === undefined) + ' ' + (w.y === undefined));
 
}(window.console.log, window));


/*IIFE 立即执行函数*/
/*bad example*/
(function(){})();

/*good example*/
(function($, w, d){
  'use strict';
 
  $(function() {
    w.alert(d.querySelectorAll('div').length);
  });
}(jQuery, window, document));

/*定义域和定义域提升*/
//错误原代码:
(function(log){
  'use strict';
 
  var a = 10;
 
  for(var i = 0; i < a; i++) {
    var b = i * i;
    log(b);
  }
 
  if(a === 10) {
    var f = function() {
      log(a);
    };
    f();
  }
 
  function x() {
    log('Mr. X!');
  }
  x();
 
}(window.console.log));

//提升之后
(function(log){
  'use strict';
  // All variables used in the closure will be hoisted to the top of the function
  var a,
      i,
      b,
      f;
  // All functions in the closure will be hoisted to the top
  function x() {
    log('Mr. X!');
  }
 
  a = 10;
 
  for(i = 0; i < a; i++) {
    b = i * i;
    log(b);
  }
 
  if(a === 10) {
    // Function assignments will only result in hoisted variables but the function body will not be hoisted
    // Only by using a real function declaration the whole function will be hoisted with its body
    f = function() {
      log(a);
    };
    f();
  }
 
  x();
 
}(window.console.log));

//有效代码
(function(log){
  'use strict';
 
  var a = 10;
 
  i = 5;
 
  x();
 
  for(var i; i < a; i++) {
    log(b);
    var b = i * i;
  }
 
  if(a === 10) {
    f = function() {
      log(a);
    };
    f();
 
    var f;
  }
 
  function x() {
    log('Mr. X!');
  }
 
}(window.console.log));


/*boolean判断*/
(function(log){
  'use strict';
 
  log('0' == 0); // true
  log('' == false); // true
  log('1' == true); // true
  log(null == undefined); // true
 
  var x = {
    valueOf: function() {
      return 'X';
    }
  };
 
  log(x == 'X');
 
}(window.console.log));

/*明智处理判断*/
function(log){
  'use strict';
 
  function logTruthyFalsy(expr) {
    if(expr) {
      log('truthy');
    } else {
      log('falsy');
    }
  }
 
  logTruthyFalsy(true); // truthy
  logTruthyFalsy(1); // truthy
  logTruthyFalsy({}); // truthy
  logTruthyFalsy([]); // truthy
  logTruthyFalsy('0'); // truthy
 
  logTruthyFalsy(false); // falsy
  logTruthyFalsy(0); // falsy
  logTruthyFalsy(undefined); // falsy
  logTruthyFalsy(null); // falsy
  logTruthyFalsy(NaN); // falsy
  logTruthyFalsy(''); // falsy
 
}(window.console.log));



/*变量赋值*/
/*bad*/
if(!x) {
  if(!y) {
    x = 1;
  } else {
    x = y;
  }
}
/*good*/
x = x || y || 1;


/*这一小技巧经常用来给方法设定默认的参数*/
function(log){
  'use strict';
 
  function multiply(a, b) {
    a = a || 1;
    b = b || 1;
 
    log('Result ' + a * b);
  }
 
  multiply(); // Result 1
  multiply(10); // Result 10
  multiply(3, NaN); // Result 3
  multiply(9, 5); // Result 45
 
}(window.console.log));


/*嵌套函数*/
/*bad example*/

if (x) {
  function foo() {}
}

/*good example*/

if (x) {
  var foo = function() {};
}





/*简易的原型继承*/
(function(log){
  'use strict';
 
  // Constructor function
  function Apple(name) {
    this.name = name;
  }
  // Defining a method of apple
  Apple.prototype.eat = function() {
    log('Eating ' + this.name);
  };
 
  // Constructor function
  function GrannySmithApple() {
    // Invoking parent constructor
    Apple.prototype.constructor.call(this, 'Granny Smith');
  }
  // Set parent prototype while creating a copy with Object.create
  GrannySmithApple.prototype = Object.create(Apple.prototype);
  // Set constructor to the sub type, otherwise points to Apple
  GrannySmithApple.prototype.constructor = GrannySmithApple;
 
  // Calling a super method
  GrannySmithApple.prototype.eat = function() {
    // Be sure to apply it onto our current object with call(this)
    Apple.prototype.eat.call(this);
 
    log('Poor Grany Smith');
  };
 
  // Instantiation
  var apple = new Apple('Test Apple');
  var grannyApple = new GrannySmithApple();
 
  log(apple.name); // Test Apple
  log(grannyApple.name); // Granny Smith
 
  // Instance checks
  log(apple instanceof Apple); // true
  log(apple instanceof GrannySmithApple); // false
 
  log(grannyApple instanceof Apple); // true
  log(grannyApple instanceof GrannySmithApple); // true
 
  // Calling method that calls super method
  grannyApple.eat(); // Eating Granny Smith\nPoor Grany Smith
 
}(window.console.log));


/*闭包理解*/

//不推荐
(function(log, w){
  'use strict';
 
  // numbers and i is defined in the current function closure
  var numbers = [1, 2, 3],
      i;
 
  for(i = 0; i < numbers.length; i++) {
    w.setTimeout(function() {
      // At the moment when this gets executed the i variable, coming from the outer function scope
      // is set to 3 and the current program is alerting the message 3 times
      // 'Index 3 with number undefined
      // If you understand closures in javascript you know how to deal with those cases
      // It's best to just avoid functions / new closures in loops as this prevents those issues
 
      w.alert('Index ' + i + ' with number ' + numbers[i]);
    }, 0);
  }
 
}(window.console.log, window));


//改进中 已解决问题，而且也遵循了规范。可是，你会发现看上去似乎过于复杂繁冗了，应该会有更好的解决方案吧

(function(log, w){
  'use strict';
 
  // numbers and i is defined in the current function closure
  var numbers = [1, 2, 3],
      i;
 
  // Create a function outside of the loop that will accept arguments to create a
  // function closure scope. This function will return a function that executes in this
  // closure parent scope.
  function alertIndexWithNumber(index, number) {
    return function() {
      w.alert('Index ' + index + ' with number ' + number);
    };
  }
 
  // First parameter is a function call that returns a function.
  // ---
  // This solves our problem and we don't create a function inside our loop
  for(i = 0; i < numbers.length; i++) {
    w.setTimeout(alertIndexWithNumber(i, numbers[i]), 0);
  }
 
}(window.console.log, window));

//改进 将循环语句转换为函数执行的方式问题能得到立马解决，每一次循环都会对应地创建一次闭包。
//函数式的风格更加值得推荐，而且看上去也更加地自然和可预料。
(function(log, w){
  'use strict';
 
  // numbers and i is defined in the current function closure
  var numbers = [1, 2, 3],
      i;
 
  numbers.forEach(function(number, index) {
    w.setTimeout(function() {
      w.alert('Index ' + index + ' with number ' + number);
    }, 0);
  });
 
}(window.console.log, window));

/*函数式风格*/
/*往往在重代码性能轻代码维护的情况之下,要选择最优性能的解决方案而非维护性高的方案（比如用简单的循环语句代替 forEach）*/
/*bad*/
(function(log){
  'use strict';
  var arr = [10, 3, 7, 9, 100, 20],
      sum = 0,
      i;
  for(i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  log('The sum of array ' + arr + ' is: ' + sum);
}(window.console.log));

/*good*/
(function(log){
  'use strict';
 
  var arr = [10, 3, 7, 9, 100, 20];
 
  var sum = arr.reduce(function(prevValue, currentValue) {
    return prevValue + currentValue;
  }, 0);
 
  log('The sum of array ' + arr + ' is: ' + sum);
 
}(window.console.log));

/*例子：通过某一规则对一个数组进行过滤匹配来创建一个新的数组。*/
/*bad*/
(function(log){
  'use strict';
 
  var numbers = [11, 3, 7, 9, 100, 20, 14, 10],
      numbersGreaterTen = [],
      i;
 
 
  for(i = 0; i < numbers.length; i++) { if(numbers[i] > 10) {
      numbersGreaterTen.push(numbers[i]);
    }
  }
 
  log('From the list of numbers ' + numbers + ' only ' + numbersGreaterTen + ' are greater than ten');
 
}(window.console.log));

/*good*/
(function(log){
  'use strict';
 
  var numbers = [11, 3, 7, 9, 100, 20, 14, 10];
 
  var numbersGreaterTen = numbers.filter(function(element) {
    return element > 10;
  });
  log('From the list of numbers ' + numbers + ' only ' + numbersGreaterTen + ' are greater than ten');
 
}(window.console.log));

/*对象数据问题*/

/*bad*/
// Length is 3.
var a1 = new Array(x1, x2, x3);
 
// Length is 2.
var a2 = new Array(x1, x2);
 
// If x1 is a number and it is a natural number the length will be x1.
// If x1 is a number but not a natural number this will throw an exception.
// Otherwise the array will have one element with x1 as its value.
var a3 = new Array(x1);
 
// Length is 0.
var a4 = new Array();

/*good*/

var a = [x1, x2, x3];
var a2 = [x1, x2];
var a3 = [x1];
var a4 = [];


/*bad*/
var o = new Object();
 
var o2 = new Object();
o2.a = 0;
o2.b = 1;
o2.c = 2;
o2['strange key'] = 3;

/*good*/
var o = {};
var o2 = {
  a: 0,
  b: 1,
  c: 2,
  'strange key': 3
};


/*Angularjs*/
/* avoid */    
angular
  .module('app', ['ngRoute'])
  .controller('SomeController' , SomeController)
  .factory('someFactory' , someFactory);

function SomeController() { }

function someFactory() { }


/*修改*/
/* recommended */

// app.module.js
angular
    .module('app', ['ngRoute']);
/* recommended */

// someController.js
angular
      .module('app')
      .controller('SomeController' , SomeController);

function SomeController() { }
/* recommended */

// someFactory.js
angular
      .module('app')
      .factory('someFactory' , someFactory);

function someFactory() { }


/*DI一来机制*/
module.factory('Service', function ($rootScope, $timeout, MyCustomDependency1, MyCustomDependency2) {
  return {
    //Something
  };
});


// 这是把业务逻辑放在控制器的常见做法
angular.module('Store', [])
.controller('OrderCtrl', function ($scope) {

  $scope.items = [];

  $scope.addToOrder = function (item) {
    $scope.items.push(item);//-->控制器中的业务逻辑
  };

  $scope.removeFromOrder = function (item) {
    $scope.items.splice($scope.items.indexOf(item), 1);//-->控制器中的业务逻辑
  };

  $scope.totalPrice = function () {
    return $scope.items.reduce(function (memo, item) {
      return memo + (item.qty * item.price);//-->控制器中的业务逻辑
    }, 0);
  };
});

/*事件类型，全局建议定义*/
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Custom events:
 - 'authorization-message' - description of the message
   - { user, role, action } - data format
     - user - a string, which contains the username
     - role - an ID of the role the user has
     - action - specific ation the user tries to perform
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*filter规则使用*/
function myFormat() {
 return function () {
   // ...
 };
}
module.filter('myFormat', myFormat);

function MyCtrl($scope, myFormatFilter) {
 // ...
}

module.controller('MyCtrl', MyCtrl);

/*驼峰命名方式*/
/*用首字母大写的驼峰法命名你自己的服务, 把服务写成构造函数的形式*/
function MainCtrl($scope, User) {
  $scope.user = new User('foo', 42);
}

module.controller('MainCtrl', MainCtrl);

function User(name, age) {
  this.name = name;
  this.age = age;
}

module.factory('User', function () {
  return User;
});

/*把业务逻辑封装到服务中，把业务逻辑抽象为服务作为你的 model*/
//Order is the 'model'
angular.module('Store')
.factory('Order', function () {
    var add = function (item) {
      this.items.push (item);
    };

    var remove = function (item) {
      if (this.items.indexOf(item) > -1) {
        this.items.splice(this.items.indexOf(item), 1);
      }
    };

    var total = function () {
      return this.items.reduce(function (memo, item) {
        return memo + (item.qty * item.price);
      }, 0);
    };

    return {
      items: [],
      addToOrder: add,
      removeFromOrder: remove,
      totalPrice: total
    };
});

/*将业务逻辑封装成 service 而非 factory，这样我们可以更容易在服务间实现“经典式”继承*/
function Human() {
  //body
}
Human.prototype.talk = function () {
  return "I'm talking";
};

function Developer() {
  //body
}
Developer.prototype = Object.create(Human.prototype);
Developer.prototype.code = function () {
  return "I'm coding";
};

myModule.service('human', Human);
myModule.service('developer', Developer);

/*如果给定的服务需要配置，把配置相关代码放在 config 回调里*/
angular.module('demo', [])
.config(function ($provide) {
  $provide.provider('sample', function () {
    var foo = 42;
    return {
      setFoo: function (f) {
        foo = f;
      },
      $get: function () {
        return {
          foo: foo
        };
      }
    };
  });
});

var demo = angular.module('demo');

demo.config(function (sampleProvider) {
  sampleProvider.setFoo(41);
});


/*代码顺序的约定*/
APP.controller(function(){ 
  // scope底下的对象最先声明 / 
  $scope.somting = {}; 
  // controller局部变量 / 
  var somting; 
  // scope底下的function /
   $scope.doSomting = function(){} 
   // controller局部函数 /
    var doSomting = function(){}

})


/*基础数据模型定义的约定*/
app.factory("userService",function($resource){ 
  var userList = [];
   //将userList数据本地化 
   var getList = function(){//来自后台数据} 
   var get = function(id,callback){//来自后台数据} 
   var update = function(id,user,callback){//来自后台数据} 
   var delete= function(id,callback){//来自后台数据}
})

/*试图模型定义的约定*/
//页面视图控制数据模型 
$scope.views = { 
  somting : "", 
  isSomting : true, 
  chooseSomting : function(){ 
    this.sonting = "";
    },
   oneObj:{ 
      oneType : "", 
      showOne : fucntion(){ 
          this.one = ""; 
        } 
    } 
}

//后台返回数据模型 
$scope.somting = somtingService.get();

/*业务数据模型定义的约定*/
$scope.somtingSelectedList = [
{ id : 1, ... selected : true },
{ id : 2, ... selected : true },
{ id : 3, ... selected : false }
]