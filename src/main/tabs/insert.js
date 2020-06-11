import { sendRequest } from '../sendRequest';

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

const parseForm = (count) => {
  const rows = [];
  for (let i = 0; i < count; i += 1) {
    rows.push(randomRow());
  }

  return () => ({
    action: 'insert',
    id: Date.now() + Math.random(),
    table: 'one_million',
    rows,
  });
};

const makeInsertHandler = (count, worker, showError) => (event) => {
  sendRequest(
    worker,
    parseForm(count),
    event.target,
    showError,
  );
};

export const init = (worker, showError) => {
  document.getElementById('btn-insert-10')
    .addEventListener('click', makeInsertHandler(
      10000,
      worker,
      showError,
    ));

  document.getElementById('btn-insert-100')
    .addEventListener('click', makeInsertHandler(
      100000,
      worker,
      showError,
    ));
};
