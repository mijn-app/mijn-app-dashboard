const updateReady = () =>
  document.dispatchEvent(new CustomEvent('updateReady'));

const trackInstalling = (worker) => {
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed') {
      updateReady();
    }
  });
};

export default () => {
  if (!('serviceWorker' in navigator)) {
    // eslint-ignore
    console.info('SW is not supported'); // eslint-disable-line
    return;
  }

  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      if (!navigator.serviceWorker.controller) {
        return;
      }

      if (registration.waiting) {
        return updateReady();
      }

      if (registration.installing) {
        return trackInstalling(registration.installing);
      }

      registration.addEventListener('updatefound', () => trackInstalling(registration.installing));
    }).catch((err) => {
      console.error('Error during service worker registration:', err); // eslint-disable-line
    });
};
