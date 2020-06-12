import { OBJECT_STORE, openIndexedDB } from './openIndexedDB';

const loadOneFromIndexedDB = (
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
    if (result) console.log(`Data loaded from IndexedDB ${dbName}`, result);
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

  console.log(`Loading data from IndexedDB ${dbName}...`);
  openIndexedDB(dbName)
    .then((result) => {
      db = result;
      const tran = db.transaction(OBJECT_STORE, 'readonly');
      const store = tran.objectStore(OBJECT_STORE);
      const getRequest = store.get(key);
      getRequest.onsuccess = (event) => handleResult(event.target.result);
      getRequest.onerror = (event) => handleError(event.target.error);
    })
    .catch(handleError);
});

export const loadFromIndexedDB = async (dbName, timeout) => {
  const items = [];

  let key = 1;
  let loadMore = true;
  while (loadMore) {
    // eslint-disable-next-line no-await-in-loop
    const item = await loadOneFromIndexedDB(dbName, key, timeout);
    if (item) {
      console.log(`#${key} chunk is loaded, size = ${item.length}`);
      items.push(item);
      key += 1;
    } else {
      loadMore = false;
    }
  }

  if (items.length === 0) {
    return null;
  }

  const total = items.reduce((sum, item) => sum + item.length, 0);
  const data = new Uint8Array(total);
  let copied = 0;
  while (copied < total) {
    const item = items.shift();
    data.set(item, copied);
    copied += item.length;
  }
  return data;
};
