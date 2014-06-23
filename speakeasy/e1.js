#!/usr/bin/env node

speakeasy=require('speakeasy')
assert=require('assert')

try{
  assert.equal("something", "something")
  assert.equal(2, 2)
  assert.equal(2, 3)
  assert.notEqual(2, 3)
} catch(err){
  console.log(err)
}

// normal use.
a=speakeasy.hotp({key: 'secret', counter: 582});
console.log("token a : ",a)
assert(a, 246642)

// use a custom length.
b=speakeasy.hotp({key: 'secret', counter: 582, length: 8});
console.log("token b : ",b)
assert(b, 67246642)

// use a custom encoding.
c=speakeasy.hotp({key: 'AJFIEJGEHIFIU7148SF', counter: 147, encoding: 'base32'});
console.log("token c : ",c)
assert(c, 974955)


/* sample run time

$./e1.js
{ name: 'AssertionError',
  actual: 2,
  expected: 3,
  operator: '==',
  message: '2 == 3' }
token a :  246642
token b :  67246642
token c :  827336

*/

/** ref

speakeasy
- https://github.com/markbao/speakeasy

assert
- http://nodejs.org/api/assert.html

**/
