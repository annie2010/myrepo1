#!/usr/bin/env node

console.log("====begin")

process.on('exit', function(f_code){  console.log('\n\nExiting ..', f_code) })
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1) })

console.log("Parent process pid <%d>", process.pid)

/////////////////////////////////////////////

// create a child process
myREPL = require('child_process').spawn('node'),
console.log("Child process pid <%d>", myREPL.pid)

// create an output file as a writable stream
fname = 'myOutput.txt'
myFile = require('fs').createWriteStream(fname);
console.log("Output file name <%s>", fname)

/** This part does not seem to work
myREPL.stdout.write('annie')
myREPL.stdout.pipe(process.stdout, { end: false });
myREPL.stdout.pipe(myFile);
**/

// Start reading from stdin so we don't exit.
// http://nodejs.org/api/process.html#process_signal_events
process.stdin.resume();

// pipe stdin to child stdin, and output file
process.stdin.pipe(myREPL.stdin, { end: false });
process.stdin.pipe(myFile);


// handle events in child process
myREPL.stdin.on("end", function() { process.stdout.write("REPL stream ended."); });
myREPL.on('exit', function (code) { process.exit(code); });

// create an http server to pump data to myREPL.stdout
conn = function(req, res){
  res.writeHead(200) 
  res.end('Hello, World!\n') 
  process.stdout.write('hello world') // console.log('hello world')
}
port = 8080
require('http').createServer(conn).listen(port)

/////////////////////////////////////////////

console.log("====completed successfully")

/**  sample runtime

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejitsu/12_advanced]$./p2.js 
====begin
Parent process pid <8061>
Child process pid <8063>
Output file name <myOutput.txt>
====completed successfully
123
hello
^C[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejitsu/12_advanced]$cat myOutput.txt 
123
hello

**/

// description
// stream.pipe
//  In node.js, fs.createReadStream and fs.createWriteStream are used to create a stream to an open file descriptor.
//  Another use for stream.pipe is file streams.
//  use stream.pipe to write to a file

// ref
// http://docs.nodejitsu.com/articles/advanced/streams/how-to-use-stream-pipe

// spawn vs exec in nodejs child_process
// - http://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html
// --child_process.spawn returns an object with stdout and stderr streams.
// --child_process.exec returns the whole buffer output from the child process.
//
// - curl and wget
// -- http://www.hacksparrow.com/using-node-js-to-download-files.html#nodejs-curl
