/////////////////////////////////
// first
/////////////////////////////////
console.log("===Tests begin")

var assert = require('assert')
var Todo = require('./todo')
var todo = new Todo()
var testsCompleted = 0

/////////////////////////////////
// prep tests
/////////////////////////////////
function setup(){
  todo.deleteAll()
  assert.equal(todo.getCount(), 0, '0 item should exist');  
}

function teardown(){
  testsCompleted++
}

/////////////////////////////////
// define tests
/////////////////////////////////
// Tests if value is truthy
//
// assert.ok
// http://nodejs.org/api/assert.html#assert_assert_value_message_assert_ok_value_message
function testDoAsync(f_cb){
  setup()
  todo.doAsync(function(f_val){
    assert.ok(f_val, 'Callback should be passed true')
    teardown()
    f_cb()
  })
}

// Tests shallow, coercive equality with the equal comparison operator ( == )
//
// assert.Equal
// http://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message
function testDeleteAll(){
  setup()

  todo.add('Delete Me')
  assert.equal(todo.getCount(), 1, '1 item should exist');  

  todo.add('Delete Me')
  assert.equal(todo.getCount(), 2, '2 item should exist');  

  todo.deleteAll()
  assert.equal(todo.getCount(), 0, '0 item should exist');  

  teardown()
}

// Tests shallow, coercive non-equality with the not equal comparison operator ( != )
//
// assert.notEqual
// http://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message
function testAdd(){
  setup()

  todo.add('Add Me')
  assert.notEqual(todo.getCount(), 0, '1 item should exist');  

  teardown()
}

// Expects block to throw an error. error can be constructor, RegExp or validation function.
//
// assert.throws
// http://nodejs.org/api/assert.html#assert_assert_throws_block_error_message
//  Validate error message using RegExp:
function testThrows(){
  setup()
  assert.throws(todo.add, /requires/)
  
  teardown()
}


/////////////////////////////////
// run tests
/////////////////////////////////
//testDeleteAll()
//testAdd()
testDoAsync(function(){
  console.log('Completed ' + testsCompleted + ' tests') 
})
testDeleteAll()
testAdd()
testThrows()

/////////////////////////////////
// finally
/////////////////////////////////
console.log("===[ %d ] Tests completed successfully", testsCompleted)


// ref
// http://nodejs.org/api/assert.html
