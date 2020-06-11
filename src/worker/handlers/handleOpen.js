import { loadSQLite } from '../lib/loadSQLite';
import { loadFromIndexedDB } from '../lib/loadFromIndexedDB';

export const INDEXED_DB_NAME = 'sqlite_powered_by_indexed_db';
export const DOCUMENT_KEY = 1;
export const INDEXED_DB_TIMEOUT = 5000;

export const handleOpen = async (request, globals) => {
  if (globals.sqlite) {
    throw new Error('Database already open.');
  }

  if (!globals.SQLiteDBClass) {
    globals.SQLiteDBClass = await loadSQLite(request);
  }

  const data = await loadFromIndexedDB(
    INDEXED_DB_NAME,
    DOCUMENT_KEY,
    INDEXED_DB_TIMEOUT,
  ).catch((error) => {
    console.error('Failed to load data from IndexedDB, ignored and opening SQLite database:', error);
  });

  let sql = null;
  if (data) {
    sql = data instanceof Uint8Array ? data : new Uint8Array(data);
  }

  globals.sqlite = new globals.SQLiteDBClass(sql);
};
