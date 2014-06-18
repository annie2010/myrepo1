#!/usr/bin/env node

console.log("=====begin=====")

process.on('exit', function(f_code){ console.log('\n\nExiting ..', f_code) })
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1) })

console.log("parent pid <%s>",process.pid);

child_process =  require('child_process')

options = {stdio: [null, null, null, 'pipe']}

args1 = ['ssh']
cmd1 = 'grep'
console.log("\n1. child process for <%s>", cmd1)
c1 = child_process.spawn(cmd1, args1, options)
console.log("child name <%s>, pid <%s>",cmd1, c1.pid);
c1.stdin.end()


args2 = ['ssh']
cmd2 = 'ls'
console.log("\n2. child process for <%s>", cmd2)
c2 = child_process.spawn(cmd2, args2, options)
console.log("child name <%s>, pid <%s>",cmd2, c2.pid);
c2.stdin.end()


args3 = [/* ... */]
cmd3 = './c3.js'
console.log("\n3. child process for <%s>", cmd3)
c3 = child_process.spawn(cmd3, args3, options)
console.log("child name <%s>, pid <%s>",cmd3, c3.pid);

data = ['awesome' , 'shanghai', 'annie']
pipe = c3.stdio[3]

pipe.on('data', function(buf){
  console.log("recv fr child <%s>", buf.toString())
  c3.kill('SIGHUP')
})

input = ['awesome' , 'shanghai', 'annie']
input.forEach(function(m){
  console.log("send to child <%s>", m)
  pipe.write(Buffer(m))
})

console.log("=====completed successfully=====")

/** smple runtime

=====begin=====
parent pid <5284>

1. child process for <grep>
child name <grep>, pid <5286>

2. child process for <ls>
child name <ls>, pid <5288>

3. child process for <./c3.js>
child name <./c3.js>, pid <5289>
send to child <awesome>
send to child <shanghai>
send to child <annie>
=====completed successfully=====
recv fr child <[received by child process via pipe] awesomeshanghaiannie>


Exiting .. 0

**/

// description
// - use file descriptors to pipe data between parent/child processes

// ref
// 
// example:
//  http://blog.trevnorris.com/2013/07/child-process-multiple-file-descriptors.html
//
// base:
//  http://nodejs.org/api/child_process.html
