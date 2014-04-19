var log = document.querySelector('#log');
var todo = new zonDB('todo', 6);

function append(txt) {
  var p = document.createElement('p');
  p.appendChild(document.createTextNode(txt));
  log.appendChild(p);
}

todo.open(function(err, data) {
  if(err) {
    return append('Database connection failed: ' + err.message);
  } 

  append('Database connection success!');
});

todo.query('user', function(res) {
  res.forEach(function(row) {
    append(JSON.stringify(row));
  });
});