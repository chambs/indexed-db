define(['zondb'], function(zonDB) {
  var todoDB = new zonDB('todoDB', 1);

  todoDB.addTable({
    tableName: 'tasks',
    autoIncrement: true,
    keyPath: 'id'
  });

  todoDB.open();
  return todoDB;
});