#!/usr/bin/env node

console.log("===start")

process.on('exit', function(f_code){ console.log('\n\nExiting ..', f_code) })
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1) })

//
// creates readable and writeble streams, 
//
//  handles open, data, end, error events in readable stream
//  handles open, error events in writable stream
//  writes date to writable stream and ends write operation
// 
console.log("\n=1. What are streams")
var fs = require('fs')
console.log(process.argv[2],'->',process.argv[3], process.argv[4])

var r1=fs.createReadStream(process.argv[2])
var w1=fs.createWriteStream(process.argv[3])

// open reabable and writable streams
r1.on('open', function(){console.log('readable is opened')});
w1.on('open', function(){console.log('writable is opened')});

// read and write data
r1.on('data',function(f_data){ w1.write(f_data) });
r1.on('end',function(){ w1.end() });

// erro handling
r1.on('error',function(f_err){ console.log('ERROR',f_err) }); 
w1.on('error',function(f_err){ console.log('ERROR',f_err) });

//
// create readable and writeble streams, pipe data from readable to writable
//
console.log("\n=2. Pipe Readable Stream to Writable Stream")

var r2=fs.createReadStream(process.argv[2])
var w2=fs.createWriteStream(process.argv[4])

r2.pipe(w2)

console.log("\n===completed successfully")

/**`sample runtime

$ rm -rf o*.txt; ./streams.js annie.txt o1.txt o2.txt

**/

// node API - http://nodejs.org/api/stream.html
//
// Class: stream.Readable
//  Events: readable, data, end, close, error
//
// Class: stream.Writable
//  Events: drain, finish, pipe, unpipe, error
//
// Class: stream.Duplex, Examples of Duplex streams include: tcp sockets
//   http://nodejs.org/api/stream.html#stream_class_stream_duplex
//   http://nodejs.org/api/net.html#net_class_net_socket
//
// Class: stream.Transform, Examples of Transform streams include: zlib streams, crypto streams
//
// ref
// - definition: http://docs.nodejitsu.com/articles/advanced/streams/what-are-streams
// - read stream, http://docs.nodejitsu.com/articles/advanced/streams/how-to-use-fs-create-read-stream
// - write stream, http://docs.nodejitsu.com/articles/advanced/streams/how-to-use-fs-create-write-stream
// - pipe streams from readable to writable, http://docs.nodejitsu.com/articles/advanced/streams/how-to-use-stream-pipe
