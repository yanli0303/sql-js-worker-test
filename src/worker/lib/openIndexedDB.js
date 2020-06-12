export const OBJECT_STORE = 'sqlite';

const handleUpgradeEvent = (event) => {
  console.log('IndexedDB.onupgradeneeded is being called.');
  const { target } = event || {};
  const { result: db } = target || {};
  if (!db) {
    throw new Error('Unrecognized onupgradeneeded callback.');
  }

  // The database did not previously exist, so create object stores and indexes.
  console.log(`Initializing IndexedDB object store ${OBJECT_STORE}...`);
  db.createObjectStore(OBJECT_STORE, { autoIncrement: true });
  console.log(`Initialized IndexedDB object store ${OBJECT_STORE}`);
};

export const openIndexedDB = (dbName) => new Promise((resolve, reject) => {
  console.log(`Opening IndexedDB database ${dbName}...`);
  const openRequest = indexedDB.open(dbName, 1);
  openRequest.onsuccess = (event) => {
    const { target } = event || {};
    const { result: db } = target || {};
    if (db) {
      resolve(db);
      console.log(`Opened IndexedDB database ${dbName}.`);
    } else {
      reject(new Error('Unable to open IndexedDB database, onsuccess was called back but unable to get the database instance.'));
    }
  };

  openRequest.onerror = (event) => reject(event.target.error);
  openRequest.onupgradeneeded = handleUpgradeEvent;
});
