import { saveToIndexedDB } from '../lib/saveToIndexedDB';
import {
  INDEXED_DB_NAME,
  DOCUMENT_KEY,
  INDEXED_DB_TIMEOUT,
} from './handleOpen';

export const handleExecSQL = async (request, globals) => {
  const { sqlite } = globals;
  const { sql, params, readonly } = request;
  const result = sqlite.exec(sql, params);

  if (!readonly) {
    const buffer = sqlite.export();
    await saveToIndexedDB(
      INDEXED_DB_NAME,
      DOCUMENT_KEY,
      buffer,
      INDEXED_DB_TIMEOUT,
    );
  }

  return result;
};
