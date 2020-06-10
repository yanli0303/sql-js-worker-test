export const clearIndexedDB = (dbName) => new Promise((resolve, reject) => {
  const deleteDatabaseRequest = indexedDB.deleteDatabase(dbName);
  deleteDatabaseRequest.onerror = reject;
  deleteDatabaseRequest.onsuccess = () => {
    console.log(`IndexedDB database ${dbName} is deleted.`);
    resolve();
  };
});
