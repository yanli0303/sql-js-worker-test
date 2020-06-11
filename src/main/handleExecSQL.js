import { sendRequest } from './sendRequest';

const sendButton = () => document.getElementById('btn-exec-sql');
const sqlTextBox = () => document.getElementById('txt-exec-sql');
const selectSQLDropDown = () => document.getElementById('ddl-select-sql');

const SQL_SCRIPTS = {
  'create-table': `CREATE TABLE test (
  id INTEGER PRIMARY KEY,
  col1 text,
  col2 text
);`,
  'select-star': 'SELECT * FROM test;',
  'select-count': 'SELECT COUNT(id) FROM test;',
};

const parseForm = () => ({
  action: 'exec',
  id: Date.now() + Math.random(),
  sql: sqlTextBox().value,
});

const handleExecSQL = (worker) => {
  const request = parseForm();
  sendRequest(worker, request, sendButton());
};

export const init = (worker, showError) => {
  sendButton().addEventListener('click', () => {
    if (!sqlTextBox().value.trim()) {
      return;
    }

    try {
      handleExecSQL(worker);
    } catch (e) {
      showError(e);
    }
  });

  selectSQLDropDown().addEventListener('click', (event) => {
    const { type } = event.target.dataset;
    const sql = SQL_SCRIPTS[type];
    sqlTextBox().value = sql;
  });
};
