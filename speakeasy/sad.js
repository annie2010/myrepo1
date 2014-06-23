#!/usr/bin/env node

var Assert = require('assert');
var Asserts = require('asserts');

Asserts({
  "foo": function() {
    Assert.equal("something", "something", "optional message");
    Assert.equal(2, 2);
  },
  "barf" : {
    "ing": function () {
      Assert.equal(1, 1, "okay");
    },
    "ed": function() {
      Assert.equal(2, 3, "yep");
    },
    "o": {
      "rama": function() {
        Assert.equal(2, 10, "MATH");
      },
      "hnooooo": function() {
        Assert.equal(1, 1);
      }
    }
  },
  "meh": function() {
    Assert.equal(1, 2, "oh nooooo");
  }
});

/** sample runtime

:) foo
:( barf
    ing
    ed
      yep: Expected 3 but got 2
    o
     rama
       MATH: Expected 10 but got 2
     hnooooo


:( meh
     oh nooooo: Expected 2 but got 1

**/
