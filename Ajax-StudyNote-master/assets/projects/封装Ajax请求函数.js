function ajax(options) {
  // 存储的是默认值
  var defaults = {
    type: 'get',
    url: '',
    data: {},
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function () { },
    error: function () { }
  };

  // 使用options对象中的属性覆盖defaults对象中的属性
  Object.assign(defaults, options);

  // 创建ajax对象
  var xhr = new XMLHttpRequest();
  // 拼接请求参数的变量
  var params = '';
  // 循环用户传递进来的对象格式参数
  for (var attr in defaults.data) {
    // 将参数转换为字符串格式
    params += attr + '=' + defaults.data[attr] + '&';
  }
  // 将参数最后面的&截取掉 
  // 将截取的结果重新赋值给params变量
  params = params.substr(0, params.length - 1);

  // 判断请求方式
  if (defaults.type == 'get') {
    defaults.url = defaults.url + '?' + params;
  }

  // 配置ajax对象
  xhr.open(defaults.type, defaults.url);
  // 如果请求方式为post
  if (defaults.type == 'post') {
    // 用户希望的向服务器端传递的请求参数的类型
    var contentType = defaults.header['Content-Type']
    // 设置请求参数格式的类型
    xhr.setRequestHeader('Content-Type', contentType);
    // 判断用户希望的请求参数格式的类型
    // 如果类型为json
    if (contentType == 'application/json') {
      // 向服务器端传递json数据格式的参数
      xhr.send(JSON.stringify(defaults.data))
    } else {
      // 向服务器端传递普通类型的请求参数
      xhr.send(params);
    }

  } else {
    // 发送请求
    xhr.send();
  }
  // 监听xhr对象下面的onload事件
  // 当xhr对象接收完响应数据后触发
  xhr.onload = function () {

    // xhr.getResponseHeader()
    // 获取响应头中的数据
    var contentType = xhr.getResponseHeader('Content-Type');
    // 服务器端返回的数据
    var responseText = xhr.responseText;

    // 如果响应类型中包含applicaition/json
    if (contentType.includes('application/json')) {
      // 将json字符串转换为json对象
      responseText = JSON.parse(responseText)
    }

    // 当http状态码等于200的时候
    if (xhr.status == 200) {
      // 请求成功 调用处理成功情况的函数
      defaults.success(responseText, xhr);
    } else {
      // 请求失败 调用处理失败情况的函数
      defaults.error(responseText, xhr);
    }
  }
}

/*
  请求参数要考虑的问题

    1.请求参数位置的问题

      将请求参数传递到ajax函数内部, 在函数内部根据请求方式的不同将请求参数放置在不同的位置

      get 放在请求地址的后面

      post 放在send方法中

    2.请求参数格式的问题

      application/x-www-form-urlencoded

        参数名称=参数值&参数名称=参数值

        name=zhangsan&age=20

      application/json

        {name: 'zhangsan', age: 20}

      1.传递对象数据类型对于函数的调用者更加友好
      2.在函数内部对象数据类型转换为字符串数据类型更加方便

*/
