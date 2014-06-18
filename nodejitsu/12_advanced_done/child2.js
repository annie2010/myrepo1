process.on('message', function(m, socket){
 console.log("child pid <%s>", process.pid)
 if (m === 'socket'){
   console.log("child received <%s>",m)
   socket.end('You are handled by the <' + process.argv[2] + '> child process\n')
  }
});
