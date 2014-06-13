var memdb = require('..')
var assert = require('assert')

describe('memdb', function(){
  // beforeEach
  beforeEach(function(){
    memdb.clear()
  }); // beforeEach

  // test save
  describe('.save(doc)', function(){  
    it('shoud save the document', function(done){
      var tobi = {name: 'Tobi'}
      memdb.save(tobi, function(){
        var ret = memdb.first({name:'Tobi'})
        assert(ret == tobi);
      })
      done()
    }) // it
  }); // describe save

  describe('.save(doc)', function(){  
    it('shoud save the document', function(){
      var tobi = {name: 'Tobi'}
      var loki = {name: 'Loki'}
      memdb.save(tobi)
      memdb.save(loki)

      var ret = memdb.first({name:'Tobi'})
      assert(ret == tobi);

      var ret = memdb.first({name:'Loki'})
      assert(ret == loki);
    })

    it('shoud return null when no doc match', function(){
      var manny = {name: 'Manny'}
      var ret = memdb.first({name:'Loki'})
      assert(ret == null);
    })

  }); // describe save

}); // describe memdb


// doc
//
//  asset - http://visionmedia.github.io/mocha/#assertions
//  bdd interface - http://visionmedia.github.io/mocha/#interfaces
//  hooks - http://visionmedia.github.io/mocha/
//    All "hooks", that is before(), after(), beforeEach(), afterEach() may be sync or async as well, 
//    behaving much like a regular test-case. For example you may wish to populate database with dummy content before each test
//
// npm
//  https://www.npmjs.org/package/mocha 
//
//
// limitation
//   Mocha tests run serially
//   making asynchronous testing simple and fun
