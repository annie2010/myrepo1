var memdb = require('..')
var assert = require('assert')

describe('memdb', function(){
  // beforeEach
  beforeEach(function(){
    memdb.clear()
  });

  // test save
  describe('.save(doc)', function(){  
    it('shoud save the document', function(){
      var pet = {name: 'Tobi'}
      memdb.save(pet)
      var ret = memdb.first({name:'Tobi'})
      assert(ret == pet);
    })
  });

});


// doc
//
//  asset - http://visionmedia.github.io/mocha/#assertions
//  bdd interface - http://visionmedia.github.io/mocha/#interfaces
//
//
// npm
//  https://www.npmjs.org/package/mocha 
//
//
// limitation
//   Mocha tests run serially
//   making asynchronous testing simple and fun
