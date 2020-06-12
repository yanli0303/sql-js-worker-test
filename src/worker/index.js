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
  const begin = Date.now();
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

  const returnValue = { action, id, begin };
  handler(data, state)
    .then((result) => {
      self.postMessage({
        ...returnValue,
        duration: Date.now() - begin,
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      self.postMessage({
        ...returnValue,
        duration: Date.now() - begin,
        error: error.message ? error.message : error.toString(),
      });
    });
});
