# M-eventHandle.js
nodeJs events 拓展事件处理机制, refs eventproxy.js, 自用~
## 继承events
继承events所有方法。[events API](http://nodejs.org/api/events.html)

## 新增方法

### 调用eventHandle
```
var eventHandle = require("../lib/eventHandle");
var handle = new eventHandle();
```
### all(eventname1, eventname2..., callback)
all方法会注册所有指定事件，并且在所有事件触发完成之后获取回调。
- @param eventname1,eventname2...  事件标识
- @param callback  回调函数

```
handle.all("aa","bb","cc", function(aa, bb, cc){
  // 在所有事件触发后，将会被调用执行
	console.log(aa);
	console.log(bb);
	console.log(cc);
});

var aa = "get aa!";
var bb = "get bb!";
var cc = "get cc!";

setTimeout(function(){
	console.log("emit start !!!");
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
  // 注册after事件，并在事件触发3次之后会被调用执行
  console.log(aa);
	console.log(bb);
	console.log(cc);
});

var aa = "get aa!";
var bb = "get bb!";
var cc = "get cc!";

// 此处emit方法在eventname之后传入两个参数，详细参考events API
setTimeout(function(){
	console.log("emit!!!  1");
	handle.emit("after","aa",aa);
}, 1000);

setTimeout(function(){
	console.log("emit!!!  2");
	handle.emit("after","bb",bb);
}, 1100);

setTimeout(function(){
	console.log("emit!!!  3");
	handle.emit("after","cc",cc);
}, 1200);
```
### fail(callback)
fail方法是个异常处理机制，通过一次注册和触发error事件来处理异常情况。
- @param callback  回调
```
handle.fail(function(){
		console.log("fail!!!!!!!!!!!");
});
```

##Issue
[click here](https://github.com/MJPiero/M-eventHandle.js/issues)
