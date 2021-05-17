# ES6新增特性

## 目录

[let关键字](#jump1)

[const关键字](#jump2)

[解构赋值](#jump3)
                      
[箭头函数](#jump4)

[剩余参数](#jump5)

[扩展运算符](#jump6)

[模板字符串](#jump14)

[async/await](#jump15)

---	

<span id="jump1"></span>

## let关键字

### 特点

1. let关键字就是用来声明变量的

2. 在一个大括号中，使用let关键字声明的变量具有块级作用域，即出了大括号就不能被调用

与之相对，var关键字是不具备这个特点的

```javascript
 if (true) {
	let num = 100;
	var abc = 200;
 }
 console.log(num); // 报错，num未定义
 console.log(abc); // 正常
```

3. 防止循环变量变成全局变量，即用于控制循环的自加变量出了循环就不能被调用了

```javascript
for (let i = 0; i < 2; i++) {}
console.log(i); // 报错，i未定义
```

4. 使用let关键字声明的变量没有变量提升

```javascript
console.log(a); // 报错，a未定义
let a = 100; 
```

5. 使用let关键字声明的变量具有暂时性死区特性，即在大括号内想使用某个变量，与括号外是否定义过这个变量无关

```javascript
var num = 10;
if (true) {
	console.log(num); // 报错，num未定义
	let num = 20;
}
```

		
---

<span id="jump2"></span>

## const关键字

作用：用于声明常量

### 特点

1. 使用const关键字声明的常量具有块级作用域

2. 使用const关键字声明的常量必须赋初始值

3. 常量声明后不可更改

1. 基本数据类型值不能更改

```javascript
const PI = 3.14;
PI = 100; // 报错
```

2. 复杂数据类型值可以改，地址不能改

```javascript
const ary = [100, 200];
ary[0] = 123;
console.log(ary); // 正常运行
ary = [1, 2]
console.log(ary); // 报错
```
				
---

<span id="jump3"></span>

## 解构赋值

### 数组解构

1. 允许我们按照一一对应的关系从数组中提取值 然后将值赋值给变量

```javascript
let ary = [1,2,3];
let [a, b, c] = ary; // 相当于分别把1、2、3赋值给a、b、c
```

2. 如果变量个数与数组元素个数不一样，未解构的变量为undefined

```javascript
let ary = [1,2,3];
let [a, b, c, d, e] = ary; // d、e为undefined
```

### 对象解构

1. 对象解构允许我们使用变量的名字匹配对象的属性 匹配成功 将对象属性的值赋值给变量

```javascript
let person = {name: 'lisi', age: 30, sex: '男'};
let {name, age, sex} = person;
或
let {name: myName} = person; // 这时的name用于匹配，真正被赋值的是myName
```

---

<span id="jump4"></span>

## 箭头函数

箭头函数只能用于匿名函数，不适用于具名函数

作用：是一种简化的定义函数的方式

### 语法

() => {}

### 若函数体中只有一句代码，且代码的执行结果就是返回值，可以省略大括号

```javascript
const sum = (n1, n2) => {
  return n1 + n2;
}
```

可简写为：

```javascript
const sum = (n1, n2) => n1 + n2;

```

### 在箭头函数中 如果形参只有一个 形参外侧的小括号也是可以省略的

```javascript
const fn = (v) => {
  alert(v);
}
```

可简写为：

```javascript
const fn = v => {
  alert(v);
}
```

### 箭头后面跟()表示返回()内的内容，相当于{return }

```javascript
() => (
  content
)
// 等价于
() => {
  return content
}
```

### 箭头函数的this

问题: 箭头函数中的this是如何查找的了?

答案: 向外层作用域中, 一层层查找this, 直到有this的定义

```javascript
const obj = {
  aaa() {

    setTimeout(function () {
      setTimeout(function () {
        console.log(this); // window
      })

      setTimeout(() => {
        console.log(this); // window
      })
    })

    setTimeout(() => {
      setTimeout(function () {
        console.log(this); // window
      })

      setTimeout(() => {
        console.log(this); // obj
      })
    })
  }
}
```


---

<span id="jump5"></span>

## 剩余参数

剩余参数语法允许我们在声明函数时，不用给出参数具体的个数，使得声明更具有灵活性

### 语法

1. function 函数名(形参名1, 形参名2, ……, 形参名n， ...剩余参数名) {}

2. 剩余参数名前加三个点

3. 当传递过来的实参个数大于形参列表中的个数时，剩余的实参被以数组的形式储存在剩余参数中

### 例子

```javascript
function add(...values) { // 使用剩余参数后，声明时写一个剩余参数作为形参就行了
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}


add(2, 5, 3); // 调用的时候，传递的实参个数则可以是任意的
---

### 其他注意点

#### rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错

```javascript
// 报错
function f(a, ...b, c) {
  // ...
}
```

#### 函数的length属性，不包括 rest 参数

```javascript
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```

<span id="jump6"></span>

## 扩展运算符.

扩展运算符用于取出等号右边的参数中的所有可遍历属性，拷贝到等号左边的对象之中

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构

### 对象的扩展运算符

```javascript
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```

### 数组的扩展运算符

1. 可以将数组转换为参数序列

```javascript
function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
```

2. 可以复制数组

如果直接通过下列的方式进行数组复制是不可取的：

```javascript
// 错误
const arr1 = [1, 2];
const arr2 = arr1;
arr2[0] = 2;
arr1 // [2, 2]
```

用扩展运算符就很方便：

```javascript
// 正确
const arr1 = [1, 2];
const arr2 = [...arr1];
```

3. 与解构赋值结合起来，用于生成数组

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```

注意：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错

```javascript
const [...rest, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...rest, last] = [1, 2, 3, 4, 5];
// 报错
```

4. 将字符串转为真正的数组

```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

---

<span id="jump14"></span>

## 模板字符串

用反引号`包裹的字符串

### 模板字符串可以解析变量

将需要调用的变量包裹在${}中，即可解析

```javascript
let name = "张三";
let sayHello = `Hello, 我的名字叫${name}`;
```

### 模板字符串可以换行，作用是保留空格、空行

```javascript
let html = `
<div>
  <span>${result.name}</span>
  <span>${result.age}</span>
</div>
`
```

### 在模板字符串中可以调用函数

将需调用的函数包裹在${}中，即可调用

```javascript
const fn = () => {
	return '我是fn函数'
}
let html = `我是模板字符串 ${fn()}`;
```

---

<span id="jump15"></span>

## async/await

- async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象

- 而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来

- async/await 的优势在于处理 then 链，能使代码看起来更清晰，几乎跟同步代码一样

- Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它

一个例子，step1、step2、step3均是异步方法，且均依赖前一步的结果：

使用promise时:

```javascript
function doIt() {
  const time1 = 300;
  step1(time1)
    .then(time2 => step2(time2))
    .then(time3 => step3(time3))
    .then(result => {
      console.log(`result is ${result}`);
    });
}
```

等价于使用async/await时：

```javascript
async function doIt() {
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step2(time2);
  const result = await step3(time3);
  console.log(`result is ${result}`);
}

doIt();
```
