# this指向

## 目录

[不同情况下的指向规则](#jump1)

[箭头函数中的this](#jump3)

[绑定规则优先级](#jump2)

[多次bind](#jump4)

---	

<span id="jump1"></span>

## 不同情况下的指向规则

总体的原则是，this就是调用函数的对象

### 方法调用模式下

this总是指向调用它所在方法的对象

this的指向与所在方法的调用位置有关，而与方法的声明位置无关（箭头函数特殊）

```javascript
// 声明位置
var fn=function(){
    console.log(this.x)
}    
var x="2"
var obj={
    x:"1",
    fn:fn
}

//调用位置
obj.fn(); // 1
```

### 函数调用下或调用方法没有明确对象的时候

this指向全局对象，如setTimeout，匿名函数等

这里其实还是属于第一类情况，因为调用者其实就是全局对象，只不过被省略了

```javascript
var x="2"
// 声明位置
var fn=function(){
    console.log(this.x)
}  

// 调用位置
fn(); // 2
```

### 构造函数(new)调用模式下

this指向被new出来的对象

```javascript
var flag=undefined;    
function Fn(){
    flag=this;
}

var obj=new Fn()
console.log(flag==obj) // true
```

### apply,call,bind调用模式下

this指向绑定函数的第一个参数

```javascript
var obj={
    name:'hty',
    getName:function(){
	console.log(this.name)
    }
}
var otherObj={
    name:'hml'
}
var name='upupup'

obj.getName() // hty
obj.getName.call(); // upupup
obj.getName.call(otherObj); // hml
obj.getName.apply(); //upupup
obj.getName.apply(otherObj); // hml
obj.getName.bind(this)(); // upupup
obj.getName.bind(otherObj)(); // hml
```

### 拓展：call()、apply()、bind()的区别

#### 首先看三者的语法格式

call()：

```javascript
func.call([thisArg[, arg1, arg2, ...argN]])
```

apply()：

```javascript
func.apply(thisArg[, argsArray])
```

bind()：

```javascript
let boundFunc = func.bind(thisArg[, argsArray])
```

#### call 、bind 、 apply这三个函数的第一个参数都是 this 的指向对象

#### 第二个(或其他)参数是在func有形参时，供其使用的，在call和apply中的区别是：

1. call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面

```javascript
obj.myFun.call(db,'成都', ... ,'string' )
```

2. apply 的所有参数都必须放在一个数组里面传进去

```javascript
obj.myFun.apply(db,['成都', ..., 'string' ])

```

#### bind 除了返回是函数以外，它的参数和 call 一样

### 严格模式下

如果this没有被执行环境（execution context）定义，那this是为undefined

```javascript
"use strict";
var fn=function(){
    return this
}  

fn() === undefined; // true
```

---

<span id="jump3"></span>

## 箭头函数中的this

### 箭头函数的特性一：this是定义该函数时所在的作用域指向的对象

```javascript
const obj = {
  a: () => {
    console.log(this)
  }
}

obj.a()  // 打出来的是window
```

a所在的作用域其实是最外层的js环境，而不是obj

因为obj并不算一层作用域，函数包裹才算一层作用域，比如：

```javascript
var name = 'window'; 

var A = {
   name: 'A',
   sayHello: function(){
      var s = () => console.log(this.name)
      return s//返回箭头函数s
   }
}

var sayHello = A.sayHello();
sayHello();// 输出A 

var B = {
   name: 'B';
}

sayHello.call(B); // 还是A
sayHello.call(); // 还是A
```

根据“该函数所在的作用域指向的对象”来分析： 

该函数所在的作用域：箭头函数s 所在的作用域是sayHello,因为sayHello是一个函数

作用域指向的对象：A.sayHello指向的对象是A

### 箭头函数的特性二：声明时就绑定而非被调用时才绑定

箭头函数在声明的时候就绑定this，而非取决于调用位置

```javascript
// 声明
var fn = (()=>{
    console.log(this.x)
})  
var x="2"
var obj={
    x:"1",
    fn:fn
}

// 调用位置为obj
obj.fn(); // 2
fn(); // 2
```

### 箭头函数的特性三：不能用call方法修改里面的this

为了减少this的复杂性，箭头函数被设计成无法用call方法来指定this

```javascript
const obj = {
  a: () => {
  console.log(this)
  }
}
obj.a.call('123')  //打出来的结果依然是window对象
```

---

<span id="jump2"></span>

## 绑定规则优先级

是否在new中调用(new绑定)?如果是的话this绑定的是新创建的对象。

是否通过call、apply(显式绑定)或者硬绑定调用?如果是的话,this绑定的是 指定的对象。

是否在某个上下文对象中调用(隐式绑定)?如果是的话,this绑定的是那个上下文对象。

如果都不是的话,使用默认绑定。如果在严格模式下,就绑定到undefined,否则绑定到 全局对象。

---

<span id="jump4"></span>

## 多次bind

不管我们给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定

```javascript
let a = {};
let fn = function () {
  console.log(this);
};

fn.bind().bind(a)(); // => window
```
