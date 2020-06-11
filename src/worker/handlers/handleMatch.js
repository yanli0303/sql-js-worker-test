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
      sqlLines.push(`('${escapedLine}'),`);
    }
  }

  const lastLine = sqlLines.pop();
  sqlLines.push(`${lastLine.substr(0, lastLine.length - 1)};`);

  return sqlLines.join('\n');
};

const matchLineByLine = async (request, globals) => {
  const { text, table, columns } = request;
  const lines = splitLongText(text);
  let sql = makeTempTableSQL(lines);

  const where = columns
    .map((col) => `instr(${TEMP_TABLE_MATCH_LINES_COL}, ${col}) > 0`)
    .join(' OR ');
  sql += `SELECT DISTINCT T.* FROM ${table} AS T CROSS JOIN ${TEMP_TABLE_MATCH_LINES} WHERE ${where} COLLATE NOCASE;`;

  return handleExecSQL({
    ...request,
    sql,
    readonly: true,
  }, globals);
};

const matchWhole = async (request, globals) => {
  const { text, table, columns } = request;
  const lines = splitLongText(text).join('\n');

  const where = columns
    .map((col) => `instr(:text, ${col}) > 0`)
    .join(' OR ');
  const sql = `SELECT * FROM ${table} WHERE ${where} COLLATE NOCASE;`;

  return handleExecSQL({
    ...request,
    sql,
    params: { ':text': lines },
    readonly: true,
  }, globals);
};

export const handleMatch = async (request, globals) => {
  if (request.matchMode === 'single-sql') {
    return matchWhole(request, globals);
  }

  return matchLineByLine(request, globals);
};
