require("should");

var eventHandle = require("../");
var handle = new eventHandle();

describe("test all()", function() {
	var aa = "get aa!";
	var bb = "get bb!";
	var cc = "get cc!";
	
	it("should success callback(aa,bb,cc) after all events emit",function(){
		handle.all("aa","bb","cc", function(aa, bb, cc){
			aa.should.eql("get aa!");
			bb.should.eql("get bb!");
			cc.should.eql("get cc!");
		});
		handle.emit("aa",aa);
		handle.emit("bb",bb);
		handle.emit("cc",cc);
	});
});

describe("test after()", function() {
	var aa = "get aa!";
	var bb = "get bb!";
	var cc = "get cc!";
	
	it("should success callback(aa,bb,cc) after 3 times emit",function(){
		handle.after("after", 3, function(aa, bb, cc){
			aa.should.eql("get aa!");
			bb.should.eql("get bb!");
			cc.should.eql("get cc!");
		});
		handle.emit("after","aa",aa);
		handle.emit("after","bb",bb);
		handle.emit("after","cc",cc);
	});
});

describe("test fail()", function() {
	it("should send error message",function(){

		handle.fail(function(err){
			err.message.should.equal("aa is not defined");
		});

		try{
			aa++;
		}catch(err){
			handle.emit("error",err);
		}
	});

});