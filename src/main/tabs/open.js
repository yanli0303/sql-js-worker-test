import { sendRequest } from '../sendRequest';

const parseForm = () => ({
  action: 'open',
  id: Date.now() + Math.random(),
  isIE: !(window.CSS && window.CSS.supports),
});

export const init = (worker, showError) => {
  document
    .getElementById('btn-open')
    .addEventListener('click', (event) => {
      console.log(`Opening database, isIE = ${parseForm().isIE}`);

      sendRequest(
        worker,
        parseForm,
        event.target,
        showError,
      );
    });
};
