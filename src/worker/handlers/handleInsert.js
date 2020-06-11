import { normalizeString } from '../lib/normalizeString';
import { saveToIndexedDB } from '../lib/saveToIndexedDB';
import {
  INDEXED_DB_NAME,
  DOCUMENT_KEY,
  INDEXED_DB_TIMEOUT,
} from './handleOpen';

const eliminateInvisibleChars = (objects, keys) => {
  objects.forEach((obj) => {
    keys.forEach((key) => {
      const value = obj[key];
      if (typeof value === 'string') {
        obj[key] = normalizeString(value);
      }
    });
  });
};

export const handleInsert = async (request, globals) => {
  // The objects in rows must share same fields
  const { table, rows } = request;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('"rows" must be non-empty array.');
  }

  const keys = Object.keys(rows[0]);
  eliminateInvisibleChars(rows, keys);

  // Not all field names are valid column names
  // const columns = fields.map(it => it.replace(/\W/g, '_'));

  const columns = keys.map((it) => `"${it}"`).join(',');
  const values = keys.map((it) => `:${it}`).join(',');
  const sql = `INSERT INTO ${table} (${columns}) VALUES (${values});`;
  const { sqlite } = globals;

  rows.forEach((row, index) => {
    sqlite.run(sql, row);
    if (index > 0 && index % 1000 === 0) {
      console.log('Inserted 1000 rows.');
    }
  });

  const buffer = sqlite.export();
  await saveToIndexedDB(
    INDEXED_DB_NAME,
    DOCUMENT_KEY,
    buffer,
    INDEXED_DB_TIMEOUT,
  );

  return `Inserted ${rows.length} rows.`;
};
