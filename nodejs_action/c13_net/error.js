#!/usr/bin/env node

console.log("=====My program starts")

process.on('exit', function(f_code){ console.log('Exiting ..', f_code) })
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1) })

util = require('util');

var isTrue = function(f_v, f_done){
  if (f_v === true){
    f_done(null, 'Value was true')
  }
  else{ 
    f_done(new Error('Value is not true'))
  }
}


var done = function(f_err, f_ret){
  if (f_err) {
    console.log(f_err)
    return
  }
  console.log(f_ret)
}

console.log("\n\n== Drive 1, callback with err or not")
isTrue(false, done)
isTrue(true, done)


console.log("\n\n== Drive 2, error object")
var error = new Error("The error message");
console.log(error);
console.log(error.stack);

console.log("\n\n== Drive 3, try catch")
try{
  console.log("Enter try-block")
  throw "thrown message"
  console.log("Exit try-block")
}
catch(e){
  console.log("Enter catch-block")
  console.log("CATCH : ",e)
  console.log("Exit catch-block")
}
finally{
  console.log("Enter finally-block")
  console.log("Exit finally-block")
}
console.log("== Drive 3, try catch, done")


console.log("\n\n=====My program ends successfually")

// ref
//
// http://docs.nodejitsu.com/articles/errors/what-are-the-error-conventions
//
// http://docs.nodejitsu.com/articles/errors/what-is-the-error-object
//
// http://docs.nodejitsu.com/articles/errors/what-is-try-catch
