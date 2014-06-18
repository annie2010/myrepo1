#!/usr/bin/env node

console.log("=====start")

console.log("server pid <%s>",process.pid)

server = require('net').createServer();
port = 8080

child = require('child_process').fork('child.js');

server.on('connection', function (socket) {
  console.log('parent handled the connection');
  socket.end('handled by parent\n');
});

server.listen(port, function() {
  console.log('server sends to child a message <server>')
  child.send('server', server);
});

console.log("=====end successfully")

// setup,
// server:  both parent and child processes are listening to connections via server object
// client: curl coammand for client connection

/** runtime

// server

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejitsu/12_advanced]$./server.js 

=====start
server pid <3295>
=====end successfully

server sends to child a message <server>

child pid <3297>
child received <server>

parent handled the connection
child handled the connection
parent handled the connection

// client

[ubuntu@chicago::ip-10-167-6-127:~]$curl http://0.0.0.0:8080/
handled by parent

[ubuntu@chicago::ip-10-167-6-127:~]$curl http://0.0.0.0:8080/
handled by child

[ubuntu@chicago::ip-10-167-6-127:~]$curl http://0.0.0.0:8080/
handled by parent

[ubuntu@chicago::ip-10-167-6-127:~]$curl http://0.0.0.0:8080/
handled by parent

**/

// ref
// http://nodejs.org/api/child_process.html#child_process_example_sending_server_object
//
// the server is now shared between the parent and child, this means that some connections will be handled by the parent and some by the child.

