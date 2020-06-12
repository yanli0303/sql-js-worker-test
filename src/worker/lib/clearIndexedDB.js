export const clearIndexedDB = (dbName) => new Promise((resolve, reject) => {
  console.log(`Deleting IndexedDB database: ${dbName}`);
  const deleteDatabaseRequest = indexedDB.deleteDatabase(dbName);
  deleteDatabaseRequest.onerror = (event) => reject(event.target.error);
  deleteDatabaseRequest.onsuccess = () => {
    console.log(`IndexedDB database ${dbName} is deleted.`);
    resolve();
  };
});
