# ES6��������

## Ŀ¼

[let�ؼ���](#jump1)

[const�ؼ���](#jump2)

[�⹹��ֵ](#jump3)
                      
[��ͷ����](#jump4)

[ʣ�����](#jump5)

[��չ�����](#jump6)

[ģ���ַ���](#jump14)

[async/await](#jump15)

---	

<span id="jump1"></span>

## let�ؼ���

### �ص�

1. let�ؼ��־�����������������

2. ��һ���������У�ʹ��let�ؼ��������ı������п鼶�����򣬼����˴����žͲ��ܱ�����

��֮��ԣ�var�ؼ����ǲ��߱�����ص��

```javascript
 if (true) {
	let num = 100;
	var abc = 200;
 }
 console.log(num); // ����numδ����
 console.log(abc); // ����
```

3. ��ֹѭ���������ȫ�ֱ����������ڿ���ѭ�����Լӱ�������ѭ���Ͳ��ܱ�������

```javascript
for (let i = 0; i < 2; i++) {}
console.log(i); // ����iδ����
```

4. ʹ��let�ؼ��������ı���û�б�������

```javascript
console.log(a); // ����aδ����
let a = 100; 
```

5. ʹ��let�ؼ��������ı���������ʱ���������ԣ����ڴ���������ʹ��ĳ�����������������Ƿ������������޹�

```javascript
var num = 10;
if (true) {
	console.log(num); // ����numδ����
	let num = 20;
}
```

		
---

<span id="jump2"></span>

## const�ؼ���

���ã�������������

### �ص�

1. ʹ��const�ؼ��������ĳ������п鼶������

2. ʹ��const�ؼ��������ĳ������븳��ʼֵ

3. ���������󲻿ɸ���

1. ������������ֵ���ܸ���

```javascript
const PI = 3.14;
PI = 100; // ����
```

2. ������������ֵ���Ըģ���ַ���ܸ�

```javascript
const ary = [100, 200];
ary[0] = 123;
console.log(ary); // ��������
ary = [1, 2]
console.log(ary); // ����
```
				
---

<span id="jump3"></span>

## �⹹��ֵ

### ����⹹

1. �������ǰ���һһ��Ӧ�Ĺ�ϵ����������ȡֵ Ȼ��ֵ��ֵ������

```javascript
let ary = [1,2,3];
let [a, b, c] = ary; // �൱�ڷֱ��1��2��3��ֵ��a��b��c
```

2. �����������������Ԫ�ظ�����һ����δ�⹹�ı���Ϊundefined

```javascript
let ary = [1,2,3];
let [a, b, c, d, e] = ary; // d��eΪundefined
```

### ����⹹

1. ����⹹��������ʹ�ñ���������ƥ���������� ƥ��ɹ� ���������Ե�ֵ��ֵ������

```javascript
let person = {name: 'lisi', age: 30, sex: '��'};
let {name, age, sex} = person;
��
let {name: myName} = person; // ��ʱ��name����ƥ�䣬��������ֵ����myName
```

---

<span id="jump4"></span>

## ��ͷ����

��ͷ����ֻ�����������������������ھ�������

���ã���һ�ּ򻯵Ķ��庯���ķ�ʽ

### �﷨

() => {}

### ����������ֻ��һ����룬�Ҵ����ִ�н�����Ƿ���ֵ������ʡ�Դ�����

```javascript
const sum = (n1, n2) => {
  return n1 + n2;
}
```

�ɼ�дΪ��

```javascript
const sum = (n1, n2) => n1 + n2;

```

### �ڼ�ͷ������ ����β�ֻ��һ�� �β�����С����Ҳ�ǿ���ʡ�Ե�

```javascript
const fn = (v) => {
  alert(v);
}
```

�ɼ�дΪ��

```javascript
const fn = v => {
  alert(v);
}
```

### ��ͷ�����()��ʾ����()�ڵ����ݣ��൱��{return }

```javascript
() => (
  content
)
// �ȼ���
() => {
  return content
}
```

### ��ͷ������this

����: ��ͷ�����е�this����β��ҵ���?

��: �������������, һ������this, ֱ����this�Ķ���

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

## ʣ�����

ʣ������﷨�������ǽ�һ�����������Ĳ�����ʾΪһ������

### �﷨

1. function ������(�β���1, �β���2, ����, �β���n�� ...ʣ�������) {}

2. ʣ�������ǰ��������

3. �����ݹ�����ʵ�θ��������β��б��еĸ���ʱ��ʣ���ʵ�α����������ʽ������ʣ�������

---

<span id="jump6"></span>

## ��չ�����.

��չ���������ȡ���Ⱥ��ұߵĲ����е����пɱ������ԣ��������Ⱥ���ߵĶ���֮��

��չ������ڲ����õ������ݽṹ�� Iterator �ӿڣ����ֻҪ���� Iterator �ӿڵĶ��󣬶�����ʹ����չ����������� Map �ṹ

### �������չ�����

```javascript
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```

### �������չ�����

1. ���Խ�����ת��Ϊ��������

```javascript
function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
```

2. ���Ը�������

���ֱ��ͨ�����еķ�ʽ�������鸴���ǲ���ȡ�ģ�

```javascript
// ����
const arr1 = [1, 2];
const arr2 = arr1;
arr2[0] = 2;
arr1 // [2, 2]
```

����չ������ͺܷ��㣺

```javascript
// ��ȷ
const arr1 = [1, 2];
const arr2 = [...arr1];
```

3. ��⹹��ֵ���������������������

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```

ע�⣺�������չ������������鸳ֵ��ֻ�ܷ��ڲ��������һλ������ᱨ��

```javascript
const [...rest, last] = [1, 2, 3, 4, 5];
// ����
const [first, ...rest, last] = [1, 2, 3, 4, 5];
// ����
```

4. ���ַ���תΪ����������

```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

---

<span id="jump14"></span>

## ģ���ַ���

�÷�����`�������ַ���

### ģ���ַ������Խ�������

����Ҫ���õı���������${}�У����ɽ���

```javascript
let name = "����";
let sayHello = `Hello, �ҵ����ֽ�${name}`;
```

### ģ���ַ������Ի��У������Ǳ����ո񡢿���

```javascript
let html = `
<div>
  <span>${result.name}</span>
  <span>${result.age}</span>
</div>
`
```

### ��ģ���ַ����п��Ե��ú���

������õĺ���������${}�У����ɵ���

```javascript
const fn = () => {
	return '����fn����'
}
let html = `����ģ���ַ��� ${fn()}`;
```

---

<span id="jump15"></span>

## async/await

- async �Ὣ���ĺ������������ʽ�� Lambda���ķ���ֵ��װ��һ�� Promise ����

- �� await ��ȴ���� Promise ��ɣ������� resolve �Ľ�����س���

- async/await ���������ڴ��� then ������ʹ���뿴������������������ͬ������һ��

- Promise ͨ�� then ����������ص������⣬�������� async/await ����һ���Ż���

һ�����ӣ�step1��step2��step3�����첽�������Ҿ�����ǰһ���Ľ����

ʹ��promiseʱ:

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

�ȼ���ʹ��async/awaitʱ��

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
