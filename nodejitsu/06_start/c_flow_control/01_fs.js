#!/usr/bin/env node

process.on('exit', function(code){console.log('EXIT <%s>',code)})
process.on('uncaughtException', function(err){console.log('EXIT uncaughtEception <%s>',err); process.exit(1)})

console.log("=====start")
//throw(1)


fs = require('fs')
fs.readFile('annie.txt', 'utf8', function (err, data){
  if (err) {
    console.trace(err)
    throw(err)
    //return console.log(err)
  }
  console.log("Result from fs.readFile : <%s>",data)
});

d2 = fs.readFileSync('annie.txt', 'utf8')
console.log("Result from fs.readFileSync : <%s>",d2)

console.log("=====completed successfully")

/**

$./01_fs.js

=====start
Result from fs.readFileSync : <hello from annie
>
=====completed successfully
Result from fs.readFile : <hello from annie
>
EXIT <0>


$ ./01_fs.js // file annie.txt exits

=====start
=====completed successfully
hello from annie

EXIT <0>

$ ./01_fs.js // file "annie.txt" does not exist, return err

=====start
=====completed successfully
{ [Error: ENOENT, open 'annie.txt'] errno: 34, code: 'ENOENT', path: 'annie.txt' }
EXIT <0>

$ ./01_fs.js // file "annie.txt" does not exist, perform console.trace(err) and throw(err)

=====start
=====completed successfully
Trace: { [Error: ENOENT, open 'annie.txt'] errno: 34, code: 'ENOENT', path: 'annie.txt' }
    at /home/ubuntu/myrepo1/myrepo1/nodejitsu/06_start/c_flow_control/01_fs.js:13:13
    at fs.js:207:20
    at Object.oncomplete (fs.js:107:15)
EXIT uncaughtEception <Error: ENOENT, open 'annie.txt'>
EXIT <1>


**/
// ref
//
// nodejitsu
// http://docs.nodejitsu.com/articles/getting-started/control-flow/how-to-write-asynchronous-code
//
// node api
// http://nodejs.org/api/process.html#process_event_exit
