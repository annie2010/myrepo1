#!/usr/bin/env node

speakeasy=require('speakeasy')
assert=require('assert')


d=speakeasy.totp({key: 'secret', initial_time: 4182881485});
console.log(d)

/**
ref: 
 https://github.com/markbao/speakeasy

**/
