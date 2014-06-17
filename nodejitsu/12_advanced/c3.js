#!/usr/bin/env node

process.on('exit', function(f_code){ console.log('\n\nExiting ..', f_code) })
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1) })

net = require('net')

pipe = new net.Socket({fd: 3})
console.log("pipe child pid <%s>", process.pid)

pipe.on('data', function(buf){
  console.log("pipe receveid data <%s>", buf.toString())
  out = new Buffer('[received by child process via pipe] '+buf.toString()) 
  pipe.write(out)
})

pipe.on('close', function(code, signal){
  console.log('child process is terminated due to receipt of signal <%s>' , signal)
})
