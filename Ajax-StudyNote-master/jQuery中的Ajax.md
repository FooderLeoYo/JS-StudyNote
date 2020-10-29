# jQuery中的Ajax

## 目录

[$.ajax()方法传递请求参数](#jump1)

[serialize方法](#jump2)

[发送jsonp请求](#jump3)
                      
[$.get()、$.post()方法概述](#jump4)

[jQuery中Ajax全局事件](#jump5)

---	

<span id="jump1"></span>

## $.ajax()方法传递请求参数

发送x-www-form-urlencoded请求：

```javascript
$.ajax({
  type: 'get',
  // 请求方式
  type: 'get',

  // 请求地址
  url: '/user',

  // 向服务器端发送的请求参数
  // 或：data: 'name=zhangsan&age=100'也行
  data: {
    name: 'zhangsan',
    age: 100
  },

  // 请求参数格式类型
  contentType: 'application/x-www-form-urlencoded',

  // 阻止请求发送
  beforeSend: function () {
    return false
  },

  // 请求成功以后函数被调用
  success: function (response) { },

  // 请求失败以后函数被调用
  error: function (xhr) { }
});
```

发送json请求：

```javascript
var params = { name: 'wangwu', age: 300 }

$.ajax({
  // 请求方式
  type: 'post',

  // 请求地址
  url: '/user',

  // 向服务器端发送的请求参数
  data: JSON.stringify(params),

  // 指定参数的格式类型
  contentType: 'application/json',

  // 阻止请求发送
  beforeSend: function () {
    return false
  },

  // 请求成功以后函数被调用
  success: function (response) { },

  // 请求失败以后函数被调用
  error: function (xhr) { }
})
```

---

<span id="jump2"></span>

## serialize方法

### 基本

作用：将表单中的数据自动拼接成字符串类型的参数

```javascript
var params = $('#form').serialize();
// name=zhangsan&age=30
```

### 封装serializeObject方法

serialize方法仅仅是把表单数据拼接成字符串，使用起来仍然不方便

因此我们需要自己封装一个方法，实现将表单中用户输入的内容转换为对象类型

```javascript
function serializeObject(obj) {
  // 处理结果对象
  var result = {};
  // [{name: 'username', value: '用户输入的内容'}, {name: 'password', value: '123456'}]
  var params = obj.serializeArray();

  // 循环数组 将数组转换为对象类型
  $.each(params, function (index, value) {
    result[value.name] = value.value;
  })
  // 将处理的结果返回到函数外部
  return result;
}
```

---

<span id="jump3"></span>

## 发送jsonp请求

```javascript
$.ajax({
    url: 'http://www.example.com',

    // 指定当前发送jsonp请求
    dataType: 'jsonp',

    // 修改向服务器端传递函数名字的参数名称，即?后的名称，默认是callback
    jsonp: 'cb',

    // 如果不想success作为回调函数，可以自行指定
	// 还需要在客户端的全局作用域下声明fnName函数
	// 不过一般很少这样做，都是直接使用success
    jsonCallback: 'fnName',

	// 成功后的回调
    success: function (response) {} 
})
```

---

<span id="jump4"></span>

## $.get()、$.post()方法概述

作用：$.get方法用于发送get请求，$.post方法用于发送post请求

```javascript
$.get('http://www.example.com', {name: 'zhangsan', age: 30}, function (response) {}) 
$.post('http://www.example.com', {name: 'lisi', age: 22}, function (response) {})
```

---

<span id="jump5"></span>

## jQuery中Ajax全局事件

### 全局事件

只要页面中有Ajax请求被发送，对应的全局事件就会被触发

```javascript
.ajaxStart()     // 当请求开始发送时触发
.ajaxComplete()  // 当请求完成时触发
```

### NProgress

官宣：纳米级进度条，使用逼真的涓流动画来告诉用户正在发生的事情

```html
<link rel='stylesheet' href='nprogress.css'/>
<script src='nprogress.js'></script>

```

```javascript
NProgress.start();  // 进度条开始运动 
NProgress.done();   // 进度条结束运动
```
