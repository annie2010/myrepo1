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
// runtime

$ ./02_console.js

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

// prep
$ npm install jshint

// run jshint
$ jshint 02_console.js
**/

