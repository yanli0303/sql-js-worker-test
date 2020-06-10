export const OBJECT_STORE = 'sqlite';

const handleUpgradeEvent = (event) => {
  const { target } = event || {};
  const { result: db } = target || {};
  if (!db) {
    throw new Error('Unrecognized onupgradeneeded callback.');
  }

  // The database did not previously exist, so create object stores and indexes.
  db.createObjectStore(OBJECT_STORE, { autoIncrement: true });
};

export const openIndexedDB = (dbName) => new Promise((resolve, reject) => {
  const openRequest = indexedDB.open(dbName, 1);
  openRequest.onsuccess = (event) => {
    const { target } = event || {};
    const { result: db } = target || {};
    if (db) {
      console.log(`Opened IndexedDB '${dbName}', version is ${db.version}.`);
      resolve(db);
    } else {
      reject(new Error('onsuccess was called back but unable to get the database instance.'));
    }
  };

  openRequest.onerror = reject;
  openRequest.onupgradeneeded = handleUpgradeEvent;
});
