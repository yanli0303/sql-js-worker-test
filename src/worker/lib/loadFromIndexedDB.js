import 'indexeddb-getall-shim';
import { OBJECT_STORE, openIndexedDB } from './openIndexedDB';

const getAll = (dbName, timeout) => new Promise((resolve, reject) => {
  let timeoutId;
  let db;

  const handleError = (error) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (db) db.close();
    reject(error);
  };

  const handleResult = (result) => {
    if (result) console.log(`Data loaded from IndexedDB ${dbName}`, result);
    if (timeoutId) clearTimeout(timeoutId);
    if (db) db.close();
    resolve(result);
  };

  timeoutId = setTimeout(() => {
    timeoutId = null;
    handleError(new Error(
      `Timed out: ${timeout} ms elapsed but no result was received from IndexedDB '${dbName}'.`,
    ));
  }, timeout);

  console.log(`Loading data from IndexedDB ${dbName}...`);
  openIndexedDB(dbName)
    .then((result) => {
      db = result;
      const getAllRequest = db
        .transaction(OBJECT_STORE, 'readonly')
        .objectStore(OBJECT_STORE)
        .getAll();

      getAllRequest.onsuccess = (event) => handleResult(event.target.result);
      getAllRequest.onerror = (event) => handleError(event.target.error);
    })
    .catch(handleError);
});

export const loadFromIndexedDB = (dbName, timeout) => getAll(dbName, timeout)
  .then((items) => {
    if (!items || items.length === 0) {
      return null;
    }

    console.log(items, items[0]);
    const total = items.reduce((sum, item) => sum + item.length, 0);
    const data = new Uint8Array(total);
    let copied = 0;
    while (copied < total) {
      const item = items.shift();
      data.set(item, copied);
      copied += item.length;
    }
    return data;
  });
