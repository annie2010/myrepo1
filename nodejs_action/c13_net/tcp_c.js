#!/usr/bin/env node

net  = require('net')
host = process.argv[2]
port = process.argv[3]

socket = net.connect(port, host)

socket.on('connect', function(){
  process.stdin.pipe(socket)  // stdin to socket
  socket.pipe(process.stdout) // socket to stdout
  //process.stdin.resume()      // stdin resume
})

socket.on('end', function(){
  process.stdin.pause()      // stdin pause
})

/** node API

-  process module, 
-
-- process.argv, An array containing the command line arguments.
-- process.stdin, A Readable Stream for stdin.
-- A Writable Stream to stdout.

-  fs module, http://nodejs.org/api/fs.html

-  child_process module

**/

/** run time

1) First example

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejs_action/c13_net]$./tcp_c.js 127.0.0.1 8080
hello
hello

2) Another example

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejs_action/c13_net]$./tcp_c.js towel.blinkenlights.nl 23

**/
