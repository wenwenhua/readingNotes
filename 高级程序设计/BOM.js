function getQueryString(){
  var search = (location.search.length > 0 ? search.substring(1) : "");
  var args = [], name = null, value = null;
  var i = 0, item = null, arr = search.length > 0 ? search.split("&") : "";
  for( i=0;var len = arr.length,i < len;i++ ){
    item = arr[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
}


// 检测插件（在IE中无效）
function hasPlugin(name){
  name = name.toLowerCase();
  for(var i = 0;var len = navigator.plugins.length,i < length;i++){
    if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
      return true;
    }
  }
  return false;
}

// 动态脚本
function loadScript(url){
  var script = document.createElement("script");
  var script.type = "text/javascript";
  var script.src = url;
  document.body.appendChild(script);
}

function loadScript(code){
  var script = document.createElement("script");
  script.type = "text/javascript";
  try{
    script.appendChild(document.createTextNode(code));
  }catch(ex){
    script.text = code;
  }
}

function loadStyle(css){
  var style = document.createElement("style");
  style.type = "text/css";
  try{
    style.appendChild(document.createTextNode(css));
  }catch(ex){
    style.styleSheet = css;
  }
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}

// 创建表格
// 使用核心DOM方法
// create table
var table = document.createElement("table");
table.border = 1;
table.width ="100%";

// crete tbody
var tbody = document.createElement("tbody");
// append tbody
table.appendChild(tbody);

//create first row
var row1 = document.createElement("tr");
tbody.appendChild(row1);
var cell1_1 = document.createElement("td");
cell1_1.appendChild(cell1_1);
var cell1_2 = document.createElement("td")
cell1_2.appendChild(cell1_2);
// append to body
document.body.appendChild(table);
