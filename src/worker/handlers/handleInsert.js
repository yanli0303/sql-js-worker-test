import { normalizeString } from '../lib/normalizeString';
import { saveToIndexedDB } from '../lib/saveToIndexedDB';
import {
  INDEXED_DB_NAME,
  DOCUMENT_KEY,
  INDEXED_DB_TIMEOUT,
} from './handleOpen';

const eliminateInvisibleChars = (objects, keys) => objects.map((obj) => {
  const newObject = {};
  keys.forEach((key) => {
    const value = obj[key];
    newObject[`:${key}`] = typeof value === 'string' ? normalizeString(value) : value;
  });
  return newObject;
});

export const handleInsert = async (request, globals) => {
  const begin = Date.now();
  // The objects in rows must share same fields
  const { table, rows } = request;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('"rows" must be non-empty array.');
  }

  const keys = Object.keys(rows[0]);
  const params = eliminateInvisibleChars(rows, keys);

  // Not all field names are valid column names
  // const columns = fields.map(it => it.replace(/\W/g, '_'));

  const columns = keys.map((it) => `"${it}"`).join(',');
  const values = keys.map((it) => `:${it}`).join(',');
  const sql = `INSERT INTO ${table} (${columns}) VALUES (${values});`;
  const { sqlite } = globals;
  console.log(`Insertion SQL: ${sql}`);

  let tenThousandBegin = Date.now();
  params.forEach((row, index) => {
    sqlite.run(sql, row);
    if (index > 0 && index % 1000 === 0) {
      console.log(`Inserted 1000 rows, took ${Date.now() - tenThousandBegin} ms, row #${index} is`, row);
      tenThousandBegin = Date.now();
    }
  });

  const buffer = sqlite.export();
  await saveToIndexedDB(
    INDEXED_DB_NAME,
    DOCUMENT_KEY,
    buffer,
    INDEXED_DB_TIMEOUT,
  );

  return `Inserted ${rows.length} rows, took ${Date.now() - begin} ms.`;
};
