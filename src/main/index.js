import { createWorker } from './createWorker';

import {
  sendButton,
  messageInput,
  errorDiv,
  outputDiv,
} from './getElementsById';

const worker = createWorker();

const showError = (message) => {
  debugger; // eslint-disable-line
  errorDiv().innerText = message.toString();
};

const clearOutput = () => {
  outputDiv().innerHTML = '';
};

const showOutput = (output) => {
  outputDiv().innerHTML += `${JSON.stringify(output, null, 2)}\n\n`;
};

worker.addEventListener('message', (event) => {
  console.log('received', event.data);
  showOutput(event.data);
});

worker.addEventListener('error', showError);

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elements);
});

sendButton().addEventListener('click', () => {
  const text = messageInput().value.trim();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    showError(e);
    return;
  }

  clearOutput();
  worker.postMessage(json);
});
