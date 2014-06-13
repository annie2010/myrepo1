function Todo(){
  this.todos = []
}

Todo.prototype.add = function (f_item){
  if (!f_item) throw new Error('Todo#add requires an item')
  this.todos.push(f_item)
}

Todo.prototype.deleteAll = function (){
  this.todos = []
}

Todo.prototype.getCount = function (){
  return this.todos.length
}

Todo.prototype.doAsync = function (f_cb){
  setTimeout(f_cb, 2000, true)
}

module.exports = Todo
