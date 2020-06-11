import { OBJECT_STORE, openIndexedDB } from './openIndexedDB';

export const loadFromIndexedDB = (
  dbName,
  key,
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
    if (timeoutId) clearTimeout(timeoutId);
    if (db) db.close();
    resolve(result);
  };

  timeoutId = setTimeout(() => {
    timeoutId = null;
    handleError(new Error(
      `Timed out: ${timeout} ms elapsed but no result for document with key '${key}' was received from database '${dbName}'.`,
    ));
  }, timeout);

  openIndexedDB(dbName)
    .then((result) => {
      db = result;
      const tran = db.transaction(OBJECT_STORE, 'readonly');
      const store = tran.objectStore(OBJECT_STORE);
      const getRequest = store.get(key);
      getRequest.onsuccess = (event) => handleResult(event.target.result);
      getRequest.onerror = handleError;
    })
    .catch(handleError);
});
