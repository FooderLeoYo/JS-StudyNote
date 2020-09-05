# 字符串

## 目录

[字符串嵌套](#jump1)

[字符串拼接](#jump2)

[indexOf方法](#jump3)

[字符串截取](#jump4)

---	

<span id="jump1"></span>

## 字符串嵌套

当字符串中需要用到引号时，则使用外双内单或外单内双，如：'You are so "smart".'

---	

<span id="jump2"></span>

## 字符串拼接
    
1. 使用连接符 “+” 把要连接的字符串连起来

只要有其他类型与字符串进行拼接，结果都是字符串

```javascript
var a = 'java'
var b = a + 'script'
```

2. 使用数组的 join 方法连接字符串

join() 方法用于把```数组中```的所有元素放入一个字符串

元素是通过指定的分隔符进行分隔的

### 基本语法

```javascript
arrayObject.join(separator)
```

| 参数 | 描述 |
| --- | --- |
| separator | 可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符 |

### 例子

```javascript
var arr = ['hello','java','script']
var str = arr.join("")
```

3. 使用模板字符串

以反引号（ ` ）标识，变量、运算等放在```${}```中

无需```+```即可拼接

```javascript
var a = 'java'
var b = `hello ${a}script`
```

4. 使用 JavaScript concat() 方法连接字符串

concat() 方法用于连接两个或多个字符串

该方法没有改变原有字符串，但是会返回连接两个或多个字符串新字符串

```javascript
var a = 'java'
var b = 'script'

var str = a.concat(b)
```

---	

<span id="jump3"></span>

## indexOf方法

返回某个指定的字符串值在字符串中首次出现的位置，否则返回-1

### 基本语法

```javascript
stringObject.indexOf(searchvalue,fromindex)
```

| 参数 | 描述 |
| --- | --- |
| searchvalue | 必需。规定需检索的字符串值 |
| fromindex | 可选。规定在字符串中开始检索的位置 |

### 用于查找是否存在某段字符串

如果存在某段字符串，则indexOf()会返回它的位置，否则返回-1

因此只要indexOf()返回值不是-1，就说明有这段字符串，例如：

```javascript
// Googlebot是google爬虫
if (userAgent.indexOf("Googlebot") !== -1) {
  // Access is not allowed
  res.status(403).end();
  return;
}
```
上述例子表示：如果请求头的userAgent中包含"Googlebot"字段，则阻止访问

---

<span id="jump4"></span>

## 字符串截取

### slice方法

使用 start（包含） 和 end（不包含） 参数来指定字符串提取的部分

```javascript
string.slice(start,end)
```

| 参数 | 描述 |
| --- | --- |
| start | 必须. 要抽取的片断的起始下标。第一个字符位置为 0 |
| end | 可选。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。 |

例如：

```javascript
var str="Hello world!";
var n=str.slice(3,8);
```

以上实例输出结果：

```javascript
lo wo
```

### split方法

用于把一个字符串分割成字符串数组

如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割

split() 方法不改变原始字符串

```javascript
string.split(separator,limit)
```

| 参数 | 描述 |
| --- | --- |
| separator | 可选。字符串或正则表达式，从该参数指定的地方分割 |
| limit | 可选。该参数可指定返回的数组的最大长度。 |

例如：

```javascript
var str="How are you doing today?";
var n=str.split(" ",3);
```

以上实例输出结果：


```javascript
How,are,you
```

### substr方法

可在字符串中抽取从 开始 下标开始的指定数目的字符

它可以替代 substring() 和 slice() 来使用

ECMAscript 没有对该方法进行标准化，因此反对使用它

substr() 方法不会改变源字符串

```javascript
string.substr(start,length)
```

例如：

```javascript
var str="Hello world!";
var n=str.substr(2,3)
```

结果为：

```javascript
llo
```

### substring方法

用于提取字符串中介于两个指定下标之间的字符

返回的子串包括 开始 处的字符，但不包括 结束 处的字符

```javascript
string.substring(from, to)
```

| 参数 | 描述 |
| --- | --- |
| from | 必需。规定要提取的子串的第一个字符在 string Object 中的位置 |
| to | 可选。比要提取的子串的最后一个字符在 string Object 中的位置多 1 |

例如：

```javascript
var str="Hello world!";
console.log(str.substring(3,7));
```

结果为：

```javascript
lo w
```

### trim方法

用于删除字符串的头尾空格

不会改变原始字符串

```javascript
string.trim()
```
