#!/usr/bin/env node

console.log("=====begin")



http = require('http')
port  = 8080
port2 = 9000

conn2 = function(req, res){
  console.log("New connection to port <%s>", port2)

  res.writeHead(200, {'Content-Type':"text/plain"})
  res.write('request successfully proxied to port ' +  port2 + '!\n' + JSON.stringify(req.headers, true, 2))
  res.end();
}

conn = function(req, res){
  console.log("New connection to port <%s>", port)

  // compose request
  opt = { hostname:'localhost', port:port2, path:req.url, method:req.method } // http://nodejs.org/api/http.html#http_http_request_options_callback
  preq = http.request(opt, function(pres){
    pres.pipe(res)
  })
  // prep error handling for request
  preq.on('error', function(e){
    console.log('proxy request error : ', e)
  })
  // pipe request from a proxy  HTTP server to an actual HTTP server
  req.pipe(preq)
}

 
s1=http.createServer(conn)
console.log("Start HTTP Proxy Server on port <%s>", port)
s1.listen(port)

s2=http.createServer(conn2)
console.log("Start HTTP Server on port <%s>", port2)
s2.listen(port2)

console.log("=====completed successfully")

// setup
// REQUEST:  client -> http:8080 (proxy) -> htto:9000 (actual)
// RESPONSE: client <- http:8080 (proxy) <- htto:9000 (actual)

/** sample runtime

// server

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejitsu/12_advanced]$./proxy.js 
=====begin
Start HTTP Proxy Server on port <8080>
Start HTTP Server on port <9000>
=====completed successfully
New connection to port <8080>
New connection to port <9000>

// client

[ubuntu@chicago::ip-10-167-6-127:~]$curl http://0.0.0.0:8080/
request successfully proxied to port 9000!
{
  "host": "localhost:9000",
  "connection": "keep-alive"
}
**/
// ref
// http://docs.nodejitsu.com/articles/advanced/streams/how-to-use-stream-pipe
