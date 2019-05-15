var savedPrompt = null;

window.addEventListener('beforeinstallprompt', beforeInstallPrompt);

function beforeInstallPrompt(event) {
   event.preventDefault();
   savedPrompt = event;
   //implement logic to show your UI for adding your application to the home screen (probably a button)
}

//Call this method when the user has clicked the button in your UI
function userClickedAddToHome() {
   savedPrompt.prompt();
   
   savedPrompt.userChoice
    .then(function(choiceResult){
  if (choiceResult.outcome === 'accepted') {
    //User has agreed to add application to Home screen
  } else {
    //User has declined to add application to Home screen
  }
  savedPrompt = null;
});
}
