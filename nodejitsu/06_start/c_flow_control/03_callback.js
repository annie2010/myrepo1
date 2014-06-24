#!/usr/bin/env node

process.on('exit', function(code){console.log('EXIT <%s>',code)})
process.on('uncaughtException', function(err){console.log('EXIT uncaughtException <%s>',err); process.exit(1)})

console.log("=====start")

f1 = function(){ return 100 }

p1 = function(){
  data = f1()
  data +=1
  return data
}

done = function(err, data){
  if (err)
    console.log("err <%s>",err)
  else
    console.log("data <%s>",data)
}

p2 = function(err,callback){
  if(err==1){
     callback(err, null)
     return
   }
   data = 101
   callback(null,data)
}

console.log("\n\n0. function call returns data")
console.log("data <%s>",p1())

console.log("\n\n1. callback with data")
p2(0,done)

console.log("\n\n2. callback with err")
p2(1,done)
//throw "annie"
console.log("=====completed successfully")


/** sample runtime

$./03_callback.js 
=====start


0. function call returns data
data <101>


1. callback with data
data <101>


2. callback with err
err <1>
=====completed successfully
EXIT <0>


**/

// ref
// callbacks - http://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-callbacks
