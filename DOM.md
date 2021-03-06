# DOM

## 目录

[DOM是什么](#jump1)

[DOM 事件模型](#jump2)

[Event对象常见属性及方法](#jump3)

[事件的代理/委托](#jump4)

[自定义事件](#jump5)

[添加、移除、移动、复制、创建和查找节点](#jump6)

[Window 对象 与 document 对象](#jump7)

---

<span id="jump1"></span>

## DOM是什么

浏览器将HTML解析成树形的数据结构，Document Object Model，简称DOM

类似的，浏览器将CSS代码解析成树形的数据结构，CSS Object Model，简称CSSOM

DOM 和 CSSOM 合并后生成 Render Tree

DOM 树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点

---

<span id="jump2"></span>

## DOM 事件模型

捕获从上到下， 冒泡从下到上

先捕获，再到目标，再冒泡

![dom事件模型](dom事件模型)

---

<span id="jump3"></span>

## Event对象常见属性及方法

### event.target

触发事件的元素

### event.currentTarget

绑定事件的元素

### event.preventDefault()

阻止默认行为

event.cancelBubble()和 event.preventBubble都已经废弃

### event.stopPropagation()

阻止在捕获阶段或冒泡阶段继续传播

### event.stopImmediatePropagation()

阻止事件冒泡并且阻止相同事件的其他侦听器被调用

---

<span id="jump4"></span>

## 事件的代理/委托

事件委托是指将事件绑定目标元素的到父元素上，利用冒泡机制触发该事件

### 优点

- 可以减少事件注册，节省大量内存占用

- 让不同的对象同时捕获同一事件，并调用自己的专属处理程序做自己的事情，就像老板一下命令，各自员工做自己岗位上的工作去了

- 可以将事件应用于动态添加的子元素上

---

<span id="jump5"></span>

## 自定义事件

### 事件构造器

```javascript
let event = new Event(type[, options]);
```

- type —— 事件类型，例如```myEvent```

- options —— 具有3个可选属性的对象：

	- detail：数据

	- bubbles: true/false —— 如果为 true，那么事件会冒泡

	- cancelable: true/false —— 如果为 true，那么“默认行为”就会被阻止

	- 默认情况下，以上两者都为 false：{bubbles: false, cancelable: false}

例如：

```javascript
var evt = new CustomEvent('student', {
  detail: {
    hasSchool: ture
  },
  bubbles: true,
  cancelable: false
})
```

### addEventListener

为DOM节点添加该事件的监听器

```javascript
domElement.addEvent('student', function(e){
    console.log(e.detail);
})
```

### dispatchEvent

在需要触发该事件的地方调用```dispatchEvent()```

```javascript
{
  // 其他语句
  domElement.dispatchEvent(evt);
  // 其他语句
}
```

---

<span id="jump6"></span>

## 添加、移除、移动、复制、创建和查找节点

### 创建新节点

- 创建一个 DOM 片段：createDocumentFragment()

- 创建一个具体的元素：createElement()

- 创建一个文本节点：createTextNode()

### 添加、移除、替换、插入

- appendChild()

- removeChild()

- replaceChild()

- insertBefore() //在已有的子节点前插入一个新的子节点

### 查找

- 通过标签名称：getElementsByTagName() 

- 通过元素的 Name 属性的值：getElementsByName()

- 通过元素 Id，唯一性：getElementById()

 ---

<span id="jump7"></span>

## Window 对象 与 document 对象

### window

- Window 对象表示当前浏览器的窗口，是 JavaScript 的顶级对象

- 我们创建的所有对象、函数、变量都是 Window 对象的成员

- Window 对象的方法和属性是在全局范围内有效的

### document

- Document 对象是 HTML 文档与所有其他节点的根节点

- Document 对象使我们可以通过脚本对 HTML 页面中的所有元素进行访问

- Document 对象是 Window 对象的一部分，即 window.document
