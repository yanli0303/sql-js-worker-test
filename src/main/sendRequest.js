const showProgress = (button) => {
  const inner = document.createElement('div');
  inner.className = 'indeterminate';

  const progress = document.createElement('div');
  progress.className = 'progress';
  progress.appendChild(inner);

  button.style.display = 'none';
  button.parentElement.insertBefore(progress, button);
  return progress;
};

const hideProgress = (progress, button) => {
  progress.parentElement.removeChild(progress);
  button.style.display = '';
};

export const sendRequest = (
  worker,
  parseForm,
  button,
  showError,
) => {
  let request;
  try {
    request = parseForm();
  } catch (e) {
    showError(e);
  }

  const progress = showProgress(button);
  worker.postMessage(request);

  let onmessage;
  const teardown = () => {
    worker.removeEventListener('message', onmessage);
    worker.removeEventListener('error', teardown);
    hideProgress(progress, button);
  };

  onmessage = (event) => {
    if (event.data.id === request.id) {
      teardown();
    }
  };

  worker.addEventListener('message', onmessage);
  worker.addEventListener('error', onmessage);
};
