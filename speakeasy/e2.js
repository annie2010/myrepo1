#!/usr/bin/env node

speakeasy=require('speakeasy')
assert=require('assert')


// normal use.
a=speakeasy.totp({key: 'secret'});
assert(a, 539036)

// use a custom time step.
b=speakeasy.totp({key: 'secret', step: 60});
assert(b, 618463)

// use a custom time.
c=speakeasy.totp({key: 'secret', time: 159183717});
assert.equal(c, 558014)

/**
ref: 
 https://github.com/markbao/speakeasy

**/
