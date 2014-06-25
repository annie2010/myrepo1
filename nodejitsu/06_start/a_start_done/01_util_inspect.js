#!/usr/bin/env node

console.log("====begin")

util=require('util')

console.log("\n\n1.a util.inspect")
console.log(util.inspect(console))

console.log("\n\n1.b util.inspect")
console.log(util.inspect(console, showHidden=false, depth=null)) // util.inspect(object, showHidden=false, depth=2, colorize=true);

console.log("\n\n1.c console.dir")
console.dir(console)

console.log("\n\n2.a util.inspect in color")
console.log(util.inspect({a:1, b:"b"}, false,2,true));

console.log("\n\n2.b util.inspect in color")
console.log(util.inspect({a:1, b:"b"}));

/**
http=require('http')
console.log("\n\n2.a util.inspect")
console.log(util.inspect(http))

console.log("\n\n2.b util.inspect")
console.log(util.inspect(http, showHidden=false, depth=null)) // util.inspect(object, showHidden=false, depth=2, colorize=true);

console.log("\n\n2.c console.dir")
console.dir(http)
**/

console.log("====completed successfully")

/** ref
- nodejitsu
-- util.inspect, util.inspect(object, showHidden=false, depth=2, colorize=true);

**/
