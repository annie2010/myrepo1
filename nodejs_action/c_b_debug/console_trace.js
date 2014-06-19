#!/usr/bin/env node

console.log("=====begin");

process.on('exit', function(f_code){ console.log('Exiting ..', f_code); });
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1); });

add = function(f_a, f_b){
  var c = f_a + f_b;
  console.trace(c);
  return c;
};

result = add(1,2);
console.trace(result);

console.log("=====completed successfully");

/** notes
/////////////////////////////
// ref: http://nodejs.org/api/debugger.html 
// B.4 debugger via WebKit browser and node-inspector 
/////////////////////////////
// prep
$ $sudo npm install -g node-inspector

/////////////////////////////
// ref: http://nodejs.org/api/debugger.html 
// B.3 node built-in debugger
/////////////////////////////

$ node debug console_trace.js 

< debugger listening on port 5858
connecting... ok

debug> watch("f_a")
debug> watch("c")
debug> sb(9)

debug> c
debug> n
< Trace: 3
<     at add (/home/ubuntu/myrepo1/myrepo1/nodejs_action/c_b_debug/console_trace.js:10:11)
<     at Object.<anonymous> (/home/ubuntu/myrepo1/myrepo1/nodejs_action/c_b_debug/console_trace.js:14:10)
<     at Module._compile (module.js:456:26)
<     at Object.Module._extensions..js (module.js:474:10)
<     at Module.load (module.js:356:32)
<     at Function.Module._load (module.js:312:12)
<     at Module.runMain [as _onTimeout] (module.js:497:10)
<     at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
break in console_trace.js:11
Watchers:
  0: f_a = 1
  1: c = 3

* 9   var c = f_a + f_b;
 10   console.trace(c);
 11   return c;
 12 };
 13 

debug> help
debug> run
debug> version
debug> watchers

////////////////////////////////
// B.2 runtime - console.trace()
/////////////////////////////

$ ./console_trace.js

=====begin
Trace: 3
    at add (/home/ubuntu/myrepo1/myrepo1/nodejs_action/c_b_debug/02_console.js:10:11)
    at Object.<anonymous> (/home/ubuntu/myrepo1/myrepo1/nodejs_action/c_b_debug/02_console.js:14:10)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:902:3
Trace: 3
    at Object.<anonymous> (/home/ubuntu/myrepo1/myrepo1/nodejs_action/c_b_debug/02_console.js:15:9)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:902:3
=====completed successfully
Exiting .. 0

////////////////////////////////
// B.1 jshint - syntax check
/////////////////////////////
// prep
$ npm install jshint

// run jshint
$ jshint console_trace.js
**/

