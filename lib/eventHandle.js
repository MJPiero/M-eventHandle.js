/**
 * events extend 
 * only use with nodejs
 * refs -> eventproxy.js
 */
var eventEmitter = require("events").EventEmitter,
	util = require("util");

/**
 * 主函数
 */
 var eventHandle = function(){
 	if (!(this instanceof eventHandle)) {
 		return new eventHandle();
 	}
 	eventEmitter.call(this);
 	this._active = {};
 };

// 继承events方法
util.inherits(eventHandle, eventEmitter);

var handle = new eventHandle();

// common
var SLICE = Array.prototype.slice;
var CONCAT = Array.prototype.concat;
var ALL_EVENT = '_all_';


/**
 * 'All' event handle
 */
 eventHandle.prototype.bindForAll = function (callback) {
 	this.addListener(ALL_EVENT, callback);
 };

 eventHandle.prototype.unbindForAll = function (callback) {
 	this.removeListener(ALL_EVENT, callback);
 };

/**
 * 事件标识
 */
var event_assign = function(eventname1, eventname2, cb, once){
	var handle = this;
	var argsLength = arguments.length;
	var times = 0;
    var flag = {};

    if (argsLength < 3) {
        return this;
    }
    var events = SLICE.call(arguments, 0, -2);
    var callback = arguments[argsLength - 2];
    var isOnce = arguments[argsLength - 1];
    if (typeof callback !== "function") {
        return this;
    }

	var bind = function(key){
		var method = isOnce ? "once" : "addListener";
		handle[method](key, function (data) {
            handle._active[key] = handle._active[key] || {};
            handle._active[key].data = data;
            if (!flag[key]) {
                flag[key] = true;
                times++;
                handle.emit(ALL_EVENT);
            }
        });
	};

	var length = events.length;
	for (var index = 0; index < length; index++) {
		bind(events[index]);
	}

	var _all = function () {
        if (times < length) {
            return;
        }
        var data = [];
        for (var index = 0; index < length; index++) {
            data.push(handle._active[events[index]].data);
        }
        if (isOnce) {
            handle.unbindForAll(_all);
        }
        callback.apply(null, data);
    };
    handle.bindForAll(_all);
}


/**
 * 多次触发同一事件
 * @param  {Sting}   eventName 事件名称
 * @param  {Number}   times    事件触发次数
 * @param  {Function} callback  回调
 */
eventHandle.prototype.after = function(eventName, times, callback){
	var handle = this;
	var argsLength = arguments.length;
	var callback = arguments[argsLength - 1];
	if(typeof times !== "number"){
		console.trace("invalid param times!");
	}else{
		if(times === 0){
			callback.call(null, []);
			return this;
		}
		var results = [];
		function onevent(key, value){
			results.push(value);
			times--;
			if(times < 1){
				callback.apply(null, results);
				handle.removeListener(eventName, onevent);
			}
		}
		handle.addListener(eventName, onevent);
	}
};

/**
 * 多对多事件触发
 * @return {[type]} [description]
 */
eventHandle.prototype.all = function(eventname1, eventname2, callback) {
	var args = CONCAT.apply([], arguments);
    args.push(true);
    event_assign.apply(this, args);
    return this;
};

/**
 * 异常处理
 * @return {[type]} [description]
 */
eventHandle.prototype.fail = function(callback){
	var handle = this;
	handle.once("error", function(){
		handle.removeAllListeners();
		callback.apply(null, arguments);
	});
	handle.emit("error");
	return this;
};


// export
module.exports = eventHandle;