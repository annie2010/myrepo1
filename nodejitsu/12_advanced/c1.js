#!/usr/bin/env node

console.log("=====begin")

process.on('exit',function(f_code){console.log('Exit with code .. ', f_code)});
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1) })

///////////////////////////////////
console.log('Process pid: ' + process.pid);

console.log("\n1. child process kill itself")

spawn = require('child_process').spawn,

c1  = spawn('grep', ['ssh']);
console.log('Spawned child pid: ' + c1.pid);

c1.on('close', function(code, signal){
  console.log('child process is terminated due to receipt of signal <%s>' , signal)
})

//child.stdin.end();
c1.kill('SIGHUP')

console.log("\n2. sending server object")
console.log("\n3. sending socket object")
///////////////////////////////////
console.log("\n\n=====completed successfully")

// ref
// http://nodejs.org/api/child_process.html

