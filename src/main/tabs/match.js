import { sendRequest } from '../sendRequest';

const TABLE_NAME = 'one_million';
const columns = 'SN,NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT'
  .toLowerCase()
  .split(',');

const textBox = () => document.getElementById('ta-match-text');
const parseForm = () => ({
  action: 'match',
  id: Date.now() + Math.random(),
  text: textBox().value,
  table: TABLE_NAME,
  columns,
});

export const init = (worker, showError) => {
  document
    .getElementById('btn-match')
    .addEventListener('click', (event) => {
      if (!textBox().value.trim()) {
        showError('Please enter any text to match.');
        return;
      }
      sendRequest(
        worker,
        parseForm,
        event.target,
        showError,
      );
    });
};
