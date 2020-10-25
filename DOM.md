# DOM

## Ŀ¼

[DOM �¼�����](#jump1)

[DOM �¼�ģ��](#jump2)

[Event���󳣼����Լ�����](#jump3)

[�¼��Ĵ���/ί��](#jump4)

[�Զ����¼�](#jump5)

[JS ��ȡ dom �� CSS ��ʽ](#jump6)

[��ӡ��Ƴ����ƶ������ơ������Ͳ��ҽڵ�](#jump7)

[documen.write �� innerHTML ������](#jump8)

[Window ���� �� document ����](#jump9)

[����ʲô�ǡ��ͻ������ꡱ����ҳ�����ꡱ������Ļ���ꡱ](#jump10)

[focus/blur �� focusin/focusout ����������ϵ](#jump11)

[mouseover/mouseout �� mouseenter/mouseleave ����������ϵ](#jump12)

---	

<span id="jump1"></span>

## DOM �¼�����

### DOM0

- onXXX ���͵Ķ����¼�

- element.onclick = function(e) { ... }

### DOM1

DOM1һ��ֻ����ƹ淶û�о���ʵ�֣�����һ������

### DOM2

- addEventListener��ʽ

- attachEvent��ʽ(IE��)

### DOM3

DOM3���¼���DOM2���¼��Ļ���������˸�����¼����ͣ�ȫ���������£�

| �¼����� | ˵�� | ���� |
| --- | --- | --- |
| UI�¼� | ���û���ҳ���ϵ�Ԫ�ؽ���ʱ���� | load��scroll |
| �����¼� | ��Ԫ�ػ�û�ʧȥ����ʱ���� | blur��focus |
| ����¼� | ���û�ͨ�������ҳ��ִ�в���ʱ���� | dbclick��mouseup |
| �����¼� | ��ʹ�������ֻ������豸ʱ���� | mousewheel |
| �ı��¼� | �����ĵ��������ı�ʱ���� | textInput |
| �����¼� | ���û�ͨ��������ҳ����ִ�в���ʱ���� | keydown��keypress |
| �ϳ��¼� | ��ΪIME�����뷨�༭���������ַ�ʱ���� | compositionstart |
| �䶯�¼� | ���ײ�DOM�ṹ�����仯ʱ���� | DOMsubtreeModified |

---

<span id="jump2"></span>

## DOM �¼�ģ��

������ϵ��£� ð�ݴ��µ���

�Ȳ����ٵ�Ŀ�꣬��ð��

![dom�¼�ģ��](dom�¼�ģ��)

---

<span id="jump3"></span>

## Event���󳣼����Լ�����

### event.target

�����¼���Ԫ��

### event.currentTarget

���¼���Ԫ��

### event.preventDefault()

��ֹĬ����Ϊ

event.cancelBubble()�� event.preventBubble���Ѿ�����

### event.stopPropagation()

��ֹ�ڲ���׶λ�ð�ݽ׶μ�������

### event.stopImmediatePropagation()

��ֹ�¼�ð�ݲ�����ֹ��ͬ�¼�������������������

---

<span id="jump4"></span>

## �¼��Ĵ���/ί��

�¼�ί����ָ���¼���Ŀ��Ԫ�صĵ���Ԫ���ϣ�����ð�ݻ��ƴ������¼�

### �ŵ�

- ���Լ����¼�ע�ᣬ��ʡ�����ڴ�ռ��

- �ò�ͬ�Ķ���ͬʱ����ͬһ�¼����������Լ���ר������������Լ������飬�����ϰ�һ���������Ա�����Լ���λ�ϵĹ���ȥ��

- ���Խ��¼�Ӧ���ڶ�̬��ӵ���Ԫ����

---

<span id="jump5"></span>

## �Զ����¼�

### �¼�������

```javascript
let event = new Event(type[, options]);
```

- type ���� �¼����ͣ�����```myEvent```

- options ���� ����3����ѡ���ԵĶ���

	- detail������

	- bubbles: true/false ���� ���Ϊ true����ô�¼���ð��

	- cancelable: true/false ���� ���Ϊ true����ô��Ĭ����Ϊ���ͻᱻ��ֹ

	- Ĭ������£��������߶�Ϊ false��{bubbles: false, cancelable: false}

���磺

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

ΪDOM�ڵ���Ӹ��¼��ļ�����

```javascript
domElement.addEvent('student', function(e){
    console.log(e.detail);
})
```

### dispatchEvent

����Ҫ�������¼��ĵط�����```dispatchEvent()```

```javascript
{
  // �������
  domElement.dispatchEvent(evt);
  // �������
}
```

---

<span id="jump6"></span>

## JS ��ȡ dom �� CSS ��ʽ

```javascript
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return window.getComputedStyle(obj, false)[attr];
  }
}
```

---

<span id="jump7"></span>

## ��ӡ��Ƴ����ƶ������ơ������Ͳ��ҽڵ�

### �����½ڵ�

- ����һ�� DOM Ƭ�Σ�createDocumentFragment()

- ����һ�������Ԫ�أ�createElement()

- ����һ���ı��ڵ㣺createTextNode()

### ��ӡ��Ƴ����滻������

- appendChild()

- removeChild()

- replaceChild()

- insertBefore() //�����е��ӽڵ�ǰ����һ���µ��ӽڵ�

### ����

- ͨ����ǩ���ƣ�getElementsByTagName() 

- ͨ��Ԫ�ص� Name ���Ե�ֵ��getElementsByName()

- ͨ��Ԫ�� Id��Ψһ�ԣ�getElementById()

---

<span id="jump8"></span>

## documen.write �� innerHTML ������

- document.write ֻ���ػ�����ҳ��

- innerHTML �����ػ�ҳ���һ����

 ---

<span id="jump9"></span>

## Window ���� �� document ����

### window

- Window �����ʾ��ǰ������Ĵ��ڣ��� JavaScript �Ķ�������

- ���Ǵ��������ж��󡢺������������� Window ����ĳ�Ա

- Window ����ķ�������������ȫ�ַ�Χ����Ч��

### document

- Document ������ HTML �ĵ������������ڵ�ĸ��ڵ�

- Document ����ʹ���ǿ���ͨ���ű��� HTML ҳ���е�����Ԫ�ؽ��з���

- Document ������ Window �����һ���֣��� window.document

---

<span id="jump10"></span>

## ����ʲô�ǡ��ͻ������ꡱ����ҳ�����ꡱ������Ļ���ꡱ

### �ͻ�������

���ָ���ڿ������е�ˮƽ����(clientX)�ʹ�ֱ����(clientY)

### ҳ������

���ָ����ҳ�沼���е�ˮƽ����(pageX)�ʹ�ֱ����

### ��Ļ����

�豸������Ļ��ˮƽ����(screenX)�ʹ�ֱ����(screenY)

---

<span id="jump11"></span>

## focus/blur �� focusin/focusout ����������ϵ

- focus/blur ��ð�ݣ�focusin/focusout ð��

- focus/blur �����Ժã�focusin/focusout �ڳ� FireFox ���������¶��������ü�����

---

<span id="jump12"></span>

## mouseover/mouseout �� mouseenter/mouseleave ����������ϵ

- mouseover/mouseout �Ǳ�׼�¼��������������֧�֣�mouseenter/mouseleave �� IE5.5 ����������¼������� DOM3 ��׼���ɣ��ִ���׼�����Ҳ֧��

- mouseover/mouseout ��ð���¼���mouseenter/mouseleave��ð�ݡ���ҪΪ���Ԫ�ؼ����������/���¼�ʱ���Ƽ� mouseover/mouseout �йܣ��������