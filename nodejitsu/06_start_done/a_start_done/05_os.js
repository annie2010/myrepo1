#!/usr/bin/env node

process.on('exit', function(code){console.log('EXIT <%s>', code)})
process.on('uncaughtException', function(err){console.log('EXIT uncaughtException <%s>', err);process.exit(1)})

console.log("====begin")

//console.log("process pid <%s>", process.pid)
//console.dir(process)

os = require('os')
//console.dir(os)

console.log("\n\n1. network interfaces")
console.log(os.networkInterfaces())

console.log("\n\n2. uptime <%s>, \nhostname <%s>, \ntype <%s>, \nplatform <%s>, \narch <%s>, \nrelease <%s>", 
os.uptime(),
os.hostname(),
os.type(),
os.platform(),
os.arch(),
os.release())

console.log("\n\n3. total mem")
console.log(os.totalmem())

console.log("\n\n4.a myip via lib-sys")
sys = require('sys')
//console.dir(sys)
exec = require('child_process').exec;
puts=function(error, stdout, stderr) { sys.puts(stdout) }
exec("curl curlmyip.com", puts);
// http://www.dzone.com/snippets/execute-unix-command-nodejs


console.log("\n\n4.b myip via lib-util")
util = require('util')
//console.dir(util)
child = require('child_process');
//console.dir(child)
exec = child.exec;
done=function(error, stdout, stderr) { 
  util.puts(stdout)  // util.puts([...])
  // A synchronous output function. Will block the process and output all arguments to stdout with newlines after each argument.
}

// child_process.exec(command, [options], callback)
exec("curl curlmyip.com", done);


//throw "sf"
console.log("====completed successfully")

/** ref
- node api
-- os, http://nodejs.org/api/os.html

- node core lib
-- http://nodejs.org/api/util.html#util_util_puts
-- https://github.com/joyent/node/tree/master/lib

**/
