#!/usr/bin/env python
import pika
import sys

user = pika.PlainCredentials('user1', 'password')
vhost = 'eacc_loc'
ename = 'annie-topic_logs'
qname = 'annie-logs'
etype = 'topic'

connection = pika.BlockingConnection(pika.ConnectionParameters( host='localhost', virtual_host=vhost, credentials=user)) # http://pika.readthedocs.org/en/latest/modules/parameters.html
channel = connection.channel()

channel.exchange_declare(exchange=ename, type=etype)

result = channel.queue_declare(queue=qname,exclusive=True)
queue_name = qname
# http://pika.readthedocs.org/en/latest/modules/adapters/blocking.html
# http://pika.readthedocs.org/en/latest/_modules/pika/adapters/blocking_connection.html#BlockingChannel.queue_declare
# def queue_declare(self, queue='', passive=False, durable=False,
# :param queue: The queue name

binding_keys = sys.argv[1:]
if not binding_keys:
    print >> sys.stderr, "Usage: %s [binding_key]..." % (sys.argv[0],)
    sys.exit(1)

for binding_key in binding_keys:
    channel.queue_bind(exchange=ename,
                       queue=queue_name,
                       routing_key=binding_key)

print ' [*] Waiting for logs. To exit press CTRL+C'

def callback(ch, method, properties, body):
    print " [x] %r:%r" % (method.routing_key, body,)

channel.basic_consume(callback,
                      queue=queue_name,
                      no_ack=True)

channel.start_consuming()


# https://www.rabbitmq.com/tutorials/tutorial-five-python.html

'''

sample runtime

$./c2.py annie-01
 [*] Waiting for logs. To exit press CTRL+C
 [x] 'annie-01':'Summer'
 [x] 'annie-01':'Autumn'
 [x] 'annie-01':'Spring'


$./p2.py 'annie-01' "Summer"
 [x] Sent 'annie-01':'Summer'

$./p2.py 'annie-01' "Autumn"
 [x] Sent 'annie-01':'Autumn'

$./p2.py 'annie-01' "Spring"
 [x] Sent 'annie-01':'Spring'
'''
