// 例如
var b;
var doSomethingElse = function (a) {
    return a -1;
}
var doSomething = function (a) {
    b = a + doSomethingElse(a * 2);
    console.log(b * 3);
}
doSomething(2); // 15
// 具体实现隐藏，最小限度暴露必要内容
var doSomething = function (a) {
    var doSomethingElse = function (a) {
        return a - 1;
    };
    var b;
    b = a + doSomethingElse(a * 2);
    console.log(b * 3);
}
doSomething(2); //15

// 全局命名空间
var my_name_space = {
    awesome: "stuff",
    doSomething: function () {
        //
    },
    doAntherThing: function () {
        //
    }
}

//立即执行的匿名函数
(function (){
    ...
    ...
})();

//立即执行的具名函数
(function foo(){
    ...
    ...
})();

(function(){...}())

//场景一：当作函数调用并传参
var a = 2;
(function IIFE(global){
    console.log(global.a); //2
})(window);

// 场景二：解决undefined标识符的默认值被错误覆盖导致的异常
undefined = true; // 不要随意改变
(function IIFE(undefined){
    var a;
    if (a === undefined) {
        console.log("undefined is safe here");
    }
})();

// 场景三：倒置代码的运行顺序，将需要运行的函数放在第二位，在IIFE执行之后当作参数传进去
var a = 2;
(function IIFE(def){
    def(window);
})(function def(global){
    var a = 3;
    console.log(a);//3
    console.log(global.a);//2
});

// with的使用场景
var obj = {
    a: 1,
    b: 2
}
// 重复乏味单调的obj
obj.a = 4;
obj.b = 6;
// 使用with的快捷方式
with (obj) {
    a =4;
    b = 6;
}
// try/catch
try {
    undefined();
}catch(err){
    // err只在这个catch语句内有效
    console.log(err);
}

// let场景一
function process(data) {...}
// 在这个块中定义的内容完事可以销毁
{
    let someReallyBigData = {...};
    process(someReallyBigData)
}
var btn = document.getElementById('my_btn');
btn.addEventListener("click", function click(evt){
    console.log('test');
}, false);
// let场景二
for (let i = 0; i < 10; i++) {
    console.log('test');
}
// const
var foo = true;
if (foo) {
    var a = 2;
    const b = 3;
    a = 3; //正常
    b = 4; //错误
}
console.log(a); //3
console.log(b);//ReferenceError

a = 2;
var  a;
console.log(a); //2

console.log(b); //undefined
var b = 3;

// 提升后
foo(); //TypeError
bar(); //ReferenceError
var foo = function bar() { ... }

// 提升后
var foo;
foo(); //TypeError
bar(); //ReferenceError
foo = function() { var bar = ...self... };

// 提升前
foo();//test1
var foo;
 function foo() { console.log('test1'); };
 foo = function () { console.log('test2');};
// 提升后
function foo() { console.log('test1');};
// 被忽略
// var foo;
foo();//test1
foo = function () {console.log('test2');}
// var foo 尽管出现在 function foo() .. 的声明之前，但是它是重复的声明（因此被忽略了），因为函数声明会被提升到普通变量之前。
// 但出现在后面的函数声明还是可以覆盖前面的

foo(); //3
function foo() {
    console.log(1);
}
var foo = function () {
    console.log(2);
}
function foo () {
    console.log(3);
}

foo(); //3
var a = true;
if (a) {
    function foo() { console.log(1);}
}else{
    function foo() { console.log(3);}
}

// 闭包
function foo () {
    var a = 2;
    function bar () {
        console.log(a);
    }
    return bar;
};
var baz = foo();

function foo () {
    var a = 2;
    function baz () {
        console.log(a); //2
    }
    bar(baz);
}
function bar (fn){
    fn(); //闭包
}

var fn;
function foo () {
    var a = 2;
    function baz () {
        console.log(a);
    }
    fn = baz; //将baz分配给全局变量
}
function bar () {
    fn();// 闭包
}
foo();
bar();

//setTimeout()
function wait (messages) {
    setTimeout(function timer() {
        console.log(messages);
    }, 1000)
}
wait('2345看图王');

// 循环与闭包
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer () {
        console.log(i);
    }, i * 1000);
}
// 循环改写
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer () {
            console.log(j);
        }, j * 1000);
    })(i);
}

for (let i = 1; i <= 5; i++) {
    setTimeout(function timer () {
        console.log(i);
    }, i * 1000);
}

// 模块
function CoolModule () {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething () {
        console.log(something);
    }
    function doAnother () {
        console.log(another.join("!"));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}
var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); //1!2!3

// 单例模块
var foo = (function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];

    function doSomething () { ... }
    function doAnother () { ... }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
})();
foo.doSomething();
foo.doAnother();


function baz () {
    // 当前调用栈是：baz
    // 调用位置是全局作用域
    console.log('baz');
    bar(); // bar的调用位置
}

