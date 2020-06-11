import { sendRequest } from '../sendRequest';

const columns = 'SN,NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT'
  .toLowerCase()
  .split(',')
  .map((it) => `\n  ${it} ${['sn', 'budget', 'profit'].includes(it) ? 'INTEGER' : 'TEXT'}`)
  .join(',');

const SQL_SCRIPTS = {
  'create-table': `CREATE TABLE one_million (\n  id INTEGER PRIMARY KEY,${columns}\n);`,
  'select-star': 'SELECT * FROM one_million;',
  'select-count': 'SELECT COUNT(id) FROM one_million;',
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
