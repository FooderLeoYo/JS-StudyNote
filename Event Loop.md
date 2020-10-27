# Event Loop

## Ŀ¼

[ΪʲôJavaScript�ǵ��߳�](#jump1)

[������е�Event Loop](#jump2)

[node�е�Event Loop](#jump3)

[JavaScript ʵ���첽��̵ķ���](#jump4)

[setTimeOut��setImmediate��process.nextTick()�ıȽ�](#jump5)

[async await��Promise��setTimeout](#jump6)

---	

<span id="jump1"></span>

## ΪʲôJavaScript�ǵ��߳�

### ͬ������

��Ϊ������ű����ԣ�JavaScript ����Ҫ��;�����û��������Լ����� DOM

���������ֻ���ǵ��̣߳����������ܸ��ӵ�ͬ������

���磬�ٶ� JavaScript ͬʱ�������̣߳�һ���߳���ĳ�� DOM �ڵ���������ݣ���һ���߳�ɾ��������ڵ㣬��ʱ������ͻ᲻֪��Ӧ�����ĸ��߳�Ϊ׼

### Web Worker

Ϊ�����ö�� CPU �ļ���������HTML5 ��� Web Worker ��׼������ JavaScript �ű���������߳�

�������߳���ȫ�����߳̿��ƣ��Ҳ��ò��� DOM

���ԣ�����±�׼��û�иı� JavaScript ���̵߳ı���

---

<span id="jump2"></span>

## ������е�Event Loop

### ִ��ջ

һϵ�еķ��������ε��õ�ʱ��js���Ƚ�����Щ�����������е�**ͬ������**����ִ��˳���Ŷӵ�һ���ط�������ط�����ִ��ջ

### �������

�����Ƿ���һ��ajax���������������̷��ؽ��

���̻߳������첽�������(pending)������ִ��ִ��ջ�е���������

���첽���񷵻ؽ����js�Ὣ����첽������ִ��˳�򣬼��뵽**��ִ��ջ��ͬ����һ������**��Ҳ�����������

### Micro-Task �� Macro-Task

��������¼�ѭ���е��첽���������֣�macro�������񣩶��к� micro��΢���񣩶���

��������п����ж����΢�������ֻ��һ��

�� macro-task ����ʱ��������һ��һ��ִ�еģ��� micro-task ����ʱ��������һ��һ��ִ�е�

- Macrotasks��setTimeout��setInterval��setImmediate��I/O��UI�����¼�

- Microtasks��process.nextTick��Promise.then

### ������е�Event Loop����

#### ��һ�� 

ִ��ջΪ�գ�micro ���пգ�macro ����������ֻ��һ�� script �ű���������룩

#### �ڶ���

ȫ�������ģ�script ��ǩ���е�ͬ����������ִ��ջ

��ִ�еĹ����У�������µ� macro-task �� micro-task�����ǻ�ֱ�������Ե����������

ͬ������ִ�����script �ű��ᱻ�Ƴ� macro ����

#### ������
 
����micro-task

���ִ��΢��������е����񲢰������ӣ�ֱ��΢������б����

#### ���Ĳ�

ִ����Ⱦ���������½���

#### ���岽

����Ƿ���� Web worker ��������У��������д���

#### ������

��������ѭ��������ֱ���������ж����

#### �ܽ�

ÿһ��ѭ������һ�������Ĺ��̣�

ִ�к����������������ͬ������ ����> ִ�й����У��������첽����ѹ���������У�΢�����첽����ѹ��΢������� ����> ͬ������ȫ��ִ����󣬺�������е���������� ����> ��˳��΢��������е�����ȫ��ִ�� ����> ִ����Ⱦ�������½��桢Web worker����

����жϺ���������Ƿ����

����ת��һ��

�ǣ�����

### ����

��Ŀ��

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

�����

```javascript
Promise1��setTimeout1��Promise2��setTimeout2
```

������

```javascript
Promise // 1. ��һ��ͬ������
.resolve() // 2. �ڶ���ͬ������
.then(() => { // 3. �ڶ���ͬ�������΢������еĵ�һ������
  console.log("Promise1"); // 4. ��һ������ĵ�һ��ͬ������
  setTimeout(() => { // 11. ��������еĵڶ�������
    console.log("setTimeout2"); // 12. ��һ������ĵ�һ��ͬ������
  }, 0);
});
setTimeout(() => { // 5. ��������еĵ�һ������
  console.log("setTimeout1"); // 6. ��һ��������ĵ�һ��ͬ������
  Promise // 7. ��һ��������ĵڶ���ͬ������
  .resolve() // 8. ��һ��������ĵ�����ͬ������
  .then(() => { // 9. ��һ��ͬ�������΢������еĵ�һ������
    console.log("Promise2"); // 10. ��һ������ĵ�һ��ͬ������
  });
}, 0);
```

---

<span id="jump3"></span>

## node�е�Event Loop

Node��Event loop���������Event loop����������

### 6���׶�

nodejs��event loop��Ϊ6���׶Σ����ǻᰴ��˳�򷴸�����

���У�timers��poll��check��3���׶�����Ҫ�ģ���Ϊ�ճ������еľ��󲿷��첽����������3���׶δ����

#### timers

ִ��setTimeout() �� setInterval()�е��ڵ�callback����������poll�׶ο��Ƶ�

һ��timerָ��һ������ʱ�������׼ȷʱ�䣬�ڴﵽ�������ʱ���ִ�лص�

#### I/O callbacks

ִ�г���close�¼�����timers�趨�ġ�setImmediate()�趨��callbacks֮���callbacks

#### idle, prepare

���е��ƶ������ڲ�ʹ��

#### poll

��Ϊ��Ҫ�Ľ׶Σ�ִ��I/O callback�����ʵ��������»�����������׶�

ִ������ʱ���Ѿ��ﵽ��timers�Ļص�

Ȼ���� poll ��������¼�

������趨��timers��һ�� poll ����Ϊ�գ�event loop�����timers�������1������timers������ʱ���Ѿ����event loop���ƻ� timers �׶Σ���ִ�� timer ����

���û���趨��timers�ᷢ������������֮һ��

- ��� poll ���в��գ�event loop��������в�ͬ��ִ�лص���ֱ��������ջ�ִ�еĻص�������ϵͳ����

- ��� poll ����Ϊ�գ���������������֮һ��

	- ��������Ѿ���setImmediate()�趨�˻ص�, event loop������ poll �׶ν��� check �׶���ִ�� check ���У���Ļص�

	- �������û�б�setImmediate()�趨�ص���event loop�������ڸý׶εȴ��ص������� poll ���У�������ִ��

#### check

ִ��setImmediate��callback

һ�������������ǲ��Ƽ�ʹ��setImmediate��

#### close callbacks

ִ��close�¼���callback

### ��������΢����

#### ����

�¼�ѭ�����е�6���׶ζ�Ӧ��6�������Ķ��ж����ں����

��ͬ����������ǣ���ÿ���׶���ɺ󣬶�����һ��MacroTask������ɺ�microTask���оͻᱻִ��

��͵�����ͬ���Ĵ����ڲ�ͬ�������Ļ����»���ֲ�ͬ�Ľ��

#### ��������

������macro-task��setTimeout��setInterval�� setImmediate��script��������룩�� I/O�����ȡ�

������micro-task��process.nextTick��new Promise().then(�ص�)��

#### node 11

##### node10����֮ǰ�汾

Ҫ�ȵ�����е��е����к�����ȫ��ִ����ϣ��Ż�ȥִ��΢���е��е�΢����

##### node11�汾

һ��ִ��һ���׶����Ӧ����е��е�һ��������(setTimeout,setInterval��setImmediate��������֮һ��������I/O)������ִ��΢�������

ִ����΢���е��е�����΢�����ٻص��ղŵĺ����ִ����һ��������

��͸������������һ����

### process.nextTick

���������ʵ�Ƕ�����Event Loop֮��ģ�����һ���Լ��Ķ���

��ÿ���׶���ɺ��������nextTick���У��ͻ���ն����е����лص���������������������microtaskִ��

�������ǽ�һ�������Ƴٵ�����ִ�е���һ��ͬ������ִ����ϣ����첽�¼��ص�������ʼִ��ʱ��ִ��

### �ܽ�

node���¼�ѭ����ִ��˳������������ǣ�

�����һ��ѭ��������microtask Queue ����> ����timer�׶Σ�ִ����һ��ѭ������timer macrotask Queue���еĶ�ʱ���Ļص����� ����> �����е�I/O���ꡢ΢����ֱ�����Ӧ���У������ʱ��������ʱ�������ڻ����ᱻ�������У�node 11�汾��ʱ������ִ��΢������е��������� ����> ִ��timer�׶ε���һ�������� ����> Ȼ�����I/O callback�׶Σ�ִ��I/O callback��������е����� ����> ����idle prepare�׶� ����> ����poll�׶Σ��ص�timer�׶μ���Ƿ�����������ִ�У����������һ���¼�ѭ��

### �ۺ�ʵ��

#### ��Ŀ

```javascript
const fs = require('fs')
console.log('start')

fs.writeFile('text.txt', '��д������', err => {
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
    fs.writeFile('text1.txt', '��д������', err => {
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

#### ����

##### ��һ���¼�ѭ��

��ʼ������������Ϊ������ʼִ�У��ȴ�ӡ��start��Ȼ��setTimeout 1��setTimeout 2����timer Queue,��text1����I/O callback Queue���У���promise 1��promise 2����microtask Queue���У�Ȼ���ӡ��end

��ӡ���Ľ�����£�

```javascript
start
end
```

��ʱ��������������£�

```javascript
icrotask Queue: promise 1��promise 2
timer macrotask Queue: setTimeout 1��setTimeout 2
I/O callback macrotask Queue��text1
```

##### �ڶ����¼�ѭ��

- �����microtask Queue����ӡ��promise 1��promise 2

- ����timer�׶Σ�ִ����һ��ѭ������timer macrotask Queue���е�setTimeout 1�Ļص���������ӡ��setTimeout 1,ͬʱ��promise 3���뵽��microtask Queue,��Ϊnode11�汾�仯��ԭ����Ϊ������timer�׶�ִ����setTimeout 1,����setTimeout��������������ִ����microtask Queue�е�promise 3����ӡ��promise 3

- Ȼ��ص�timer�׶�ִ����һ��������setTimeout 2��ִ�����Ļص��������ȴ�ӡsetTimeout 2��Ȼ��promise 4��promise 5��promise 6����microtask Queue��Ȼ��text2������I/O callback macrotask Queue���С�ִ����setTimeout 2����Ҳ����setTimeout��������������ִ����microtask Queue�е��������񣬴�ӡ��promise 4��promise 5��promise 6���ر�Ҫע��ΪʲôsetTimeout 3û�����̷���timer macrotask Queue���У���Ϊ�����ӳ�һ���

- Ȼ�����I/O callback�׶Σ���Ϊ��ǰI/O callback macrotask Queue�������������Էֱ�ִ�����ǵĻص���������ӡ��text1��text2

- Ȼ������idle prepare�׶Σ���Ϊû������׶θɵ���

- ����poll�׶Σ���ʱ��ص�timer�׶Σ��������ǵ�ǰ������ȫȷ��setTimeout 3�Ƿ���timer Queue����

	- �������ǰ���timer��I/O callback�׶κ�һ�����ȥ�ˣ���ô��ʱsetTimeout 3����timer Queue���У�ִ����

	- �����û�е�һ�룬��poll�׶ν�����������һ���¼�ѭ����

��ӡ���Ľ�����£�

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

��ʱ��������������£�

```javascript
microtask Queue: ��
timer macrotask Queue: setTimeout 3��Ӧ�����ˣ�
I/O callback macrotask Queue����
```

##### �������¼�ѭ��

- �������һ��ѭ��������microtask Queue����Ϊû�У���������

- ����timer�׶Σ�ִ��setTimeout 3�Ļص�����ӡ��setTimeout 3��Ȼ��promise 7��promise 8������microtask Queue���С���ΪsetTimeout 3Ҳ����setTimeout��������������ִ����microtask Queue���е�promise 7��promise 8����ӡ��promise 7��promise 8

��ӡ���Ľ�����£�

```javascript
setTimeout 3
promise 7
promise 8
```

---

<span id="jump4"></span>

## JavaScript ʵ���첽��̵ķ���

- �ص�����

- �¼�����

- ����/����

- Promises ����

- Async ����[ES7]

---

<span id="jump5"></span>

## setTimeOut��setImmediate��process.nextTick()�ıȽ�

### setTimeout()

���¼����뵽���¼����У�����ȵ���ǰ���루ִ��ջ��ִ���꣬���̲߳Ż�ȥִ����ָ���Ļص�����

�����߳�ʱ��ִ�й������޷���֤�ص������¼�ָ����ʱ��ִ��

�������ÿ�� setTimeout ���� 4ms ���ӳ٣�������ִ�ж�� setTimeout���п��ܻ��������̣������������

### setImmediate()

�¼����뵽�¼�����β�������̺߳��¼����еĺ���ִ�����֮������ִ�У��� setTimeout(fn,0)��Ч�����

����� node �ṩ�ķ���������������µ� api Ҳ������ʵ��:window.setImmediate,��֧�ֵ����������

### process.nextTick()

���뵽�¼�����β���������´��¼�����֮ǰ��ִ��

Ҳ����˵����ָ�����������Ƿ����������첽����֮ǰ����ǰ���̵߳�ĩβ

�������� node �ṩ�İ취���ô˷����������ڴ����첽�ӳٵ�����

---

<span id="jump6"></span>

## async await��Promise��setTimeout

### setTimeout

���������������ȼ���͵ģ���Ϊ����ȫ���첽����

### Promise

����Ϊͬ������resolve��reject���µĲ����첽����

��ִ�е�resolve��rejectʱ��ִ������е����󣬵��µĴ���ᱻ����΢�������

### async await

����Ϊͬ������await���µĲ����첽����

��ִ�е�awaitʱ��ִ������е����󣬵��µĴ���ᱻ����΢�������

### ����

��Ŀ��

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

�𰸣�

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

������

```javascript
async function async1() {
    console.log('async1 start') // 3. ������ͬ������
    await async2() // 4. ���ĸ�ͬ����������await����ִ������һ�У����µĴ������΢�������
    console.log('async1 end') // 10. ΢������еĵ�һ������
}
async function async2() {
    console.log('async2') // 5. �����ͬ������
}
console.log('script start') // 1. ��һ��ͬ������
setTimeout(function () { // 12. ��������еĵ�һ������
    console.log('settimeout')
})
async1() // 2. �ڶ���ͬ������
new Promise(function (resolve) { // 6. ������ͬ������
    console.log('promise1') // 7. ���߸�ͬ������
    resolve() // 8. �ڰ˸�ͬ����������resolve����ִ������һ�У����µĴ������΢�������
}).then(function () {
    console.log('promise2') // 11. ΢������еĵڶ�������
})
console.log('script end') // 9. �ھŸ�ͬ������
```