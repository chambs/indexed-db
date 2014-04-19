#Indexed DB learning
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

This repo started as an IndexedDB study, and suddenly started to become a simple small and poor API.
Still, so far it seems to be better than the raw thing, so here's the API documentation so far.

Initial features include:
* Database creation and "table" declaration
* All CRUD operations implemented
* Methods that allow you to manipulate your own transactions to supress what the API is not doing (yet)

Next steps are:
* Make it possible to create smarter queries
* Improve the API in a way that it might be actually easy to use

##Documentation

###Basic usage

```javascript
//second argument must be increased every time you change your "tables"
var myDB = new zonDB('myDB', 1);

myDB.addTable({
  tableName: 'products',
  keyPath: 'productId',
  autoIncrement: true
});

myDB.open(function(err, data) {
  if(err) {
    alert('Something bad happened while trying to open the database: ' + err.message);
  }
});

//do some CRUD operations
```

###Adding a row to a table

```javascript
var soap = {
  name: 'Awesome Soap',
  price: 0.55
};

myDB.addRow('products', soap, function(productId) {
  alert('Product ID ' + productId + ' added!');
});

```

###Updating a row to a table

```javascript
var soap = {
  name: 'Cheaper Soap',
  price: 0.35,
  productId: 3
};

myDB.updateRow('products', soap, function(productId) {
  alert('Product ID ' + productId + ' updated!');
});

```

###Removing a row from a table

```javascript
var soapId = 3;

myDB.removeRow('products', soapId, function() {
  alert('Product removed!');
});

```

###Listing data from a table

```javascript


myDB.query('products', function(result) {
  result.forEach(function(row) {
    console.log(row);
  });
});

```

