#!/usr/bin/env node

process.on('exit', function(code){console.log('EXIT <%s>',code)})
process.on('uncaughtException', function(err){console.log('EXIT uncaughtException <%s>',err); process.exit(1)})

console.log("====start")

f1 = function(){
  console.log("\n\n1. a common mistake in async code")
  for (var i=0; i<5; i++){
    setTimeout(function(){
      console.log(i)
    }, i);
  }  
}

f2 = function(){
  console.log("\n\n2. create a closure so that the current value of i is stored")
  for (var i=0; i<5; i++){
    (function(i){ // closure
      setTimeout(function(){
      console.log(i)
      }, i);
    })(i) // closure
  }
}

//console.log(process.argv)
if (process.argv[2]==='closure') {
  f2()
} 
else {
  f1()
}

//throw 1
console.log("====completed successfully")


/** sampe runtime

1) apply closure correctly.

$./02_set_timeout.js closure
====start


2. create a closure so that the current value of i is stored
====completed successfully
0
1
2
3
4
EXIT <0>

2) common err async code

$./02_set_timeout.js  

====start


1. a common mistake in async code
====completed successfully
5
5
5
5
5
EXIT <0>


**/

/** ref
- flow control
-- closure, http://docs.nodejitsu.com/articles/getting-started/control-flow/how-to-write-asynchronous-code
 
- node api
-- setTimeout(), http://nodejs.org/api/timers.html#timers_settimeout_callback_delay_arg
-- process.argv(), http://nodejs.org/api/process.html#process_process_argv

**/
