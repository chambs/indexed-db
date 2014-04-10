if(!window.indexedDB) {
	window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
}

var db;

function onSucess(ev) {
	console.log('success');
  db = this.result;

  db.onerror = function(ev) {
    alert('database error: ' + ev.target.errorCode);
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
      })
  ;

}


function app() {
	var request = indexedDB.open('mydb', 2);

	request.onsuccess = onSucess;
	request.onerror = onError;
  request.onupgradeneeded = onUpgradeNeeded;
}

app();