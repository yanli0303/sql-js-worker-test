import { sendRequest } from '../sendRequest';

const parseForm = () => ({
  action: 'insert',
  id: Date.now() + Math.random(),
  table: 'one_million',
  rows: [],
});

export const init = (worker, showError) => {
  document.getElementById('btn-insert')
    .addEventListener('click', (event) => {
      sendRequest(
        worker,
        parseForm,
        event.target,
        showError,
      );
    });
};
