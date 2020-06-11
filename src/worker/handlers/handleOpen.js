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
  );

  globals.sqlite = new globals.SQLiteDBClass(
    data ? new Uint8Array(data) : undefined,
  );
};
