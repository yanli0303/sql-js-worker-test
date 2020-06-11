import { sendRequest } from './sendRequest';

const openButton = () => document.getElementById('btn-open');

const parseForm = () => ({
  action: 'open',
  id: Date.now() + Math.random(),
});

const handleOpen = (worker) => {
  const request = parseForm();
  sendRequest(worker, request, openButton());
};

export const init = (worker, showError) => {
  openButton().addEventListener('click', () => {
    try {
      handleOpen(worker);
    } catch (e) {
      showError(e);
    }
  });
};
