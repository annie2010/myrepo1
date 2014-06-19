#!/usr/bin/env node
console.log("====begin")


process.on('exit', function(f_code){ console.log('Exiting ..', f_code); });
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1); });

http=require('http')
port=1337
conn=function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'})
  res.end('Hello World!')
}
console.log("HTTP Server listens on port <%s>",port)
http.createServer(conn).listen(port)

console.log("====completed successfully")

/**
recap
1) run node-inspector
2) start node server in debug mode
3) go to  WebKit browser to debug
4) start client to drive the app 

details

A) on chicago, prep
=============
$ npm install node-inspector

B) steps

1) on chicago, start node server.js
=============
$ node --debug-brk server.js
debugger listening on port 5858
 
2) on chicago, start node-inspector
=============
$ node-inspector
Node Inspector v0.7.4
Visit http://127.0.0.1:8080/debug?port=5858 to start debugging.

3) in WebKit Browser, go to url
====================
http://184.169.223.116:8080/debug?port=5858

3.a) set break point, 
3.b) run
3.c) watch variables

4) on chicago, run curl client
=============
$curl -v http://127.0.0.1:1337/
..
Hello World!

**/
