var db = []

exports.save = function(f_entry){
  db.push(f_entry)
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
