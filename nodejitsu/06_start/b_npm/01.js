#!/usr/bin/env node

process.on('exit', function(code){console.log("EXIT <%s>",code)});
process.on('uncaughtException', function(err){console.log("EXIT uncaughtException <%s>",err); process.exit(1)});

console.log("=====start")

console.log("\n\n1. pkginfo")
require('pkginfo')(module)
console.dir(module.exports)

console.log("\n\n2. pkginfo")
require('pkginfo')(module, 'author');
console.dir(module.exports)

//throw("sf")
console.log("=====completed successfully")

/** run time
1) debug npm
$ npm install -d

**/

/** ref

- nodejitsu
-- pkg info, http://docs.nodejitsu.com/articles/getting-started/npm/how-to-access-module-package-info
-- github,  http://github.com/indexzero/ .

- npm install diagnose
-- http://stackoverflow.com/questions/9484829/npm-cant-find-package-json
**/
