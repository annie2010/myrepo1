#!/usr/bin/env node

console.log("=====begin")

var amqp = require('amqp');

// Open a connection
var vname    = 'eacc_loc'
var user     = 'user1'
var password = 'password'
var ename    = ''
var qname    = 'annie-queue1'
var url = process.env.CLOUDAMQP_URL || "amqp://" + user + ":" + password + "@localhost/" +vname;
//var url = process.env.CLOUDAMQP_URL || "amqp://localhost";

var c = amqp.createConnection({ url: url }, {
  reconnect: true, // Enable reconnection
  reconnectBackoffStrategy: 'linear',
  reconnectBackoffTime: 1000, // Try reconnect once a second
});

// When connected..
c.on('error', function (err) { console.log('conn err',err);})

c.on('ready', function () {
  console.log('Connection is opened')

  // declare the DEFAULT exchange
  var e = c.exchange(ename);

  // create a queue
  c.queue(qname, { durable: true }, function(q) {
    // subscribe to that queue
    q.subscribe(function(msg) {
      console.log(msg.body);
    });

    // publish a message
    e.publish(q.name, { body: 'Hello CloudAMQP!' });
  });
});

console.log("=====completed successfully")

/** runtime
$./p1.js
=====begin
=====completed successfully
Connection is opened
Hello CloudAMQP!
**/

/** rabbitmq diagnosis
// user permission
// http://pubs.vmware.com/vfabric5/index.jsp?topic=/com.vmware.vfabric.rabbitmq.2.4/admin-guide.html

// debug RabbitMQ
[ubuntu@shc-app1-mq::ip-172-31-10-226:~]$sudo rabbitmqctl list_vhosts
[ubuntu@shc-app1-mq::ip-172-31-10-226:~]$sudo rabbitmqctl list_connections -p eacc_loc
[ubuntu@shc-app1-mq::ip-172-31-10-226:~]$sudo rabbitmqctl list_exchanges -p eacc_loc
[ubuntu@shc-app1-mq::ip-172-31-10-226:~]$sudo rabbitmqctl list_queues -p eacc_loc
[ubuntu@shc-app1-mq::ip-172-31-10-226:~]$sudo rabbitmqctl list_bindings -p eacc_loc

// list vhosts and users
1) add user
$ sudo rabbitmqctl list_users
$ sudo rabbitmqctl add_user user1 password

2) add vhostpath
$ sudo rabbitmqctl list_vhosts
$ sudo rabbitmqctl add_vhost eacc_loc

3) set permission
$ sudo rabbitmqctl list_permissions -p eacc_loc
 $sudo rabbitmqctl set_permissions -p eacc_loc user1 "^annie-.*" ".*" ".*"
Setting permissions for user "user1" in vhost "eacc_loc" ...
...done.
**/

/** ref
// 2.a rabitmq management 
// http://www.rabbitmq.com/man/rabbitmqctl.1.man.html
//
// 2.buser permission
// http://pubs.vmware.com/vfabric5/index.jsp?topic=/com.vmware.vfabric.rabbitmq.2.4/admin-guide.html
//
// 0. concepts
// http://www.rabbitmq.com/tutorials/amqp-concepts.html
//
// 1.a default exchange
// http://www.cloudamqp.com/docs/nodejs.html
//
// 1.b named exchange as topic
// https://github.com/postwait/node-amqp
**/
