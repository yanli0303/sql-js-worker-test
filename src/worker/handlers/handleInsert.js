import { normalizeString } from '../lib/normalizeString';
import { saveToIndexedDB } from '../lib/saveToIndexedDB';
import {
  INDEXED_DB_NAME,
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

const insertRowByRow = (table, rows, sqlite) => {
  const keys = Object.keys(rows[0]);
  const columns = keys.map((it) => `'${it}'`).join(',');
  const params = eliminateInvisibleChars(rows, keys);

  // Not all field names are valid column names
  // const columns = fields.map(it => it.replace(/\W/g, '_'));

  const values = keys.map((it) => `:${it}`).join(',');
  const sql = `INSERT INTO ${table} (${columns}) VALUES (${values});`;
  console.log(`Insertion SQL: ${sql}`);

  let tenThousandBegin = Date.now();
  params.forEach((row, index) => {
    sqlite.run(sql, row);
    if (index > 0 && index % 1000 === 0) {
      console.log(`Inserted 1000 rows, took ${Date.now() - tenThousandBegin} ms, row #${index} is`, row);
      tenThousandBegin = Date.now();
    }
  });
};

const bulkInsert = async (table, rows, sqlite, bulk) => {
  const keys = Object.keys(rows[0]);
  const columns = keys.map((it) => `'${it}'`).join(',');
  const sqlPrefix = `INSERT INTO ${table} (${columns}) VALUES\n`;

  let batch = [];
  let bulkBegin = Date.now();
  const insertBatch = () => {
    const sql = `${sqlPrefix}\n${batch.join(',\n')};`;
    sqlite.run(sql);
  };

  rows.forEach((row) => {
    const values = keys.map((key) => {
      const value = row[key];
      return typeof value === 'string' ? `"${normalizeString(value).replace(/"/g, '""')}"` : `${value}`;
    });
    batch.push(`(${values.join(',')})`);

    if (batch.length === bulk) {
      insertBatch();
      console.log(`Bulk inserted ${bulk} rows, took ${Date.now() - bulkBegin} ms.`);
      batch = [];
      bulkBegin = Date.now();
    }
  });

  if (batch.length > 0) {
    insertBatch();
  }
};

export const handleInsert = async (request, globals) => {
  const begin = Date.now();
  const { sqlite } = globals;
  if (!sqlite) {
    throw new Error('Database is not open.');
  }

  // The objects in rows must share same fields
  const { table, rows, bulk } = request;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('"rows" must be non-empty array.');
  }

  if (!bulk || bulk <= 1) {
    insertRowByRow(table, rows, sqlite);
  } else {
    await bulkInsert(table, rows, sqlite, bulk);
  }

  // https://www.sqlite.org/pragma.html#pragma_shrink_memory
  console.log('executing "PRAGMA shrink_memory"...');
  sqlite.exec('PRAGMA shrink_memory;');

  const buffer = sqlite.export();
  await saveToIndexedDB(
    INDEXED_DB_NAME,
    buffer,
    INDEXED_DB_TIMEOUT,
  );
  return `Inserted ${request.rows.length} rows, took ${Date.now() - begin} ms.`;
};
