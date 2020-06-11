import { handleClear } from './handlers/handleClear';
import { handleExecSQL } from './handlers/handleExecSQL';
import { handleInsert } from './handlers/handleInsert';
import { handleMatch } from './handlers/handleMatch';
import { handleOpen } from './handlers/handleOpen';

const state = {
  sqlite: null,
  SQLiteDBClass: null,
};

const actionHandlers = {
  clear: handleClear,
  exec: handleExecSQL,
  insert: handleInsert,
  match: handleMatch,
  open: handleOpen,
};

self.addEventListener('message', ({ data }) => {
  const { action, id } = data;
  if (typeof action !== 'string' || !action) {
    self.postMessage({ action, id, error: 'INVALID_ACTION' });
    return;
  }

  const handler = actionHandlers[action];
  if (!handler) {
    self.postMessage({ action, id, error: 'NO_SUPPORTED_ACTION' });
    return;
  }

  handler(data, state)
    .then((result) => {
      self.postMessage({ action, id, result });
    })
    .catch((error) => {
      self.postMessage({ action, id, error: error.toString() });
    });
});
