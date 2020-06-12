import { sendRequest } from '../sendRequest';
import { TABLE_NAME } from './execSQL';

const SQL_INSERT_DEMO = `/* below is an example */
INSERT INTO one_million (
  'sn', 'name', 'company',
  'manger', 'owner', 'country',
  'budget', 'profit'
) VALUES (
  :sn, :name, :company,
  :manger, :owner, :country,
  :budget, :profit
);`;

let sn = -1;
const randomInteger = () => Math.floor(Math.random() * 1000000);
const randomString = () => Math.random().toString(36).substring(2, 15);
const randomRow = () => {
  const columns = 'NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT'
    .toLowerCase()
    .split(',');

  sn += 1;
  const row = { sn };

  columns.forEach((col) => {
    const isInteger = ['budget', 'profit'].includes(col);
    if (isInteger) {
      row[col] = randomInteger();
    } else {
      row[col] = randomString();
    }
  });

  return row;
};

const parseForm = () => {
  const count = +document.getElementById('select-insert-count').value;
  const bulk = +document.getElementById('select-insert-bulk').value;

  const rows = [];
  for (let i = 0; i < count; i += 1) {
    rows.push(randomRow());
  }

  return () => ({
    action: 'insert',
    id: Date.now() + Math.random(),
    table: TABLE_NAME,
    rows,
    bulk,
  });
};

export const init = (worker, showError) => {
  const editor = CodeMirror.fromTextArea(document.getElementById('ta-insert-demo'), {
    mode: 'text/x-mysql',
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    matchBrackets: true,
    readOnly: true,
  });

  editor.setValue(SQL_INSERT_DEMO);
  editor.refresh();

  document.getElementById('btn-insert')
    .addEventListener('click', (event) => {
      event.target.style.display = 'none';
      sendRequest(
        worker,
        parseForm(),
        event.target,
        showError,
      );
    });
};
