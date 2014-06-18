process.on('message', function(m, server){
 console.log("child pid <%s>", process.pid)
  if (m === 'server'){
    console.log("child received <%s>",m)

    server.on('connection', function(socket){
      console.log("child handled the connection")
      socket.end('handled by child\n')
    })
  }
});
