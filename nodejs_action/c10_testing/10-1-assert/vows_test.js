#!/usr/bin/env node

console.log("===begin vows")

var vows = require('vows')
var assert = require('assert')
var Todo = require('./todo')
var util = require('util');

//console.log(util.inspect(Todo, { showHidden: true, depth: null }));
//console.log(util.inspect(util, { showHidden: true, depth: null }));
//console.log(Todo)

console.log("===begin vows, the first batch")

vows.describe('Todo').addBatch({ // a batch

  'when adding an item':{ // a context
     topic: function(){   // a topic
       var todo = new Todo()
       todo.add('Feed my cat')
       assert.equal(todo.getCount(), 1)
       return todo
     },
     'it should exist in my todos': function(er, todo){ // a vow
       assert.equal(todo.getCount(), 1)
     }

  } // context
 
}).run()

console.log("===completed vows successfully")


// doc
//  http://vowsjs.org

// npm
//  https://www.npmjs.org/package/vows

// node util inspect
// http://nodejs.org/api/util.html#util_util_inspect_object_options

// node cli
//  http://shapeshed.com/command-line-utilities-with-nodejs/
