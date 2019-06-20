# 函数类型

## 简介

> 函数是一个对象，函数名是指向函数的指针

## 定义

1. 通过function进行定义

```javascript
function fun() {
	console.log("hello world");
}
```

2. 通过函数表达式进行定义

```javascript
let fun = function() {
	console.log("hello world");
}
```

## function和函数表达式的区别

1. function定义函数

通过function定义函数，可以先使用，在使用的后面进行定义，这是因为在解析的时候，会把函数放到源代码树的顶部

2. 函数表达式定义函数

通过函数表达式定义函数，就好比定义一个变量一样，需要先定义在使用，并不会做变量提升（把声明的变量放到源代码树的顶部）

## 运用

1. 函数名是指向函数的指针，所以可以将函数作为一个实参传个形参

```JavaScript
function add(num1, num2) {
    return num1 + num2;
}

function callFunction(fun, num1, num2) {
    return fun(num1, num2);
}
let result = callFunction(add, 10, 20);
console.log(result);
````

2. 可以将函数作为返回值返回

```JavaScript

//这样写是最好的，第一次看会有些不理解，但推荐这种写法
function cmp(propertyName) {
    return function (obj1, obj2) {
        let value1 = obj1[propertyName];
        let value2 = obj2[propertyName];

        if (value1 < value2) {
            return 1;
        } else if (value1 > value2) {
            return -1;
        } else {
            return 0;
        }
    };
}

//上面这种写法如果看不懂，可以看这种写法，但不推荐
function cmp(propertyName) {
	//通过函数表达式进行定义
    let temp = function (obj1, obj2) {
        let value1 = obj1[propertyName];
        let value2 = obj2[propertyName];

        if (value1 < value2) {
            return 1;
        } else if (value1 > value2) {
            return -1;
        } else {
            return 0;
        }
    };
    //将值返回，再次说明，不推荐这种写法
    return temp;
}


let data = [
    {name: 'ascdg', age: 33},
    {name: 'kxiekcuis', age: 12}
];

data.sort(cmp('name'));
console.log(data);
data.sort(cmp('age'));
console.log(data);
```

## this和arguments

### this

> 引用的是函数据以执行的环境对象————在全局作用域调用函数，this指向的是Windows，在对象作用域调用指向的就是这个对象

看下面的例子

```javascript
window.color = "red";

let o = { color: 'blue'};

function sayColor() {
    console.log(this.color);
}

o.sayColor = sayColor;
//全局作用域调用，this指向的是windows
sayColor();
//windows对象调用，this指向的是windows对象
window.sayColor();
//o对象调用，this指向的是o对象
o.sayColor();
````

### arguments

> 包含传入函数中的所用参数，还要一个叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数,但是**在严格模式下不能使用arguments.callee这个属性**

```javascript
// 对于以及阶层函数
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }

}

//可以改写为，在严格模式下不能使用
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }

}

console.log(factorial(10));
````

## apply

设置	函数体内this对象的值，即改变this的指向。

apply传递两个参数，一个是在其中运行函数的作用域，另一个是参数数组

```javascript
let color = {
    color: 'blue'
};
window.color = "red";

function fun(value) {
    console.log("value =", value);
    console.log(this.color);
}

//第二个参数必须是数组，也可以没哟第二个参数
fun.apply(this, ['this is window']);
fun.apply(this);
fun.apply(window, ['this is window']);
fun.apply(color, ['this is color']);
```

## call

call与apply一样，也是设置函数体内this对象的值，但是传递的参数不同，第一个是其中运行函数的作用域，后面可以是一个或多个，每一个代表一个实数，参数的传递与apply有些不同

```JavaScript
let color = {
    color: 'blue'
};
window.color = "red";

function fun(value1, value2) {
    console.log("value1 =", value1);
    console.log('value2 = ', value2)
    console.log(this.color);
}

fun.call(this, 'value1', 'value2');
fun.call(this);
fun.call(window, ['value1', 'value2'], 'value3');
fun.call(color, 'value1', 'value2');
```
## bind

bind的作用与apply和call一样，也是设置函数体内this对象的值，与apply和call不同的是，它只需要传递一个参数，并将其赋值给一个变量，并且确定this的所指的对象就是传入的参数

```JavaScript
let color = {
    color: 'blue'
};
window.color = "red";

function fun() {
    console.log(this.color);
}

let funW = fun.bind(window);
funW();
let funC = fun.bind(color);
funC();
````
