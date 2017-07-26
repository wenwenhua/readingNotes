// 动态脚本元素
function loadScript (url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        }
    } else { // 其他浏览器
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementByTagName("head")[0].appendChild(script);
}

// XMLHttpRequest 脚本注入
var xhr = new XMLHttpRequest();
xhr.open("get", "file1.js", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.text = xhr.responseText;
            document.body.appendChild(script);
        }
    }
};
xhr.send(null);


// 简化catch子句对性能的影响
try {
    // 。。。。
} catch (ex) {
    // 委托错误处理函数
    handleWError();
}

// 修改DOM对比
function innerHTMLLoop () {
    for (var i = 0; i < 15000; i++) {
        document.getElementById('here').innerHTML += 'a';
    }
}

function innerHTMLLoop2 () {
    var content = '';
    for (var i = 0; i < 15000; i++) {
        content += 'a';
    }
    document.getElementById('here').innerHTML += content;
}


function collectionNodesLocal () {
    var coll = document.getElementsByTagName('div'),
    len = coll.length,
    name = '',
    el = null;
    for (var i = 0; i < len; i++) {
        el = coll[i];
        name = el.nodeName;
        name = el.nodeType;
        name = el.tagName;
    }
    return name;
}