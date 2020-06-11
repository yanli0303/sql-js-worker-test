import { sendRequest } from '../sendRequest';

const TABLE_NAME = 'one_million';
const columns = 'SN,NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT'
  .toLowerCase()
  .split(',');

const textBox = () => document.getElementById('ta-match-text');
const parseForm = (matchMode) => () => ({
  action: 'match',
  id: Date.now() + Math.random(),
  text: textBox().value,
  table: TABLE_NAME,
  matchMode,
  columns,
});

export const init = (worker, showError) => {
  const makeHandler = (matchMode) => (event) => {
    if (!textBox().value.trim()) {
      showError('Please enter any text to match.');
      return;
    }
    sendRequest(
      worker,
      parseForm(matchMode),
      event.target,
      showError,
    );
  };

  document
    .getElementById('btn-match-whole')
    .addEventListener('click', makeHandler('single-sql'));

  document
    .getElementById('btn-match-cross-join')
    .addEventListener('click', makeHandler('cross-join'));
};
