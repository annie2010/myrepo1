#!/usr/bin/env node

var Assert = require('assert');
var Asserts = require('asserts');

Asserts({
  foo : function() {
    Assert.equal("something", "something", "optional message");
    Assert.equal(2, 2);
  },
  barf : {
    ing : function () {
      Assert.equal(1, 1, "okay");
    },
    ed : function() {
      Assert.equal(2, 2, "yep");
    }
  }
});

/** sample runtime

$./happy.js 

:) foo
:) barf
    ing
    ed

**/

/**
prep

$ npm install assert
$ npm install asserts

**/
