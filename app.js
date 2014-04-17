var db;

function onSucess(ev) {
	console.log('success');
  db = this.result;

  db.onerror = function(ev) {
    console.log(ev);
    alert('database error: ' + ev.target.error.message);
  };

  var transaction = db.transaction('name', 'readwrite');
  var objectStore = transaction.objectStore('name');

  var req = objectStore.get('o.chambs@gmail.com');
  req.onsuccess = function(event) {
    console.log(req, event, 'SUCCESS');
  };

  //retrieve all rows
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if(cursor) {
      console.log(cursor.key, cursor.value, '<<<');
      cursor.continue();
    }
  };
}

function onError(ev) {
  console.log('error');
}

function onUpgradeNeeded(ev) {
  console.log('update fired');
  var db = ev.target.result,
      objectStore = db.createObjectStore('name', {
        keyPath: 'myKey'
      });
  ;
}

function app() {
	var request = indexedDB.open('mydb', 2);

	request.onsuccess = onSucess;
	request.onerror = onError;
  request.onupgradeneeded = onUpgradeNeeded;
}

(function(window) {
  if(!window.indexedDB) {
    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
  }

  function zonDB(dbName, dbVersion) {
    this.name = dbName;
    this.version = dbVersion;
    this.request = null;
    this.dbReady = false;
    this.tablesToBeAdded = [];
    this.tablesToBeRemoved = [];
  }

  zonDB.prototype = {
    open: function() {
      var that = this;
      this.request = indexedDB.open(this.name, this.version);

      this.request.onsuccess = function(ev) {
        that.dbReady = true;
        console.log(ev.target, 'SUCCESS');
      };

      this.request.onerror = function(ev) {
        console.log(ev.target, 'ERROR');
      };

      this.request.onupgradeneeded = function(ev) {
        var db = ev.target.result,
            tbData, tbName;
        window.foo = db;

        that.tablesToBeAdded.forEach(function(el) {
          tbName = el.tableName;
          delete el.name;
          db.createObjectStore(tbName, el);
        });

        that.tablesToBeRemoved.forEach(function(el) {
          db.deleteObjectStore(el);
        });

        that.tablesToBeAdded.length = 0;
        console.log('UPGRADE DONE');
      };
    },

    addTable: function(options) {
      this.tablesToBeAdded.push(options);
    },

    removeTable: function(tbName) {
      this.tablesToBeRemoved.push(tbName);
    }
  };

  window.zonDB = zonDB;

})(this);

var todo = new zonDB('todo', 4);

todo.removeTable('undefined');

/*
todo.addTable({
  tableName: 'user',
  keyPath: 'id'
});
*/
todo.open();