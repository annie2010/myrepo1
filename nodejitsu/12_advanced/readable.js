#!/usr/bin/env node


console.log("=====begin")

process.on('exit', function(f_code){ console.log('\n\nExiting ..', f_code) })
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1) })

http = require('http')
fs = require('fs')
util = require('util')

port = 8080

ep = function(f_req, f_res){
  console.log('New connection, socket fd', ep.arguments[0].socket._handle.fd)
  console.log('client fd', ep.arguments[0].client._handle.fd)
  console.log('server fd', ep.arguments[0].client.server._handle.fd)
  //console.log(util.inspect(ep, { showHidden: true, depth: null }))
  //console.log(util.inspect(ep, { showHidden: true, depth: 4 }))
  fname = __dirname + f_req.url
  r = fs.createReadStream(fname)

  r.on('open',  function()      { r.pipe(f_res) })  
  r.on('error', function(f_err){ f_res.end(f_err) })  
}

console.log('HTTP Server listens on port : ', port )
http.createServer(ep).listen(port)

console.log("=====completed successfully")


/** runtime

// server

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejitsu/12_advanced]$./readable.js 2>&1 | tee /tmp/1.txt 
=====begin
HTTP Server listens on port :  8080
=====completed successfully
New connection, socket fd 11
client fd 11
server fd 10
New connection, socket fd 11
client fd 11
server fd 10

// client

[ubuntu@chicago::ip-10-167-6-127:~]$curl -v http://184.169.223.116:8080/annie.txt
* About to connect() to 184.169.223.116 port 8080 (#0)
*   Trying 184.169.223.116... connected
> GET /annie.txt HTTP/1.1
> User-Agent: curl/7.22.0 (x86_64-pc-linux-gnu) libcurl/7.22.0 OpenSSL/1.0.1 zlib/1.2.3.4 libidn/1.23 librtmp/2.3
> Host: 184.169.223.116:8080
> Accept: *
> 
< HTTP/1.1 200 OK
< Date: Tue, 17 Jun 2014 16:38:10 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
Hello Annie
Hello World
* Connection #0 to host 184.169.223.116 left intact
* Closing connection #0

**/

// ref
//
// http://nodejs.org/api/util.html
//
// http://docs.nodejitsu.com/articles/advanced/streams/how-to-use-fs-create-read-stream
