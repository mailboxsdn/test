let deferredPrompt;

// Listen for install event availability
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // stop default mini-infobar
  deferredPrompt = e;

  // Auto show prompt after short delay
  setTimeout(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User accepted installation');
        } else {
          console.log('❌ User dismissed installation');
        }
        deferredPrompt = null;
      });
    }
  }, 2000); // 2-second delay after page load
});

// Detect installed
window.addEventListener('appinstalled', () => {
  console.log('PWA installed!');
});

