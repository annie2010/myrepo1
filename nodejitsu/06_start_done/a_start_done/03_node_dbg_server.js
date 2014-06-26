#!/usr/bin/env node

process.on('exit',function(code){console.log('EXIT <%s>',code)})
process.on('uncaughtException',function(err){console.log('EXIT uncaughtException <%s>',err);process.exit(1)})

console.log("====begin")

http=require('http')
//profiler=require('v8-profiler')
port=3000

x=0
conn = function(req, res){
 x += 1

 //snapshot=profiler.takeSnapshot('request ' + x);
 //console.log("snapshot profile : request <%d> ",x)
 //console.log(snapshot)
 
 //profiler.startProfiling('request ' + x) 

 console.time('request ' + x) 
 console.log("connected method <%s> url <%s>", req.method, req.url)
 res.writeHead(200, {'Content-Type':'text/plain'})
 res.end('Hello World');
 console.timeEnd('request ' + x) 

 //cpu=profiler.stopProfiling('request ' + x) 
 //console.log("cpu profile : request <%d>",x)
 //console.log(cpu)
}

http.createServer(conn).listen(port)
console.log("HTTP server runs on port <%s>",port)

console.log("====completed successfully")


/** profile
in webkit browser, with node-inspector

chrome browser, dev view, profiles tab
ref: https://www.npmjs.org/package/v8-profiler
**/

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

- webkit browser
-- http://blogs.adobe.com/cantrell/archives/2012/01/a-summary-of-the-webkit-developer-tools.html
**/


/** v8 profile

- ref
-- instruction http://v8.googlecode.com/svn/branches/bleeding_edge/tools/profviz/profviz.html

Instructions

1) Run V8 with --prof --log-timer-events, or alternatively,
2) Chrome with --no-sandbox --js-flags="--prof --log-timer-events" to produce v8.log.
3) Open v8.log on this page. Don't worry, it won't be uploaded anywhere.
4) Click "Start" to start number crunching. This will take a while.
Click "Show plot/profile" to switch between the statistical profile and the timeline plot.
C++ items are missing in the statistical profile because symbol information is not available.
Consider using the command-line utility instead.


**/
