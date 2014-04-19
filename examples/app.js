var table = $('#log > tbody');
var todo = new zonDB('todo', 8);

todo.addTable({
  tableName: 'user',
  keyPath: 'id',
  autoIncrement: true
});

function addUser() {
  var name = $('#name').val(),
      age = $('#age').val(),
      userData = {
        name: name,
        age: age
      };

  todo.getTable('user', function(tb) {
    tb.add(userData);
  });
}

$(document).on('click', '.add-user', function() {
  addUser();
});

todo.open(function(err, data) {
  if(err) {
    return alert('Database connection failed: ' + err.message);
  } 
});

todo.query('user', function(res) {
  res.forEach(function(row) {
    table.append("<tr>");
    table.append("<td>" + row.id + "</td>");
    table.append("<td>" + row.name + "</td>");
    table.append("<td>" + row.age + "</td>");
    table.append("</tr>");
  });
});