function bar () {
    // 当前调用栈是baz -> bar
    // 调用位置是baz()中
    console.log('bar');
    foo(); //foo的调用位置
}
function foo () {
    // 当前调用栈是baz bar foo
    // 因此当前调用位置在bar中
    console.log('foo');
}
baz(); //baz的调用位置


//默认绑定
function foo () {
    "use strict";
    console.log(this.a);
}
var a = 2;
foo();  //  TypeError: this is undefined

function foo () {
    console.log(this.a);
}
var a = 2;
(function () {
    "use strict";
    foo();  //  2
})();

// 隐式绑定
function foo () {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
}
obj.foo(); //2
// 对象的引用链中只有上一层或者说最后一层在调用位置中起作用
function foo () {
    console.log(this.a);
}
var obj2 = {
    a: 42,
    foo: foo
}
var obj1 = {
    a: 2,
    obj2: obj2
}
obj1.obj2.foo();  //42，this绑定到obj2上
// 隐式丢失：被隐式绑定的函数会丢失绑定对象，然后应用默认绑定。
function foo () {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
}
var bar = obj.foo; //函数别名
var a = "oops, global";
bar(); // oops, global, this绑定到全局对象：bar是obj.foo的一个引用，引用的实际上是foo函数本身，所以此时bar()其实是一个不带任何修饰的独立函数调用。

