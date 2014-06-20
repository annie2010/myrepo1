#!/usr/bin/env python

import pika
import sys

import logging # https://github.com/pika/pika/issues/264
logging.getLogger('pika').setLevel(logging.DEBUG)

user = pika.PlainCredentials('user1', 'password')
vhost = 'eacc_loc'
ename = 'annie-topic_logs'
etype = 'topic'

connection = pika.BlockingConnection(pika.ConnectionParameters( host='localhost', virtual_host=vhost, credentials=user)) # http://pika.readthedocs.org/en/latest/modules/parameters.html
channel = connection.channel()

channel.exchange_declare(exchange=ename, type=etype)

routing_key = sys.argv[1] if len(sys.argv) > 1 else 'anonymous.info'
message = ' '.join(sys.argv[2:]) or 'Hello World!'
channel.basic_publish(exchange=ename,
                      routing_key=routing_key,
                      body=message)

print " [x] Sent %r:%r" % (routing_key, message)

connection.close()

# https://www.rabbitmq.com/tutorials/tutorial-five-python.html
