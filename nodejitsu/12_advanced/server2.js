#!/usr/bin/env node

console.log("=====start")

console.log("server pid <%s>",process.pid)

server = require('net').createServer();
port = 8080

// child_process.fork(modulePath, [args], [options])
normal =  require('child_process').fork('child2.js',['normal']);
special = require('child_process').fork('child2.js',['special']);

server.on('connection', function (socket) {
  console.log('parent handled the connection');

  if (socket.remoteAddress === '74.119.205.248'){ // annie ubuntu machine
    console.log('send socket to child <special>')
    special.send('socket', socket)
    return
  }
 
  console.log('send socket to child <normal>')
  normal.send('socket', socket) // child.send(message, [sendHandle])
});

console.log('server listens on port <%s>',port)
server.listen(port)

console.log("=====end successfully")


// setup for servers
//
// 1 parent, 2 child process, the parent passed socket to child per IP address
// norlam child-process replies to connection with non-speical IP
// specil child-process replies to connection with speical IP
//

// recap
//
// - pipe() betwwne streams
// - child_process() to send server and socket to child processes
//
// ref
// http://nodejs.org/api/child_process.html#child_process_example_sending_socket_object
//

/**
- server

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejitsu/12_advanced]$./server2.js
=====start
server pid <3567>
server listens on port <8080>
=====end successfully
parent handled the connection
send socket to child <normal>
child pid <3569>
child received <socket>
parent handled the connection
send socket to child <special>
child pid <3570>
child received <socket>
parent handled the connection
send socket to child <normal>
child pid <3569>
child received <socket>

- client

annguo@annie-ubuntu-1404:~$ curl http://184.169.223.116:8080
You are handled by the <special> child process

[ubuntu@chicago::ip-10-167-6-127:~]$curl http://0.0.0.0:8080/
You are handled by the <normal> child process

**/

