# M-eventHandle.js
nodeJs events 拓展事件处理机制, refs eventproxy.js, 自用~
## Install
```
npm install eventhandle.js
```
## 继承events
继承events所有方法。[events API](http://nodejs.org/api/events.html)

## 新增方法

### 调用eventHandle
```
var eventHandle = require("eventhandle.js");
var handle = new eventHandle();
```
### all(eventname1, eventname2..., callback)
all方法会注册所有指定事件，并且在所有事件触发完成之后获取回调。
- @param eventname1,eventname2...  事件标识
- @param callback  回调函数

```
handle.all("aa","bb","cc", function(aa, bb, cc){
  // 在所有事件触发后，将会被调用执行
  // 可以依照顺序获取传入的 aa,bb,cc 的值
});

var aa = "get aa!";
var bb = "get bb!";
var cc = "get cc!";

setTimeout(function(){
// 触发aa,bb,cc 事件	
	handle.emit("aa",aa);
	handle.emit("bb",bb);
	handle.emit("cc",cc);
}, 500);
```

### after(eventname, times, callback)
after方法实现在多次触发统一事件时，在指定触发次数之后获取回调。
- @param eventname  事件标识
- @param times  事件被触发次数
- @param callback  回调

```
handle.after("after", 3,function(aa, bb, cc){
  // 监听after事件，并在事件触发3次之后会被调用执行
  // 并获取相对应的参数
});

var aa = "get aa!";
var bb = "get bb!";
var cc = "get cc!";

// 此处emit方法在eventname之后传入两个参数，详细参考events API
setTimeout(function(){
	handle.emit("after","aa",aa);
}, 1000);

setTimeout(function(){
	handle.emit("after","bb",bb);
}, 1100);

setTimeout(function(){
	handle.emit("after","cc",cc);
}, 1200);
```
### fail(callback)
fail方法是个异常处理机制，通过监听所有error事件来处理异常情况。
- @param callback  回调
```
handle.fail(function(err){
 // 监听error事件，并且获取捕获到的err
 // 此处console.log(err.message) 会显示aa is not defined
});

try{
	aa++;
}catch(err){
	handle.emit("error", err);
}

```

## Test
在终端输入
```
npm test
```
## Issues
[click here](https://github.com/MJPiero/M-eventHandle.js/issues)
