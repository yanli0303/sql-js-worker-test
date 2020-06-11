import { sendRequest } from '../sendRequest';

export const TABLE_NAME = 'one_million';

const intColumns = ['sn', 'budget', 'profit'];
const columns = 'SN,NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT'
  .toLowerCase()
  .split(',');

const createTableColumns = () => columns
  .map((it) => `\n  ${it} ${intColumns.includes(it) ? 'INTEGER' : 'TEXT'}`)
  .join(',');

const createIndex = () => columns
  .filter((it) => !intColumns.includes(it))
  .map((it) => `CREATE INDEX idx_${TABLE_NAME}_${it} ON ${TABLE_NAME} (${it});\n`)
  .join('');

const SQL_SCRIPTS = {
  'create-table': `CREATE TABLE ${TABLE_NAME} (\n  id INTEGER PRIMARY KEY,${createTableColumns()}\n);`,
  'create-table-index': `CREATE TABLE ${TABLE_NAME} (\n  id INTEGER PRIMARY KEY,${createTableColumns()}\n);\n\n${createIndex()}`,
  'list-index': `PRAGMA index_list(${TABLE_NAME});`,
  'select-star': `SELECT * FROM ${TABLE_NAME} LIMIT 5;`,
  'select-count': `SELECT COUNT(id) FROM ${TABLE_NAME};`,
};

let editor;
const parseForm = () => ({
  action: 'exec',
  id: Date.now() + Math.random(),
  sql: editor ? editor.getValue() : '',
});

export const init = (worker, showError) => {
  const sqlTextBox = document.getElementById('txt-exec-sql');
  editor = CodeMirror.fromTextArea(sqlTextBox, {
    mode: 'text/x-mysql',
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    matchBrackets: true,
  });
  editor.refresh();

  document
    .getElementById('btn-exec-sql')
    .addEventListener('click', (event) => {
      if (!editor.getValue().trim()) {
        showError('Please enter the SQL script to execute.');
        return;
      }
      sendRequest(
        worker,
        parseForm,
        event.target,
        showError,
      );
    });

  document
    .getElementById('ddl-select-sql')
    .addEventListener('click', (event) => {
      const { type } = event.target.dataset;
      const sql = SQL_SCRIPTS[type];
      editor.setValue(sql);
    });
};
