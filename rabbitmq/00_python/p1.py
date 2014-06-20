#!/usr/bin/env python

import pika
import sys

import logging # https://github.com/pika/pika/issues/264
logging.getLogger('pika').setLevel(logging.DEBUG)

connection = pika.BlockingConnection(pika.ConnectionParameters( host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='topic_logs', type='topic')

routing_key = sys.argv[1] if len(sys.argv) > 1 else 'anonymous.info'
message = ' '.join(sys.argv[2:]) or 'Hello World!'
channel.basic_publish(exchange='topic_logs',
                      routing_key=routing_key,
                      body=message)

print " [x] Sent %r:%r" % (routing_key, message)

connection.close()

# https://www.rabbitmq.com/tutorials/tutorial-five-python.html
