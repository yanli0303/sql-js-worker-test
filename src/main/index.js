import 'core-js';
import { createWorker } from './createWorker';
import { init as initExecSQL } from './tabs/execSQL';
import { init as initOpen } from './tabs/open';
import { init as initInsert } from './tabs/insert';
import { init as initMatch } from './tabs/match';
import { init as initClear } from './tabs/clear';

const errorDiv = () => document.getElementById('error');
const outputDiv = () => document.getElementById('output');
const clearOutputButton = () => document.getElementById('clear-output');

const worker = createWorker();

const showError = (error) => {
  errorDiv().innerText = error instanceof Error ? error.message : error.toString();
};

const clearOutput = () => {
  clearOutputButton().style.display = 'none';
  outputDiv().innerHTML = '';
};

const showOutput = (output) => {
  const div = outputDiv();
  div.innerHTML = `${JSON.stringify(output, null, 2)}\n\n${div.innerHTML}`;
  clearOutputButton().style.display = 'inline-block';
};

worker.addEventListener('message', (event) => {
  console.log('received', event.data);
  showOutput(event.data);
});

worker.addEventListener('error', showError);

document.addEventListener('DOMContentLoaded', () => {
  clearOutputButton().addEventListener('click', clearOutput);
  initOpen(worker, showError);
  initExecSQL(worker, showError);
  initInsert(worker, showError);
  initMatch(worker, showError);
  initClear(worker, showError);

  M.Tabs.init(document.querySelectorAll('.tabs'));

  M.Dropdown.init(
    document.querySelectorAll('.dropdown-trigger'),
    { constrainWidth: false, coverTrigger: false },
  );

  M.FormSelect.init(
    document.querySelectorAll('select'),
    { dropdownOptions: { coverTrigger: false } },
  );
});
