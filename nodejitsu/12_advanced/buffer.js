#!/usr/bin/env node
console.log("===start")

var b1 = new Buffer(8)
console.log("\nb1",b1)

var b2 = new Buffer('I am a string!','utf-8')
console.log("\nb2",b2)
console.log("b2",b2.length)
console.log("b2",b2.toString('utf-8'))

var b3 = new Buffer(16)
b3.write("Hello","utf-8")
console.log("\nb3",b3)
console.log("b3",b3.length)
console.log("b3",b3.toString('utf-8'))

var b4 = new Buffer(1)
b4.write("Hello","utf-8")
console.log("\nb4",b4)
console.log("b4",b4.length)
console.log("b4",b4.toString('utf-8'))

console.log("\n===completed successfully")

// ref
// http://docs.nodejitsu.com/articles/advanced/buffers/how-to-use-buffers
//
// Problem  : node.js servers have to also deal with TCP streams and reading and writing to the filesystem
// Solution : Don't use binary strings. Use buffers instead!

// Definition for Buffers
//
// Buffers are instances of the Buffer class in node, which is designed to handle raw binary data. 
//  Each buffer corresponds to some raw memory allocated outside V8. Buffers act somewhat like arrays of integers, but aren't resizable and have a whole bunch of methods specifically for binary data. 
//  In addition, the "integers" in a buffer each represent a byte and so are limited to values from 0 to 255 (2^8 - 1), inclusive.
