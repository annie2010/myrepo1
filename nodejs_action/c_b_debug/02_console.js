#!/usr/bin/env node

console.log("=====begin")

process.on('exit', function(f_code){ console.log('Exiting ..', f_code) })
process.on('uncaughtException', function(f_err){ console.error('got uncaught exception:',f_err.message); process.exit(1) })

add = function(f_a, f_b){
  c = f_a + f_b
  console.trace(c)
  return c
}

result = add(1,2)
console.trace(result)

console.log("=====completed successfully")
