#!/usr/bin/env node

debug = function(){}

if (process.env.DEBUG){
  debug = function(f_data){ console.error(f_data) } 
}


debug('this is a debug call')
console.log('Hello World')
debug('this is another debug call')

/** runtime

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejs_action/c13_net]$./debug.js
Hello World

[ubuntu@chicago::ip-10-167-6-127:~/myrepo1/myrepo1/nodejs_action/c13_net]$DEBUG=1 ./debug.js
this is a degub call
Hello World
this is another degub call

**/
