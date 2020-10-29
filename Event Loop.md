# Event Loop

## 目录

[执行过程中的各种队列](#jump1)

[浏览器中的Event Loop](#jump2)

[node中的Event Loop](#jump3)

[async await、Promise、setTimeout](#jump4)

---

<span id="jump1"></span>

## 执行过程中的各种队列

### 执行栈

一系列的方法被依次调用的时候，js会先解析这些方法，把其中的**同步任务**按照执行顺序排队到一个地方，这个地方叫做执行栈

### 任务队列

当我们发出一个ajax请求，他并不会立刻返回结果

主线程会把这个异步任务挂起(pending)，继续执行执行栈中的其他任务

等异步任务返回结果后，js会将这个异步任务按照执行顺序，加入到**与执行栈不同的另一个队列**，也就是任务队列

### Micro-Task 与 Macro-Task

宏任务队列可以有多个，微任务队列只有一个

当 macro-task 出队时，任务是一个一个执行的；而 micro-task 出队时，任务是一队一队执行的

常见宏、微任务：

- Macrotasks：setTimeout，setInterval，setImmediate，I/O，UI交互事件

- Microtasks：process.nextTick，Promise.then

---

<span id="jump2"></span>

## 浏览器中的Event Loop

### 过程

#### 第一步 

执行栈为空，micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）

#### 第二步

全局上下文（script 标签）中的同步任务被推入执行栈

在执行的过程中，会产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里

同步代码执行完后，script 脚本会被移出 macro 队列

#### 第三步
 
处理micro-task

逐个执行微任务队列中的任务并把它出队，直到微任务队列被清空

#### 第四步

执行渲染操作，更新界面

#### 第五步

检查是否存在 Web worker 任务，如果有，则对其进行处理

#### 第六步

上述过程循环往复，直到两个队列都清空

#### 总结

每一次循环都是一个这样的过程：

执行宏任务队列最顶层任务的同步任务 ——> 执行过程中，宏类型异步任务压入宏任务队列，微类型异步任务压入微任务队列 ——> 同步任务全部执行完后，宏任务队列弹出最顶层任务 ——> 按顺序将微任务队列中的任务全部执行 ——> 执行渲染操作更新界面、Web worker任务

最后判断宏任务队列是否被清空

否，跳转第一步

是，结束

![浏览器中的事件循环流程](https://raw.githubusercontent.com/FooderLeoYo/JS-StudyNote/master/assets/imgs/%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E6%B5%81%E7%A8%8B.jpg)

### 例题

题目：

```javascript
Promise.resolve().then(() => {
  console.log("Promise1"); 
  setTimeout(() => {
    console.log("setTimeout2");
  }, 0);
});
setTimeout(() => {
  console.log("setTimeout1");
  Promise.resolve().then(() => {
    console.log("Promise2");
  });
}, 0);
```

结果：

```javascript
Promise1，setTimeout1，Promise2，setTimeout2
```

分析：

```javascript
Promise // 1. 第一个同步任务
.resolve() // 2. 第二个同步任务
.then(() => { // 3. 第二个同步任务的微任务队列的第一个任务
  console.log("Promise1"); // 4. 上一行任务的第一个同步任务
  setTimeout(() => { // 11. 宏任务队列的第二个任务
    console.log("setTimeout2"); // 12. 上一行任务的第一个同步任务
  }, 0);
});
setTimeout(() => { // 5. 宏任务队列的第一个任务
  console.log("setTimeout1"); // 6. 第一个宏任务的第一个同步任务
  Promise // 7. 第一个宏任务的第二个同步任务
  .resolve() // 8. 第一个宏任务的第三个同步任务
  .then(() => { // 9. 上一行同步任务的微任务队列的第一个任务
    console.log("Promise2"); // 10. 上一行任务的第一个同步任务
  });
}, 0);
```

---

<span id="jump3"></span>

## node中的Event Loop

Node的Event loop和浏览器的Event loop是两个概念

### 6个阶段

nodejs的event loop分为6个阶段，它们会按照顺序反复运行

其中，timers、poll、check这3个阶段是主要的，因为日常开发中的绝大部分异步任务都是在这3个阶段处理的

#### timers

执行setTimeout() 和 setInterval()中到期的callback，并且是由poll阶段控制的

一个timer指定一个下限时间而不是准确时间，在达到这个下限时间后执行回调

#### I/O callbacks

执行除了close事件、被timers设定的、setImmediate()设定的callbacks之外的callbacks

#### idle, prepare

队列的移动，仅内部使用

#### poll

最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段

执行下限时间已经达到的timers的回调

然后处理 poll 队列里的事件

如果有设定的timers，一旦 poll 队列为空，event loop将检查timers，如果有1个或多个timers的下限时间已经到达，event loop将绕回 timers 阶段，并执行 timer 队列

如果没有设定的timers会发生下面两件事之一：

- 如果 poll 队列不空，event loop会遍历队列并同步执行回调，直到队列清空或执行的回调数到达系统上限

- 如果 poll 队列为空，则发生以下两件事之一：

	- 如果代码已经被setImmediate()设定了回调, event loop将结束 poll 阶段进入 check 阶段来执行 check 队列（里的回调

	- 如果代码没有被setImmediate()设定回调，event loop将阻塞在该阶段等待回调被加入 poll 队列，并立即执行

#### check

执行setImmediate的callback

一般在生产环境是不推荐使用setImmediate的

#### close callbacks

执行close事件的callback

### 宏任务与微任务

#### 队列

事件循环当中的6个阶段对应的6个基本的队列都属于宏队列

不同于浏览器的是，在每个阶段完成后，而不是一个MacroTask任务完成后，microTask队列就会被执行

这就导致了同样的代码在不同的上下文环境下会出现不同的结果

#### 常见任务

常见的macro-task：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O操作等。

常见的micro-task：process.nextTick、new Promise().then(回调)等

#### node 11

##### node10及其之前版本

要等到宏队列当中的所有宏任务全部执行完毕，才会去执行微队列当中的微任务

##### node11版本

一旦执行一个阶段里对应宏队列当中的一个宏任务(setTimeout,setInterval和setImmediate三者其中之一，不包括I/O)就立刻执行微任务队列

执行完微队列当中的所有微任务再回到刚才的宏队列执行下一个宏任务

这就跟浏览器端运行一致了

### process.nextTick

这个函数其实是独立于Event Loop之外的，它有一个自己的队列

当每个阶段完成后，如果存在nextTick队列，就会清空队列中的所有回调函数，并且优先于其他microtask执行

其作用是将一个函数推迟到代码执行的下一个同步方法执行完毕，或异步事件回调函数开始执行时再执行

### 总结

node中事件循环的执行顺序归纳起来就是：

清空上一次循环遗留的microtask Queue ——> 进入timer阶段，执行上一次循环当中timer macrotask Queue当中的定时器的回调函数 ——> 将其中的I/O、宏、微任务分别放入对应队列；如果定时器设置了延迟则现在还不会被放入宏队列；如果node的版本为11则此时会立即执行微任务队列的所有任务 ——> 返回上一步，执行timer阶段的下一个宏任务；循环此步骤直到清空timer阶段的宏任务队列 ——> 然后进入I/O callback阶段，与timer阶段类似，循环执行I/O callback任务队列中的任务，直到清空所有I/O callback阶段的任务队列 ——> 进入idle prepare阶段 ——> 进入poll阶段，此时会回到timer阶段检查是否有任务（可能会有在之前的timer阶段中设置了延迟，此时延迟已到的定时器），有则执行，无则进入下一个事件循环

### 综合实例

#### 题目

```javascript
const fs = require('fs')
console.log('start')

fs.writeFile('text.txt', '我写的数据', err => {
  if (err) throw err;
  console.log('text1');
});

setTimeout(() => {
  console.log('setTimeout 1')
  Promise.resolve()
  .then(()=> {
    console.log('promise 3')
  })
})

setTimeout(() => {
  console.log('setTimeout 2')
  Promise.resolve()
  .then(()=> {
    console.log('promise 4')
    Promise.resolve()
    .then(()=> {
      console.log('promise 5')
    })
  })
  .then(()=> {
    console.log('promise 6')
  })
  .then(()=> {
    fs.writeFile('text1.txt', '我写的数据', err => {
      if (err) throw err;
      console.log('text2');
    });
    setTimeout(()=>{
      console.log('setTimeout 3')
      Promise.resolve()
      .then(()=> {
        console.log('promise 7')
      })
      .then(()=> {
        console.log('promise 8')
      })
    }, 1000)
  })
}, 0);


Promise.resolve()
.then(()=> {
  console.log('promise 1')
})
.then(()=> {
  console.log('promise 2')
})
console.log('end')
```

#### 分析

##### 第一次事件循环

开始将整个程序作为宏任务开始执行，先打印出start，然后将setTimeout 1和setTimeout 2放入timer Queue,将text1放入I/O callback Queue当中，将promise 1和promise 2放入microtask Queue当中，然后打印出end

打印出的结果如下：

```javascript
start
end
```

此时各个队列情况如下：

```javascript
icrotask Queue: promise 1、promise 2
timer macrotask Queue: setTimeout 1、setTimeout 2
I/O callback macrotask Queue：text1
```

##### 第二次事件循环

- 先清空microtask Queue，打印出promise 1和promise 2

- 进入timer阶段：执行上一次循环当中timer macrotask Queue当中的setTimeout 1的回调函数，打印出setTimeout 1,同时将promise 3放入到了microtask Queue,因为node11版本变化的原因，因为我们在timer阶段执行了setTimeout 1,属于setTimeout宏任务，所以立马执行了microtask Queue中的promise 3，打印出promise 3

- 然后回到timer阶段执行下一个宏任务setTimeout 2，执行它的回调函数，先打印setTimeout 2，然后将promise 4，promise 5，promise 6放入microtask Queue，然后将text2放入了I/O callback macrotask Queue当中。执行了setTimeout 2，它也属于setTimeout宏任务，所以立刻执行了microtask Queue中的所有任务，打印出promise 4，promise 5，promise 6。特别要注意为什么setTimeout 3没有立刻放在timer macrotask Queue当中，因为它是延迟一秒的

- 然后进入I/O callback阶段，因为当前I/O callback macrotask Queue有两个任务，所以分别执行他们的回调函数，打印出text1和text2

- 然后跳过idle prepare阶段，因为没有这个阶段干的事

- 进入poll阶段，此时会回到timer阶段，但是我们当前不能完全确定setTimeout 3是否在timer Queue当中

	- 如果经过前面的timer和I/O callback阶段后，一秒早过去了，那么此时setTimeout 3就在timer Queue当中，执行它

	- 如果还没有到一秒，则poll阶段结束，进入下一个事件循环当

打印出的结果如下：

```javascript
promise 1
promise 2
setTimeout 1
promise 3
setTimeout 2
promise 4
promise 5
promise 6
text1
text2
```

此时各个队列情况如下：

```javascript
microtask Queue: 空
timer macrotask Queue: setTimeout 3（应该有了）
I/O callback macrotask Queue：空
```

##### 第三次事件循环

- 先清空上一次循环遗留的microtask Queue，因为没有，所以跳过

- 进入timer阶段，执行setTimeout 3的回调，打印出setTimeout 3，然后将promise 7和promise 8放入了microtask Queue当中。因为setTimeout 3也属于setTimeout宏任务，所以立刻执行了microtask Queue当中的promise 7和promise 8，打印出promise 7和promise 8

打印出的结果如下：

```javascript
setTimeout 3
promise 7
promise 8
```

---

<span id="jump4"></span>

## async await、Promise、setTimeout

### setTimeout

是这三个里面优先级最低的，因为它完全是异步任务

### Promise

本身为同步任务，resolve或reject底下的才是异步任务

当执行到resolve或reject时，执行完该行的语句后，底下的代码会被放入微任务队列

### async await

本身为同步任务，await底下的才是异步任务

当执行到await时，执行完该行的语句后，底下的代码会被放入微任务队列

### 例题

题目：

```javascript
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```

答案：

```javascript
script start
async1 start
async2
promise1
script end
async1 end
promise2
settimeout
```

分析：

```javascript
async function async1() {
    console.log('async1 start') // 3. 第三个同步任务
    await async2() // 4. 第四个同步任务，遇到await，则执行完这一行，底下的代码放入微任务队列
    console.log('async1 end') // 10. 微任务队列的第一个任务
}
async function async2() {
    console.log('async2') // 5. 第五个同步任务
}
console.log('script start') // 1. 第一个同步任务
setTimeout(function () { // 12. 宏任务队列的第一个任务
    console.log('settimeout')
})
async1() // 2. 第二个同步任务
new Promise(function (resolve) { // 6. 第六个同步任务
    console.log('promise1') // 7. 第七个同步任务
    resolve() // 8. 第八个同步任务，遇到resolve，则执行完这一行，底下的代码放入微任务队列
}).then(function () {
    console.log('promise2') // 11. 微任务队列的第二个任务
})
console.log('script end') // 9. 第九个同步任务
```
