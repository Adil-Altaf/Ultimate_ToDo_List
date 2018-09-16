let deferredPrompt;

window.addEventListener('beforeinstallprompt', function (e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
//  e.preventDefault()
  e.prompt();



  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});
