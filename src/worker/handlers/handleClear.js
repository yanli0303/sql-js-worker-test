import { clearIndexedDB } from '../lib/clearIndexedDB';
import { INDEXED_DB_NAME } from './handleOpen';

export const handleClear = async (request, globals) => {
  const { sqlite } = globals;
  if (sqlite) {
    sqlite.close();
    globals.sqlite = null;
  }

  clearIndexedDB(INDEXED_DB_NAME);
};
