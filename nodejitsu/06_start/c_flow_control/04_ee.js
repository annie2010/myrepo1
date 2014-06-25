#!/usr/bin/env node

process.on('exit', function(code){console.log("EXIT <%s>",code)}) 
process.on('uncaughtException', function(err){console.log("EXIT <%s>",err); process.exit(1)}) 

console.log("=====start")

events = require('events')
EventEmitter= events.EventEmitter
ee= new EventEmitter()

util = require('util')

// emitter.on(event, listener)
// emitter.emit(event, arg1, ..)
// emitter.removeAllListeners(event)
// emitter.removeListener(event, listener)
// emitter.addListener(event, listener)
// Event: 'newListener'
// Event: 'removeListener' 


// Class Method: EventEmitter.listenerCount(emitter, event)
e="e"
ee.on('newListener',function(){console.log("..added a new listener, # of listeners for event <%s> is <%d>",e,EventEmitter.listenerCount(ee, e))})
ee.on('removeListener',function(){console.log("..removed a new listener, # of listeners for event <%s> is <%d>",e,EventEmitter.listenerCount(ee, e))})

console.log("\n\n1. event <%s> - register listener and emit event", e)
ee.on(e, function(){console.log("Received event <%s>",e)}); // emitter.on(event, listener)
//console.dir(ee.listeners(e))
//console.log(util.inspect(ee.listeners(e), { showHidden: true, depth: null }))
ee.emit(e)

m="m2"
console.log("\n\n2. event <%s> msg <%s> - register listener and emit event", e,m)
ee.on(e, function(msg){console.log("Received event <%s> message <%s>", e,m)}); // emitter.on(event, listener)
ee.emit(e,m)

console.log("\n\n3. remove all listeners")
ee.removeAllListeners([e])
ee.emit(e,m)

console.log("\n\n4. event <%s> - register listener and emit event", e)
l1 = function(){console.log("Received event <%s>",e)}
l2 = function(msg){console.log("Received event <%s> message <%s>", e,m)}
ll1 = function(){console.log("Received event <%s>",e1)}
ll2 = function(){console.log("Received event <%s>",e2)}
ee.on(e, l1) 
ee.on(e, l1)
ee.on(e, l1)
ee.on(e, l2)
ee.emit(e,m)

console.log("\n\n5. remove listener for event <%s>", e)
ee.removeListener(e, l1) // emitter.removeListener(event, listener)
ee.removeListener(e, l2) // emitter.removeListener(event, listener)
ee.emit(e,m)

console.log("\n\n6. add listener for event <%s>", e)
ee.addListener(e, l2) // emitter.addListener(event, listener)
ee.emit(e,m)


console.log("\n\n7. EventEmitter listener counter")
c = EventEmitter.listenerCount(ee, e)
console.dir(ee)
console.log("# of listeners for emitter <ee> with event <%s> is <%d>",e,c)

console.log("\n\n8. list listeners for a given event")
console.dir(ee.listeners('newListener'))
console.dir(ee.listeners('removeListener'))
console.dir(ee.listeners(e))

console.log("\n\n9. emitter.once('event')")
e1='e1'
e2='e2'
ll1 = function(){console.log("Received event <%s>",e1)}
ll2 = function(){console.log("Received event <%s>",e2)}
ee.once(e1, ll1) 
ee.on(e2, ll2) 

ee.emit(e1,m)
ee.emit(e1,m)
ee.emit(e2,m)
ee.emit(e2,m)
//throw "shanghai"
console.log("=====completed successfully")

/** sample runtime
$./04_ee.js
=====start
..added a new listener, # of listeners for event <e> is <0>


1. event <e> - register listener and emit event
..added a new listener, # of listeners for event <e> is <0>
Received event <e>


2. event <e> msg <m2> - register listener and emit event
..added a new listener, # of listeners for event <e> is <1>
Received event <e>
Received event <e> message <m2>


3. remove all listeners
..removed a new listener, # of listeners for event <e> is <1>
..removed a new listener, # of listeners for event <e> is <0>


4. event <e> - register listener and emit event
..added a new listener, # of listeners for event <e> is <0>
..added a new listener, # of listeners for event <e> is <1>
..added a new listener, # of listeners for event <e> is <2>
..added a new listener, # of listeners for event <e> is <3>
Received event <e>
Received event <e>
Received event <e>
Received event <e> message <m2>


5. remove listener for event <e>
..removed a new listener, # of listeners for event <e> is <3>
..removed a new listener, # of listeners for event <e> is <2>
Received event <e>
Received event <e>


6. add listener for event <e>
..added a new listener, # of listeners for event <e> is <2>
Received event <e>
Received event <e>
Received event <e> message <m2>


7. EventEmitter listener counter
{ domain: null,
  _events: 
   { newListener: [Function],
     removeListener: [Function],
     e: [ [Function], [Function], [Function] ] },
  _maxListeners: 10 }
# of listeners for emitter <ee> with event <e> is <3>


8. list listeners for a given event
[ [Function] ]
[ [Function] ]
[ [Function], [Function], [Function] ]


9. emitter.once('event')
..added a new listener, # of listeners for event <e> is <3>
..added a new listener, # of listeners for event <e> is <3>
..removed a new listener, # of listeners for event <e> is <3>
Received event <e1>
Received event <e2>
Received event <e2>
=====completed successfully
EXIT <0>


$./04_ee.js
=====start


1. event <e> - register listener and emit event
Received event <e>


2. event <e> msg <m2> - register listener and emit event
Received event <e>
Received event <e> message <m2>


3. remove all listeners


4. event <e> - register listener and emit event
Received event <e>
Received event <e>
Received event <e>
Received event <e> message <m2>


5. remove listener for event <e>
Received event <e>
Received event <e>
=====completed successfully
EXIT <0>

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

/** notes
- events
- event emitters, operations: register to listen events and emit events w/wo messages
**/

/** ref
- node api
-- events, http://nodejs.org/api/events.html

- nodejitsu
--event emitter,  http://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-event-emitters

- tutorial
-- http://www.hacksparrow.com/node-js-eventemitter-tutorial.html
**/