// 在传入回调函数时隐式丢失
function foo () {
    console.log(this.a);
}
function doFoo (fn) {
    fn();  //调用位置
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global";  //全局变量a
doFoo(obj.foo);  //oops, global   参数传递其实就是隐式赋值；回调函数丢失this比较常见，回调函数可能会修改this
function foo () {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
}
var a = "oops,global";
setTimeout(obj.foo, 100); //oops,global

// 硬绑定
function foo () {
    console.log(this.a);
}
var obj = {
    a: 2
}
var bar = function () {
    foo.call(obj);
}
bar(); //2
setTimeout(bar, 100); //2
// 硬绑定的bar不能再修改它的this指向
bar.call(window); //2

// 硬绑定的使用场景①
function foo (something) {
    console.log(this.a, something);
    return this.a + something;
}
var obj = {
    a: 2
};
var bar = function () {
    return foo.apply(obj, arguments);
}
var b = bar(3); //2 3
console.log(b); //5

// 硬绑定的使用场景②
function foo (something) {
    console.log(this.a, something);
    return this.a + something;
}
// 简单的辅助绑定函数
function bind (fn, obj) {
    return function () {
        return fn.apply(obj, arguments);
    };
}
var obj = {
    a: 2
}
var bar = bind(foo, obj);
var b = bar(3); //2  3
console.log(b); //  5

function Foo (a) {
    this.a = a;
}
var bar = new Foo(2);
console.log(bar.a); // 2

var MyClass = function () {
    this.name = 'sven';
    console.log(this);
    return {
        name: 'anne'
    }
}
var obj = new MyClass();
console.log(obj.name);  //anne

function foo () {
    console.log(this.a);
}
var a = 2;
foo.call(null); //2

function foo (a, b){
    console.log(a + b);
}
// 创建空对象
var $ = Object.create(null);
//数组展开成参数
foo.apply($, [2,3]); //5
// 使用bind进行柯里化
var bar = foo.bind($, 2);
bar(3); // 5

function foo () {
    console.log(this.a);
}
var a = 2;
var o = {a: 3, foo: foo};
var p = {a: 4};
o.foo(); //3
// p.foo = o.foo的返回值是目标函数的引用，因此调用位置是foo()
(p.foo = o.foo)();  //2

// 软绑定
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (obj) {
        var fn = this;
        // 捕获所有的curried参数
        var curried = [].slice.call(arguments, 1);
        var bound = function () {
            return fn.apply(
                (!this || this === (window || global)) ?
                obj : this,
                curried.concat.apply(curried, arguments);
                );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}

function foo () {
    console.log("name: " + this.name);
}
var obj = {name: "obj"},
    obj2 = {name: "obj2"},
    obj3 = {name: "obj3"};
var fooOBJ = foo.softBind(obj);
fooOBJ(); // name: obj
obj2.foo = foo.softBind(obj);
obj2.foo();  //  name: obj2
fooOBJ.call(obj3); //name:  obj3
setTimeout(obj2.foo, 10); // name: obj

// 箭头函数的词法作用域
function foo () {
    // 返回一个箭头
    return (a) => {
        // this继承自foo()
        console.log(this.a);
    };
}
var obj1 = {
    a: 2
};
var obj2 = {
    a: 3
};
var bar = foo.call(obj1);
bar.call(obj2); //2

// 对象
var strPrimitive = "I am a string";
typeof strPrimitive;  //  string
strPrimitive instanceof String;  //false
var strObject = new String("I am a string");
typeof strObject;  //Object
strObject instanceof String; // true


var obj = {
    a: 2
}
Object.preventExtensions(obj);
obj.b = 3;
obj.b; //undefined


var myObj = {
    // 给a定义一个getter
    get a () {
        return 2;
    }
};
Object.defineProperty(
    myObj, //目标对象
    "b",  //属性名
    {        //描述符
        get: function () { return this.a; },
        enumerable: true
    }
);
myObj.a; //2
myObj.b; //2

var myObj = {
    get a () {
        return this._a_;
    },
    set a (val) {
        this._a_ = val;
    }
}
myObj.a = 2;
myObj.a; //2

var myObj = {
    a: 2
};
("a" in myObj); // true
("b" in myObj); //false
myObj.hasOwnProperty("a"); //true
myObj.hasOwnProperty("b"); //false

// 显式混入
function mixin(sourceObj, targetObj){
    for (var key in sourceObj) {
        // 只会在不存在的情况下复制
        if (!(key in sourceObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
};
var Vehicle = {
    engines: 1,
    ignition: function () {
        console.log('Turning on my engine.');
    },
    drive: function () {
        this.ignition();
        console.log('Steering and moving forward');
    }
};
var Car = mixin(Vehicle, {
    wheels: 4,
    drive: function () {
        Vehicle.drive.call(this);
        console.log("Rolling on all");
    }
});

//寄生继承
//传统的js类Vehical
function Vehical () {
    this.engines = 1;
}
Vehicle.prototype.ignition = function () {
    console.log('Turning on my engine');
}
Vehicle.prototype.drive = function () {
    this.ignition();
    console.log('Steering and moving forward');
}
// 寄生类 Car
function Car() {
    // car是一个Vehicle
    var car = new Vehicle();
    // 对car进行定制
    car.wheels = 4;
    // 保存到Vehicle::drive()的特殊引用
    var vehDrive = car.drive;
    // 重写
    car.drive = function () {
        vehDrive.call(this);
        console.log('Rolling on all');
    }
    return car;
}
var myCar = new Car();
myCar.drive();
// 可以不使用new调用，避免创建并丢弃多余的对象。

// 隐式混入
var Something = {
    cool: function () {
        this.greeting = "Hello world";
        this.count = this.count ? this.count + 1 : 1;
    }
}
Something.cool();
Something.greeting; //"Hello World"
Something.count; //1
var Another = {
    cool: function () {
        Something.cool.call(this);
    }
}
Another.cool();
Another.greeting;
Another.count;


var anotherObject = {
    a: 2
};
var myObj = Object.create(anotherObject);
anotherObject.a; //2
myObj.a; //2
anotherObject.hasOwnProperty("a"); //true
myObj.hasOwnProperty("a"); //false
myObj.a++;
anotherObject.a;//2
myObj.a;//3
myObj.hasOwnProperty("a");//true


// 模仿类
function Foo (name) {
    this.name = name;
};
Foo.prototype.myName = function () {
    return this.name;
}
var a = new Foo("a");
var b = new Foo("b");
a.myName();  //a
b.myName();  //b

// 原型风格代码
function Foo (name) {
    this.name = name;
}
Foo.prototype.myName = function () {
    return this.name;
};
function Bar(name, label){
    Foo.call(this, name);
    this.label = label;
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.myLabel = function () {
    return this.label;
}
var a = new Bar("a", "obj a");

a.myName(); //a
a.myLabel();  //obj a

if (!Object.create) {
    Object.create = function (o) {
        function F() {};
        F.prototype = o;
        return new F();
    }
}


var anotherObject = {
    cool: function () {
        console.log('cool');
    }
};
var myObj = Object.create(anotherObject);
myObj.doCool = function () {
    this.cool(); //内部委托
};
myObj.doCool();


// 委托设计
Task = {
    setID : function (ID) { this.id = ID; }
    outputID : function () { console.log(this.id); }
};
// XYZ委托Task
XYZ = Object.create(Task);

XYZ.prepareTask = function (ID, Label) {
    this.setID(ID);
    this.label = Label;
}
XYZ.outputTaskDetails = function () {
    this.outputID();
    console.log(this.label);
}


// 典型的面向对象风格
function Foo (who) {
    this.me = who;
}
Foo.prototype.identify = function () {
    return "I am " + this.me;
}
function Bar (who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function () {
    console.log("hello" + this.identify() + ".");
}
var b1 = new Bar("b1");
var b2 = new Bar("b2");
b1.speak();
b2.speak();

// 对象关联风格：把b1 b2委托给Bar，把Bar委托给Foo。
var Foo = {
    init: function (who) {
        this.me = who;
    },
    identify: function () {
        return "I am " + this.me;
    }
}
var Bar = Object.create(Foo);
Bar.speak = function () {
    console.log("hello" + this.identify() + ".");
}
var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");
b1.speak();
b2.speak();