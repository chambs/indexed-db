var table = $('#log > tbody');
var todo = new zonDB('todo', 8);

todo.addTable({
  tableName: 'user',
  keyPath: 'id',
  autoIncrement: true
});

function addUser() {
  if($('#id').val()) {
    updateUser();
    return;
  }

  var name = $('#name').val(),
      age = $('#age').val(),
      userData = {
        name: name,
        age: age
      };

  todo.getTable('user', function(tb) {
    tb.add(userData);
    $('#name').val('');
    $('#age').val('');
  });
}

function removeUser(id) {
  todo.getTable('user', function(tb) {
    tb.delete(id);
    listUsers();
  });
}

function editUser(id) {
  var userData;
  todo.getTable('user', function(tb) {
    tb.get(id).onsuccess = function(ev) {
      userData = ev.target.result;
      $('#name').val(userData.name);
      $('#age').val(userData.age);
      $('#id').val(userData.id);
    };
  });
}

function updateUser() {
  var newData = {
    id: +$('#id').val(),
    name: $('#name').val(),
    age: $('#age').val()
  };

  todo.getTable('user', function(tb) {
    var req = tb.put(newData);

    $('#name').val('');
    $('#age').val('');
    $('#id').val('');
  });
}

function listUsers() {
  table.empty();
  todo.query('user', function(res) {
    res.forEach(function(row) {
      table.append("<tr>");
      table.append("<td>" + row.id + "</td>");
      table.append("<td>" + row.name + "</td>");
      table.append("<td>" + row.age + "</td>");
      table.append("<td><a href='#' class='edit-row' data-id='"+row.id+"'>Edit</a> / <a href='#' class='remove-row' data-id='"+row.id+"'>Remove</a></td>");
      table.append("</tr>");
    });
  });
}

$(document)
.on('click', '.add-user', function() {
  addUser();
  listUsers();
})
.on('click', '.remove-row', function() {
  var userId = $(this).data('id');
  removeUser(userId);
})
.on('click', '.edit-row', function() {
  var userId = $(this).data('id');
  editUser(userId);
});

todo.open(function(err, data) {
  if(err) {
    return alert('Database connection failed: ' + err.message);
  } 
});

listUsers();