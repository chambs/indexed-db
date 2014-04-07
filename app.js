if(!window.indexedDB) {
	window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
}

function onSucess(ev) {
	console.log('success');
}

function onError(ev) {
	console.log('error');
}


function app() {
	var request = indexedDB.open('mydb');

	request.onsuccess = onSucess;
	request.onerror = onError;
}