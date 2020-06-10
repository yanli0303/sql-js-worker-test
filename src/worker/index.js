import { handleOpen } from './handlers/handleOpen';
import { handleExecSQL } from './handlers/handleExecSQL';

const state = {
  sqlite: null,
  SQLiteDBClass: null,
};

const actionHandlers = {
  open: handleOpen,
  exec: handleExecSQL,
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
