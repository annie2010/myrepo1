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

isTrue(false, done)
isTrue(true, done)

console.log("=====My program ends successfually")
// ref
// http://docs.nodejitsu.com/articles/errors/what-are-the-error-conventions
