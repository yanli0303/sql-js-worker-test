import { saveToIndexedDB } from '../lib/saveToIndexedDB';
import {
  INDEXED_DB_NAME,
  INDEXED_DB_TIMEOUT,
} from './handleOpen';

export const handleExecSQL = async (request, globals) => {
  const { sqlite } = globals;
  if (!sqlite) {
    throw new Error('Database is not open.');
  }

  const { sql, params, readonly } = request;

  console.log('Executing SQL:', sql);
  const result = sqlite.exec(sql, params);

  if (!readonly) {
    console.log('Not readonly, saving changes to IndexedDB.');
    const buffer = sqlite.export();
    await saveToIndexedDB(
      INDEXED_DB_NAME,
      buffer,
      INDEXED_DB_TIMEOUT,
    );
  }

  return result;
};
