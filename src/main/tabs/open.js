import { sendRequest } from '../sendRequest';

const parseForm = () => ({
  action: 'open',
  id: Date.now() + Math.random(),
});

export const init = (worker, showError) => {
  document
    .getElementById('btn-open')
    .addEventListener('click', (event) => {
      sendRequest(
        worker,
        parseForm,
        event.target,
        showError,
      );
    });
};
