var needToSignIn = document.getElementsByClassName('yt-uix-button-content')[0].innerText === 'Sign in';
if (!needToSignIn) { //if dosent say sign in
   document.location = "http://www.youtube.com/feed/subscriptions"; //redirect
}
