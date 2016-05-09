/**
 * toutou.escort.js -- js扩展的插件,可以有效的提高js效率,解决js中遇到的某些疑难杂症[注1],为你的程序保驾护航。
 *
 * @version 1.0
 * @author 头头哥
 * @requires None
 * @createDate 4/30/2014
 * @modifyDate 4/30/2014
 *
 * 注1: 可解决的某些疑难杂症如下(包含如下但不局限于如下,更多疑难杂症需要你的奇思妙想)
 * StringBuffer 高效率字符串拼接
 * uniqueescort 数组去重用的原型扩展，可以直接使用
 * 数组是否包含某一项
 * 数组删除制定项
 * isFilled/isEmpty字符串检测非空与空
 * format 将指定的 String类型的数据中的每个格式项替换为相应对象的值的文本等效项。  类似C# string.format()
 * 得到指定范围内的随机数
 * 获取JSON的属性  js本身没有反射机制，所以需要自己手动获取
 **/

// 高效率字符串拼接
function StringBuffer() {
    this._strings_ = new Array();
};

StringBuffer.prototype.append = function (str) {
    this._strings_.push(str);
};

StringBuffer.prototype.toString = function () {
    return this._strings_.join('');
};

/*Example:
* var buffer = new StringBuffer();
* buffer.append("hello ");
* buffer.append("world");
* var result = buffer.toString(); */

// 数组去重
Array.prototype.uniqueescort = function () {
    this.sort();
    var re = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== re[re.length - 1]) {
            re.push(this[i]);
        }
    }
    return re;
};

/*Example:
* var a=[1,1,2,3,3];
* a=a.uniqueescort(); */

// 数组是否包含某一项  如果引用了jQuery的话， 可以考虑使用$.inArray("item", arr)方法
if (typeof Array.prototype.contains !== "function") {
    Array.prototype.contains = function (item) {
        return this.indexOf(item) == -1 ? false : true;
    };
}

// 这里判断是否已经存在Array.contains()方法还可以使用 Array.prototype.contains = Array.prototype.contains || function(item) {...}; 看自己取舍吧。
/*Example:
* var a=[1,1,2,3,3];
* a=a.contains(3); true */

// 数组删除指定项
if (typeof Array.prototype.remove !== "function") {
    Array.prototype.remove = function (item, isRemoveAll) {
        var index = this.indexOf(item);
        if (index > -1) {
            this.splice(index, 1);
            if (isRemoveAll && index > -1) {
                this.remove(item, isRemoveAll);
            }
        }

        return this;
    };
}

// 字符串检测非空与空
String.prototype.isFilled = function () {
    return this && this.length > 0;
};

String.prototype.isEmpty = function () {
    return !this.IsFilled();
};

/*Example:
* var a="1"
* console.log(a.IsFilled());  result: true*/

// 类似C# string.format()
if (typeof String.prototype.format !== "function") {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    }
}

/*Example:
* var a="{0}的{1}说翻{2}翻"
* console.log(a.format('友谊','小船','就'));  result: 友谊的小船说翻就翻*/

// 得到指定范围内的随机数
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*Example:
* var a=randomize(1,100);
* console.log(a);*/

// 获取JSON的属性
function GetProperties(json) {
    var properties = [];
    for (var prop in json) {
        properties[properties.length] = prop;
    }

    return properties;
}

/*Example:
var a = { 'id': '1', 'name': 'ming', 'info': 'like', 'pwd': '123', 'date': '4-20-2016' };
var aa = GetProperties(a);*/
