#!/usr/bin/env node
console.log("==start")

process.on('Exit', function(f_code){console.log('Exit with code .. ', f_code)});
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1) })

http = require('http')
fs = require('fs')
util = require('util')

port = 8080

ep = function(f_req, f_res){
  console.log("New connection: method <%s> URL <%s>", f_req.method, f_req.url )
  //console.log(util.inspect(f_req, { showHidden: true, depth: null }))
  //console.log(f_res)

  w = fs.createWriteStream('./output.txt')
  f_req.pipe(w)

  f_req.on('end', function(){
    f_res.writeHead(200, {'content-type':'text/html'})
    f_res.end('<form method="POST"><input name="test"/><input type="submit"></form>')
  });

  w.on('error', function(f_err){console.log(f_err)})
}


console.log("Start HTTP Server on port", port)
http.createServer(ep).listen(port)

console.log("==completed successfully")

/** sample runtime

// server
$ killall node
$ ./writable.js 2>&1 | tee /tmp/2.txt

// client
in browser, http://184.169.223.116:8080

**/
// recap
//
// protocol: HTTP
//
// server, http.Server
// client, http.Client
//
// request, response, http.incomingmessage - stream, readable, writable
//
// ref
// http://docs.nodejitsu.com/articles/advanced/streams/how-to-use-fs-create-write-stream
//
// Class: http.Server
//  This is an EventEmitter with the following events:
//
// Class: http.ClientRequest
//  This object is created internally and returned from http.request().
//    It represents an in-progress request whose header has already been queued.
//
// http.Incomingmessage
//
// An IncomingMessage object is created by http.Server or http.ClientRequest and 
//  passed as the first argument to the 'request' and 'response' event respectively. It may be used to access response status, headers and data.
//
// http://nodejs.org/api/http.html#http_http_incomingmessage
//
// - message.headers, The request/response headers object.
// - message.method, Only valid for request obtained from http.Server.
// - message.url, Only valid for request obtained from http.Server.

