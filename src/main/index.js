import { createWorker } from './createWorker';
import { init as initExecSQL } from './tabs/execSQL';
import { init as initOpen } from './tabs/open';
import { init as initInsert } from './tabs/insert';

const errorDiv = () => document.getElementById('error');
const outputDiv = () => document.getElementById('output');

const worker = createWorker();

const showError = (message) => {
  errorDiv().innerText = message.toString();
};

const clearOutput = () => {
  outputDiv().innerHTML = '';
};

const showOutput = (output) => {
  const div = outputDiv();
  div.innerHTML = `${JSON.stringify(output, null, 2)}\n\n${div.innerHTML}`;
};

worker.addEventListener('message', (event) => {
  console.log('received', event.data);
  showOutput(event.data);
});

worker.addEventListener('error', showError);

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.tabs');
  M.Tabs.init(elements);

  const ddl = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(ddl, { constrainWidth: false, coverTrigger: false });

  initExecSQL(worker, showError);
  initOpen(worker, showError);
  initInsert(worker, showError);
});

document
  .getElementById('clear-output')
  .addEventListener('click', clearOutput);
