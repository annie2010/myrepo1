#!/usr/bin/env node

debug = function(){}

if (process.env.DEBUG){
  debug = function(f_data){ console.error(f_data) } 
}

process.on('exit', function(f_code){
  console.log('Exiting ..', f_code)
})

process.on('uncaughtException', function(f_err){
  console.error('got uncaught exception:',f_err.message)
  process.exit(1)
})

debug('this is a debug call')
console.log('Hello World')
debug('this is another debug call')

throw new Error('an uncaught exception')

/** node API

- process module
- http://nodejs.org/api/process.html#process_event_exit
-
-- Event: 'exit', Emitted when the process is about to exit.
-- Event: 'uncaughtException', Emitted when an exception bubbles all the way back to the event loop. 

- error object
- error handling,http://www.joyent.com/developers/node/design/errors
-- operational errors: 1) async op, callback 2) sync, json, input validation, throw
-- program errors: should never happend, throw

- domain module
-
-- Domains provide a way to handle multiple different IO operations as a single group.
-- Additions to Error objects, Any time an Error object is routed through a domain, a few extra fields are added to it.

**/
/** runtime

// process exit event, uncaughtException event

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejs_action/c13_net]$./debug.js 
Hello World
got uncaught exception: an uncaught exception
Exiting .. 1

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejs_action/c13_net]$DEBUG=1 ./debug.js
this is a debug call
Hello World
this is another debug call
got uncaught exception: an uncaught exception
Exiting .. 1

// process.env

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejs_action/c13_net]$./debug.js
Hello World

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejs_action/c13_net]$DEBUG=1 ./debug.js
this is a degub call
Hello World
this is another degub call

**/
