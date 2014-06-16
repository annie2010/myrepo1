#!/usr/bin/env node

net = require('net')
port = 8080

console.log('Start TCP server on port ', port)

cb_connected = function(f_socket){
  console.log('\r\nsocket connected')

  f_socket.on('data', function(f_d){ console.log('data event: ', f_d) })
  f_socket.on('end', function(){ console.log('"end" event') })
  f_socket.on('close', function(){ console.log('"close" event') })
  f_socket.on('error', function(f_e){ console.log('"error" event: ',f_e) })
  f_socket.pipe(f_socket) // echo 
}

net.createServer(cb_connected).listen(port)


// node API

/**

- Stream 
-
-- Streams can be either Readable, Writable, or both (Duplex).
-- All streams are EventEmitters, but they also have other custom methods and properties depending on whether they are 
---Readable, Writable, or Duplex.

- Net
-
-- The net module provides you with an asynchronous network wrapper. It contains methods for creating both servers and clients (called 
---streams). You can include this module with require('net');

- Buffer
-
-- Pure JavaScript is Unicode friendly but not nice to binary data. When dealing with
---TCP streams or the file system, it's necessary to handle octet streams. Node has several strategies for manipulating, creating, and consuming octet streams.
-- Raw data is stored in instances of the Buffer class. A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap. A Buffer cannot be resized.

**/

/**
net.createServer(function(f_socket){

  console.log('\r\nsocket connected')

  f_socket.on('data', function(f_d){ console.log('data event: ', f_d) })
  f_socket.on('end', function(){ console.log('"end" event') })
  f_socket.on('close', function(){ console.log('"close" event') })
  f_socket.on('error', function(f_e){ console.log('"error" event: ',f_e) })
  f_socket.pipe(f_socket) // echo 
}).listen(port)
**/

// ref node API - net
// 
// - net.createServer 
// - net events, http://nodejs.org/api/net.html#net_event_connect
//
// - class: net.Server
// - class: net.Socket

// ref node API - stream
// 
// - readable.pipe(dest, [options]), http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
// - ex, readable.pipe(writable)


// run time

// server

/***
[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejs_action/c13_net]$./tcp_s.js 

Start TCP server on port  8080

socket connected
data event:  <Buffer 68 65 6c 6c 6f 0d 0a>
data event:  <Buffer 0d 0a>
"end" event
"close" event

***/

// client

/**

[ubuntu@chicago::ip-10-167-6-127:~]$telnet 184.169.223.116 8080

Trying 184.169.223.116...
Connected to 184.169.223.116.
Escape character is '^]'.
hello
hello
Killed

**/


