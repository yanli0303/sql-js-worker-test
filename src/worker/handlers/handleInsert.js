import { handleExecSQL } from './handleExecSQL';
import { normalizeString } from '../lib/normalizeString';

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
  return handleExecSQL({
    ...request,
    sql,
    params: rows,
    readonly: false,
  }, globals);
};
