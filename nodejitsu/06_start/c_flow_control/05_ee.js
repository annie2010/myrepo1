#!/usr/bin/env node

process.on('exit', function(code){console.log('EXIT <%s>',code)})
process.on('uncaughtException', function(err){console.log('EXIT uncaughtException <%s>',err); process.exit(1)})

console.log("====begin")

EventEmitter = require('events').EventEmitter
ee = new EventEmitter()

callback = function(){console.log("callback has been called")}

console.log("\n\n1. ee.once('event', listerner)")
ee.once("event", callback)
ee.emit("event")
ee.emit("event")

console.log("\n\n2.a ee.on('event', listerner)")
ee.on("event", callback)
ee.emit("event")
ee.emit("event")
console.log("\n\n2.b ee.removeListener('event', listerner)")
ee.removeListener("event", callback)
ee.emit("event")

console.log("\n\n3.a ee.removeAllListeners('event')")
ee.on("event", callback)
ee.emit("event")
console.log("\n\n3.b ee.removeAllListeners('event')")
ee.removeAllListeners("event")
ee.emit("event")

//throw "sanjose"
console.log("====completed successfully")

/**
$./05_ee.js 
====begin


1. ee.once('event', listerner)
callback has been called


2.a ee.on('event', listerner)
callback has been called
callback has been called


2.b ee.removeListener('event', listerner)


3.a ee.removeAllListeners('event')
callback has been called


3.b ee.removeAllListeners('event')
====completed successfully
EXIT <0>

**/

/** ref

- nodejitsu
-- event emitter, http://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-event-emitters

- node api
-- events, event emitters and listeners, http://nodejs.org/api/events.html#events_events 
**/
