import { loadSQLite } from '../lib/loadSQLite';
import { loadFromIndexedDB } from '../lib/loadFromIndexedDB';

export const INDEXED_DB_NAME = 'sqlite_powered_by_indexed_db';
export const INDEXED_DB_TIMEOUT = 15000;

export const handleOpen = async (request, globals) => {
  if (globals.sqlite) {
    throw new Error('Database already open.');
  }

  if (!globals.SQLiteDBClass) {
    globals.SQLiteDBClass = await loadSQLite(request);
  }

  const data = await loadFromIndexedDB(
    INDEXED_DB_NAME,
    INDEXED_DB_TIMEOUT,
  ).catch((error) => {
    console.error('Failed to load data from IndexedDB, ignored and opening SQLite database:', error);
  });

  let backup = null;
  if (data) {
    backup = data instanceof Uint8Array ? data : new Uint8Array(data);
  }

  globals.sqlite = new globals.SQLiteDBClass(backup);

  // https://www.sqlite.org/pragma.html#pragma_auto_vacuum
  console.log('Setting auto_vacuum to FULL...');
  globals.sqlite.exec('PRAGMA auto_vacuum = FULL;');
};
