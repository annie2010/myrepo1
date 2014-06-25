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

/**
// ref
// callbacks - http://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-callbacks

// step 1: define asyn function signature (parameters, callback)
// step 2: define calback function signature (err, data)
// step 3: implement async function
// step 4: implement callback function

done = function(err, data){
}

async_call = function(parameters, done){
  // a lot of work
  if (err)
    done(new Error("an error occurred"))
  done(null, data)
}

The typical convention with asynchronous functions (which almost all of your functions should be):

// named-callback function 
function asyncOperation ( a, b, c, callback ) {
  // ... lots of hard work ...
  if ( // an error occurs // ) {
    return callback(new Error("An error has occured")); <-------
  }
  // ... more work ...
  callback(null, d, e, f); <-------
}

// anonymous-callback function
asyncOperation ( params.., function ( err, returnValues.. ) {
   //This code gets run after the async operation gets run
});

**/
