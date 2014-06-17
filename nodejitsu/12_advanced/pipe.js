#!/usr/bin/env node

console.log("====begin")

var fs = require('fs');
var path = require('path');

var reader = fs.createReadStream('annie.txt'); // woof woof etc.
var writer = fs.createWriteStream(path.normalize('annie_out.txt')); // meow meow etc.

// pipe to a file
reader.pipe(writer)

// pipe to stdout
reader.pipe(process.stdout)

console.log("====completed succesfully")

/**  setup

 read from a readable input file
 pipe to a writable output file
 pipe to a writable stdout stream

**/ 

/** sample runtime

$rm -rf annie_out.txt; ./pipe.js; echo "=====read annie_out.txt"; cat annie_out.txt
====begin
====completed succesfully
Hello Annie
Hello World
=====read annie_out.txt
Hello Annie
Hello World


**/
// ref
// http://stackoverflow.com/questions/17822437/pipe-to-stdout-and-writeable-stream
