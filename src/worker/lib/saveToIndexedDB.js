import { OBJECT_STORE, openIndexedDB } from './openIndexedDB';

// The Chrome IndexedDB is based on LevelDB, which
// has a max size of 133,169,152:
// The serialized keys and/or value are too large (size=133341224 bytes, max=133169152 bytes).
const MAX_OBJECT_LENGTH = Math.floor(133169152 * 0.95);

const saveObjectToIndexedDB = (
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

  const handleResult = () => {
    console.log(`Data saved to IndexedDB ${dbName}.`);
    if (timeoutId) clearTimeout(timeoutId);
    if (db) db.close();
    resolve();
  };

  timeoutId = setTimeout(() => {
    timeoutId = null;
    handleError(new Error(
      `Timed out: ${timeout} ms elapsed but no callback for saving document with key '${key}' was received from database '${dbName}'.`,
    ));
  }, timeout);

  console.log(`Saving ${value.length} bytes as #${key} to IndexedDB ${dbName}.`);
  openIndexedDB(dbName)
    .then((result) => {
      db = result;
      const tran = db.transaction(OBJECT_STORE, 'readwrite');
      const store = tran.objectStore(OBJECT_STORE);
      const putRequest = store.put(value, key);
      putRequest.onsuccess = handleResult;
      putRequest.onerror = (event) => handleError(event.target.error);
    })
    .catch(handleError);
});

export const saveToIndexedDB = async (
  dbName,
  value, // must be Uint8Array
  timeout,
) => {
  const size = value.length;
  console.log(`Saving ${size} bytes into IndexedDB...`);

  if (size < MAX_OBJECT_LENGTH) {
    await saveObjectToIndexedDB(dbName, 1, value, timeout);
    return;
  }

  let offset = 0;
  for (let pageNumber = 1; offset < size; pageNumber += 1) {
    const end = Math.min(offset + MAX_OBJECT_LENGTH, size);
    const object = value.subarray(offset, end);

    // eslint-disable-next-line no-await-in-loop
    await saveObjectToIndexedDB(dbName, pageNumber, object, timeout);
    console.log(`Saved ${end - offset} bytes as #${pageNumber} to IndexedDB.`);
    offset += MAX_OBJECT_LENGTH;
  }
};
