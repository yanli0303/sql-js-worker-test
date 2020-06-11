import { sendRequest } from '../sendRequest';

const parseForm = () => ({
  action: 'clear',
  id: Date.now() + Math.random(),
});

export const init = (worker, showError) => {
  document
    .getElementById('btn-clear')
    .addEventListener('click', (event) => {
      sendRequest(
        worker,
        parseForm,
        event.target,
        showError,
      );
    });
};
