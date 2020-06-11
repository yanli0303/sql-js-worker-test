import { OBJECT_STORE, openIndexedDB } from './openIndexedDB';

export const saveToIndexedDB = (
  dbName,
  key,
  value,
  timeout,
) => new Promise((resolve, reject) => {
  let timeoutId;
  let db;

  const handleError = (error) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (db) db.close();
    reject(error);
  };

  const handleResult = (result) => {
    console.log(`Data saved to IndexedDB ${dbName}.`);
    if (timeoutId) clearTimeout(timeoutId);
    if (db) db.close();
    resolve(result);
  };

  timeoutId = setTimeout(() => {
    timeoutId = null;
    handleError(new Error(
      `Timed out: ${timeout} ms elapsed but no callback for saving document with key '${key}' was received from database '${dbName}'.`,
    ));
  }, timeout);

  console.log(`Saving data to IndexedDB ${dbName}.`);
  openIndexedDB(dbName)
    .then((result) => {
      db = result;
      const tran = db.transaction(OBJECT_STORE, 'readwrite');
      const store = tran.objectStore(OBJECT_STORE);
      const putRequest = store.put(value, key);
      putRequest.onsuccess = handleResult;
      putRequest.onerror = handleError;
    })
    .catch(handleError);
});
