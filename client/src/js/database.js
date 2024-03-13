import { openDB } from 'idb';

const initdb = async () =>
  openDB('notehaven', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('notehaven')) {
        console.log('notehaven database already exists');
        return;
      }
      db.createObjectStore('notehaven', { keyPath: 'id', autoIncrement: true });
      console.log('notehaven database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Updating from the database');
  //establishes connection to the database and version we are going to use
  const nhDB = await openDB('notehaven', 1);

  //creates a transaction (tx) and specifies data and what type of authorization we allow (readwrite)
  const tx = nhDB.transaction('notehaven', 'readwrite');

  //opens the desired object store
  const store = tx.objectStore('notehaven');

  //passes in content 
  const request = store.put({id: 1, value: content});

  //Obtain confirmation or response 
  const result = await request;
  console.log('result.value', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the databse');

  //establishes connection to the database and version we are going to use
  const nhDB = await openDB('notehaven', 1);

  //creates a transaction (tx) and specifies data and what type of authorization we allow (readonly)
  const tx = nhDB.transaction('notehaven', 'readonly');

   //opens the desired object store
  const store = tx.objectStore('notehaven');

  //passes in content
  const request = store.getAll();

  //Obtain confirmation or response
  const result = await request;
  console.log('result.value', result);

  return result?.value;
};

initdb();
