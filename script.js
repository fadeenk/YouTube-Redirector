setTimeout(function() {
  var needToSignIn = true;
  var oldLayout = document.getElementsByClassName('yt-uix-button-content');
  if (oldLayout[0]) {
    needToSignIn = lookForSignIn(oldLayout, 'Sign in');
  } else {
    needToSignIn = lookForSignIn(document.getElementsByTagName('yt-formatted-string'), 'SIGN IN');
  }
  console.log(needToSignIn);
  if (!needToSignIn) { //if dosent say sign in
    document.location = "http://www.youtube.com/feed/subscriptions";
  }
}, 600);

function lookForSignIn(elements, text) {
  var needToSignIn = true;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].innerText === text) {
      return needToSignIn;
    }
  }
  return false;
}
