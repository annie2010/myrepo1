#!/usr/bin/env node

process.on('exit', function(code){console.log("EXIT <%s>",code)})
process.on('uncaughtException', function(err){console.log("EXIT uncaughtException <%s>",err); process.exit(1)})

util=require('util')
console.log("====start")
console.log(util.inspect(process.memoryUsage()));
console.log("process uptime <%s>",process.uptime());

console.log("process cwd <%s>",process.cwd())

setTimeout(
  function(){ console.log("Hello") 
} ,0)

process.nextTick(function(){
  console.log(util.inspect(process.memoryUsage()));
  console.log("Next trip aroud (on the top of the next round of event loop, this is efficient)")
});

//throw "sf"
console.log("process uptime <%s>",process.uptime());
console.log("====completed successfully")

/** sample runtime
$./04_process.js 
====start
process cwd </home/ubuntu/myrepo1/myrepo1/nodejitsu/06_start/a_start>
====completed successfully
Next trip aroud (on the top of the next round of event loop, this is efficient)
Hello
EXIT <0>

**/

/** ref
- nodejitsu
-- http://docs.nodejitsu.com/articles/getting-started/the-process-module

- node api
-- http://nodejs.org/api/process.html#process_process_nexttick_callback
-- process uptime, 
-- mem usage, http://nodejs.org/api/process.html#process_process_memoryusage
**/

