sudo rabbitmqctl list_users
sudo rabbitmqctl list_vhosts

sudo rabbitmqctl delete_vhost eacc_loc; sudo rabbitmqctl add_vhost eacc_loc; sudo rabbitmqctl list_vhosts
sudo rabbitmqctl delete_user user1; sudo rabbitmqctl add_user user1 password; sudo rabbitmqctl list_users

sudo rabbitmqctl clear_permissions -p eacc_loc user1
sudo rabbitmqctl set_permissions -p eacc_loc user1 "^annie-.*" ".*" ".*"

# http://www.rabbitmq.com/man/rabbitmqctl.1.man.html
