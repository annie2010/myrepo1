var db = []


exports.save = function(f_entry, f_cb){
  db.push(f_entry)
  if (f_cb) {
    setTimeout(function(){
      f_cb()
    },1000)
  }
}

exports.clear = function(){
  db = []
}

exports.first=function(f_obj){
  return db.filter(function(entry){ // return a entry with all fields match the request obj
    for(var key in f_obj){
      if (entry[key] != f_obj[key]){
        return false;
      }
    } // for
    return true;
  }).shift()
}
