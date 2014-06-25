#!/usr/bin/env node

process.on('exit',function(code){console.log('EXIT <%s>',code)})
process.on('uncaughtException',function(err){console.log('EXIT uncaughtException <%s>',err);process.exit(1)})

console.log("====begin")

http=require('http')
port=3000

conn = function(req, res){
 console.log("connected method <%s> url <%s>", req.method, req.url)
 res.writeHead(200, {'Content-Type':'text/plain'})
 res.end('Hello World');
}

http.createServer(conn).listen(port)
console.log("HTTP server runs on port <%s>",port)

console.log("====completed successfully")

/** debug

1) find server ip
$ curl curlmyip.com // 184.169.223.116

2) start node-inspector
$ node-inspector // $ npm install node-inspector -g

3) launch server in debug mode
$ node --debug app.js // started the server
$ node --debug-brk app.js // not start the server

4) go to webkit browser, run the server in debug mode
in webkit brwoser, go to 184.169.223.116:8080/debug?port=5858
set breakpoint and start to run

**/

/** runtime w debug

1) launch inspector
$ node inspector

2) start server
$ node --debug app.js
$ node --debug-brk app.js

3) in brwoser, 
http://184.169.223.116:8080/debug?port=5858
set break point
watch variables

4) run client
$ curl -v http://127.0.0.1:3000/
* About to connect() to 127.0.0.1 port 3000 (#0)
*   Trying 127.0.0.1... connected
> GET / HTTP/1.1
> User-Agent: curl/7.22.0 (x86_64-pc-linux-gnu) libcurl/7.22.0 OpenSSL/1.0.1 zlib/1.2.3.4 libidn/1.23 librtmp/2.3
> Host: 127.0.0.1:3000
> 
< HTTP/1.1 200 OK
< Content-Type: text/plain
< Date: Wed, 25 Jun 2014 22:03:24 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
* Connection #0 to host 127.0.0.1 left intact
* Closing connection #0
Hello World

**/

/** runtime wo debug

1) srart server

$./03_node_dbg_server.js
====begin
HTTP server runs on port <3000>
====completed successfully
connected method <GET> url </>

2) start client
$ curl -v http://127.0.0.1:3000/
* About to connect() to 127.0.0.1 port 3000 (#0)
*   Trying 127.0.0.1... connected
> GET / HTTP/1.1
> User-Agent: curl/7.22.0 (x86_64-pc-linux-gnu) libcurl/7.22.0 OpenSSL/1.0.1 zlib/1.2.3.4 libidn/1.23 librtmp/2.3
> Host: 127.0.0.1:3000
> 
< HTTP/1.1 200 OK
< Content-Type: text/plain
< Date: Wed, 25 Jun 2014 21:54:59 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
* Connection #0 to host 127.0.0.1 left intact
* Closing connection #0
Hello World

**/


/** ref

- nodejitsu
-- http://docs.nodejitsu.com/articles/getting-started/how-to-debug-nodejs-applications

- node api
-- http request, incoming msg: http://nodejs.org/api/http.html#http_http_incomingmessage

**/

