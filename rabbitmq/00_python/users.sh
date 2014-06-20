sudo rabbitmqctl list_users
sudo rabbitmqctl list_vhosts

sudo rabbitmqctl delete_vhost eacc_loc; sudo rabbitmqctl add_vhost eacc_loc; sudo rabbitmqctl list_vhosts
sudo rabbitmqctl delete_user user1; sudo rabbitmqctl add_user user1 password; sudo rabbitmqctl list_users

sudo rabbitmqctl clear_permissions -p eacc_loc user1
sudo rabbitmqctl set_permissions -p eacc_loc user1 "^annie-.*" ".*" ".*"

sudo rabbitmqctl list_permissions -p eacc_loc 
sudo rabbitmqctl list_user_permissions user1

# http://www.rabbitmq.com/man/rabbitmqctl.1.man.html
#
##
#
# $ set_permissions [-p vhostpath] {user} {conf} {write} {read}
#
# $ rabbitmqctl set_permissions -p /myvhost tonyg "^tonyg-.*" ".*" ".*"
#
# This command instructs the RabbitMQ broker to grant the user named tonyg access to the virtual host called /myvhost, with configure permissions on all resources whose names starts with "tonyg-", and write and read permissions on all resources.

