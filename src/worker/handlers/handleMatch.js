import { handleExecSQL } from './handleExecSQL';
import { normalizeString } from '../lib/normalizeString';

const TEMP_TABLE_MATCH_LINES = 'match_lines';
const TEMP_TABLE_MATCH_LINES_COL = 'line';

const splitLongText = (text) => text
  .split('\n')
  .map(normalizeString);

const makeTempTableSQL = (matchTextLines) => {
  const sqlLines = [
    `CREATE TEMPORARY TABLE ${TEMP_TABLE_MATCH_LINES} (${TEMP_TABLE_MATCH_LINES_COL} TEXT);`,
    `INSERT INTO ${TEMP_TABLE_MATCH_LINES} (${TEMP_TABLE_MATCH_LINES_COL}) VALUES `,
  ];

  const l = matchTextLines.length;
  for (let i = 0; i < l; i += 1) {
    const line = matchTextLines[i];
    if (line.length > 0) {
      const escapedLine = line.replace("'", "''");
      const lastChar = i < l - 1 ? ',' : ';';
      sqlLines.push(`('${escapedLine}')${lastChar}`);
    }
  }

  return sqlLines.join('\n');
};

export const handleMatch = async (request, globals) => {
  const { text, table, columns } = request;
  const lines = splitLongText(text);
  let sql = makeTempTableSQL(lines);

  const where = columns
    .map((col) => `instr(${TEMP_TABLE_MATCH_LINES_COL}, ${col}) > 0`)
    .join(' OR ');
  sql += `SELECT T.* FROM ${table} AS T CROSS JOIN ${TEMP_TABLE_MATCH_LINES} WHERE ${where} COLLATE NOCASE;`;

  return handleExecSQL({
    ...request,
    sql,
    readonly: true,
  }, globals);
};
