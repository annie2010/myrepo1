#!/usr/bin/env node

process.on('exit', function(code){console.log("EXIT <%s>",code)}) 
process.on('uncaughtException', function(err){console.log("EXIT <%s>",err); process.exit(1)}) 

console.log("=====start")

events = require('events')
ee= new(events.EventEmitter)

e="e"
console.log("\n\n1. event <%s> - register listener and emit event", e)
ee.on(e, function(){console.log(e)}); // emitter.on(event, listener)
ee.emit(e)

m="m2"
console.log("\n\n2. event <%s> msg <%s> - register listener and emit event", e,m)
ee.on(e, function(msg){console.log(msg)}); // emitter.on(event, listener)
ee.emit(e,m)

//throw "shanghai"
console.log("=====completed successfully")

/** sample runtime

$./04_ee.js
=====start


1. event <e> - register listener and emit event
e


2. event <e> msg <m2> - register listener and emit event
e
m2
=====completed successfully
EXIT <0>

**/

/** ref
- node api
-- events, http://nodejs.org/api/events.html

- nodejitsu
--event emitter,  http://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-event-emitters


**/
