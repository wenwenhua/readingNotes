function Person (name) {
    this.name = name;
}
Person.prototype.getName = function () {
    return this.name;
};
var objFactory = function () {
    var obj = new Object(),
           Constructor = [].shift.call(arguments);
    console.log(Constructor, 1);
    obj.__proto__ = Constructor.prototype;
    console.log(obj.__proto__, 2);
    console.log(arguments);
    var ret = Constructor.apply(obj, arguments);
    console.log(ret, 3);
    return typeof ret === 'object' ? ret : obj;
}
var a = objFactory(Person, 'sven');
console.log(a.name);   // sven

// ES6的class语法
class Animal {
    constructor (name) {
        this.name = name;
    }
    getName () {
        return this.name;
    }
}
class Dog extends Animal {
    constructor (name) {
        super(name);
    }
    speak () {
        return "woof"
    }
}
var dog = new Dog('Scamp');
console.log(dog.getName() + " says " + dog.speak());  //   Scamp says woof


// 实现bind()函数
if (!Function.prototype.bind) {
    Function.prototype.bind = function (context) {
        var self = this,
                // 绑定this的上下文
               context = [].shift.call(arguments),
               // 将剩余的参数转成数组
               args = [].slice().call(arguments);
        return function () {
            console.log([].concat.call(args, [].slice().call(arguments)));
            return self.apply(context, [].concat.call(args, [].slice().call(arguments)));
        };
    }
}

var obj = {
    name: 'sven'
}
var func = function (a, b, c, d){
    alert(this.name);
    alert([1,2,3,4]);
}.bind(obj, 1, 2);
func(3, 4)


(function () {
    Array.prototype.push.call(arguments, 3);
    // [].push.call(arguments, 3);
    console.log(arguments);
})(1, 2)

// 闭包的应用
var TV = {
    open: function () {
        console.log('打开');
    },
    close: function () {
        console.log('关闭');
    }
};
var OpenTVCommand = function (receiver) {
    this.receiver = receiver;
}
OpenTVCommand.prototype.execute = function () {
    this.receiver.open();
}
OpenTVCommand.prototype.undo = function () {
    this.receiver.close();
}
var setCommand = function (command) {
    document.getElementById('execute').onclick = function () {
        command.execute();
    }
    document.getElementById('undo').onclick = function () {
        command.undo();
    }
}
setCommand(new OpenTVCommand(TV));

// 命令模式
var TV = {
    open: function () {
        console.log('打开');
    },
    close: function () {
        console.log('关闭');
    }
};
var createCommand = function (receiver) {
    var execute = function () {
        return receiver.open();
    }
    var undo = function () {
        return receiver.close();
    }
    return {
        execute: execute,
        undo: undo
    }
}
var setCommand = function (command) {
    document.getElementById('execute').onclick = function () {
        command.execute();
    }
    document.getElementById('undo').onclick = function () {
        command.undo();
    }
}
setCommand(createCommand(TV));


// 回调函数
 var appendDiv = function (callback) {
    for (var i = 0; i < 100 ; i++) {
        var div = document.createElement('div');
        div.innerHTML = i;
        document.body.appendChild(div);
        if (typeof callback === 'function') {
            callback(div);
        }
    }
 }
 appendDiv(function (node) {
    node.style.display = 'none';
 });

 var getUserInfo = function (userID, callback) {
    $.ajax('htttp://xxx.com/getUserInfo' + userID, function(data){
        if (typeof callback === 'function') {
            callback(data);
        }
    });
 }
 getUserInfo(13231, function (data) {
    alert(data.userName);
 });



/* 高阶函数的应用 */
// AOP：把一些和核心业务逻辑模块无关的功能抽离出来
// 特别和巧妙的装饰者模式
Function.prototype.before = function (beforefn) {
    // 保存原函数的引用
    var __self = this;
    // 返回包含原函数和新函数的”代理“函数
    return function () {
        // 执行新函数，修正this
        beforefn.apply(this, arguments);
        // 执行原函数
        return __self.apply(this, arguments);
    }
}
Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}
var func = function () {
    console.log(2);
}
func = func.before(function(){
    console.log(1);
}).after(function(){
    console.log(3);
});
func();  // func = function () {var ret = __self.apply(this, arguments); afterfn.apply(this, arguments); return ret; }


// 函数柯里化
var cost = (function {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            var money = 0;
            for (var i = 0, l = args.length; i<l; i++) {
                money += args[i];
            }
        }else{
            [].push.apply(args, arguments);
        }
    }
})();
cost(100);
cost(200);
cost(300);
cost(400);
cost(500);
cost();

// 通用的currying函数
var currying = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        }else{
            [].push.apply(this, arguments);
            return arguments.callee;
        }
    }
}
var cost = (function () {
    var money = 0;
    return function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
})();
var cost = currying(cost);
cost(100);
cost(200);
cost(300);
cost(400);
cost(500);
cost();



// uncurrying实现方式之一：把泛化this的过程提取出来
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
}
var push = Array.prototype.push.uncurrying();
(function () {
    push(arguments, 4);
    console.log(arguments);
})(1, 2, 3);

// uncurrying实现方式之二
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
}


// throttle函数
var throttle = function (fn, interval) {
    var __self = fn, //保存需要被执行的函数的引用
        timer, //定时器
        firstTime = true; //是否是第一次调用

    return function () {
        var args = arguments,
            __me = this;

        if (firstTime) { //如果是第一次调用，不需要延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }

        if (timer) { //如果定时器还在，说明前一次的延迟执行没有完成
            return false;
        }

        timer = setTimeout(function () { //延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500);
    };
};
window.onresize = throttle(function () {
    console.log(1);
}, 500);



// 分时函数
// 解决在短时间内往页面中大量添加DOM节点导致浏览器卡顿假死问题
var timeChunk = function (ary, fn, count) {
    var obj, t;
    var len = ary.length;
    var start = function () {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    };

    return function () {
        t = setInterval(function () {
            if (ary.length === 0) {
                return clearInterval(t);
            }
            start();
        }, 200);
    };
};
var ary = [];
for (var i = 0; i <= 1000; i++) {
   ary.push(i);
}
var renderFriendList = timeChunk(ary, function (n) {
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8)
renderFriendList();


// 惰性加载
var addEvent = (function(){
    if (window.addEventListener) {
        return function (elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    }
    if (window.attachEvent) {
        return function (elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
})();





/*  设计模式之单例模式  */
var Singleton = function (name) {
    this.name = name;
    this.instance = null;
}
Singleton.prototype.getName = function () {
    console.log(this.name);
}
Singleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
}
// 或者Singleton.getInstance这样写
Singleton.getInstance = (function () {
    var instance = null;
    return function (name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();
var a = Singleton.getInstance('svea');
var b = Singleton.getInstance('sveb');
console.log(a === b); //true

//用代理实现单例模式（推荐）
var CreateDiv = function (html) {
    this.html = html;
    this.init();
}
CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}
var ProxySingletonCreateDiv = (function () {
    var instance;
    return function (html) {
        if (!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();
var a = new ProxySingletonCreateDiv('svena');

// 通用的惰性单例
// 管理单例的逻辑代码
var getSingle = function (fn) {
    var result;
    return function () {
        // 探寻this指向
        console.log(this);
        return result || (result = fn.apply(this, arguments));
    }
};
// 创建对象的代码
var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = 'hahahahah';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}
var createSLL = getSingle(createLoginLayer);
createSLL();







