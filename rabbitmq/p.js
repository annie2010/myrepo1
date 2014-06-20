#!/usr/bin/env node

console.log("=====begin")

var amqp = require('amqp'); 

// Open a connection
var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
var conn = amqp.createConnection({ url: url }, {
  reconnect: true, // Enable reconnection
  reconnectBackoffStrategy: 'linear',
  reconnectBackoffTime: 1000, // Try reconnect once a second
}); 

// When connected..
conn.on('ready', function () {
  console.log('Connection is opened')
  var ename = ''
  var qname = 'queue1'

  // declare the DEFAULT exchange
  var exchange = conn.exchange(ename);

  // create a queue
  conn.queue(qname, { durable: true }, function(queue) { 
    // subscribe to that queue
    queue.subscribe(function(msg) {
      console.log(msg.body);
    });

    // publish a message
    exchange.publish(queue.name, { body: 'Hello CloudAMQP!' }); 
  });
});

console.log("=====completed successfully")

/** runtime

$./p.js
=====begin
=====completed successfully
Connection is opened
Hello CloudAMQP!

**/

/** ref
// 1. default exchange
// http://www.cloudamqp.com/docs/nodejs.html
**/
