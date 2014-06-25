#!/usr/bin/env node

process.on('exit', function(code){console.log("EXIT <%s>",code)});
process.on('uncaughtException', function(err){console.log("EXIT uncaughtException <%s>",err); process.exit(1)});


console.log("====begin")

console.time('t1')

console.log("1. console.dir")
console.dir(console)
//console.dir(process)

console.log("\n\n2. console.log")
console.log("File name: %s",__filename) 
console.log("Process title: %s",process.title)
console.log("Process argv: %j",process.argv)

console.log("\n\n3. console.time")
console.timeEnd('t1')

console.log("\n\n4. console.trace")
console.trace()

console.log("\n\n5.a console.assert")
try{
  console.assert(1==1)
  console.assert("hello"=="hello")
  console.assert(11==2)
}
catch (err){
  console.log(err)
}

console.log("\n\n5.b console.assert")
console.assert(1==1)
console.assert("hello"=="hello")
console.assert(11==2) // console.assert(expression, [message]), 
// Same as assert.ok() where if the expression evaluates as false throw an AssertionError with message.

//throw ("sf")
console.log("====completed successfully")

/** sample runtime
$./02_console_log.js 
====begin
1. console.dir
{ log: [Function],
  info: [Function],
  warn: [Function],
  error: [Function],
  dir: [Function],
  time: [Function],
  timeEnd: [Function],
  trace: [Function],
  assert: [Function],
  Console: [Function: Console] }


2. console.log
File name: /home/ubuntu/myrepo1/myrepo1/nodejitsu/06_start/a_start/02_console_log.js
Process title: node
Process argv: ["node","/home/ubuntu/myrepo1/myrepo1/nodejitsu/06_start/a_start/02_console_log.js"]


3. console.time
t1: 4ms


4. console.trace
Trace
    at Object.<anonymous> (/home/ubuntu/myrepo1/myrepo1/nodejitsu/06_start/a_start/02_console_log.js:24:9)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:902:3


5.a console.assert
{ name: 'AssertionError',
  actual: false,
  expected: true,
  operator: '==',
  message: 'false == true' }


5.b console.assert
EXIT uncaughtException <AssertionError: false == true>
EXIT <1>
**/
/**

ref 

- nodejitsu
-- http://docs.nodejitsu.com/articles/getting-started/the-console-module

- node console.
-- http://nodejs.org/api/stdio.html#stdio_console_assert_expression_message
**/
