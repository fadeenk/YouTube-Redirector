Raven.config('https://03b6b508c625428f842368e57c29e108@sentry.io/197359', {
  release: chrome.app.getDetails().version,
}).install();

var BGPage = chrome.extension.getBackgroundPage();

var parent = document.querySelector('.toggle-btn');
var checkbox = parent.querySelector('input.cb-value');
var pauseButton = document.querySelector('button#pause');
var secondsBox = document.querySelector('input#seconds');
var timer = document.querySelector('#timer');
BGPage.ga('send', 'pageview', '/popUp.html');

syncUItoState();
// the enable option is linked to the timer of the pause functionality
// if in paused state the enable button will not have the click handler
updateTimer();
updateButtonStyles();

pauseButton.addEventListener('click', pause);

function clickHandler() {
  updateButtonStyles();
  BGPage.ga('send', 'event', 'checkbox', 'clicked', checkbox.checked ? 'on' : 'off');
  BGPage.saveChanges({featureEnabled: checkbox.checked});
  pauseButton.disabled = !checkbox.checked;
}

function updateButtonStyles() {
  if (checkbox.checked) {
    parent.classList.add('active')
  } else {
    parent.classList.remove('active');
  }
}

function pause() {
  BGPage.ga('send', 'event', 'pause', 'clicked', secondsBox.value);
  const expires = new Date(Date.now() + (secondsBox.value * 1000));
  BGPage.saveChanges({
    pause: {
      seconds: secondsBox.value * 1000,
      expires: expires.toISOString(),
    }
  });
}

function syncUItoState() {
  checkbox.checked = BGPage.featureEnabled;
  updateButtonStyles();
  pauseButton.disabled = !checkbox.checked;
  secondsBox.value = BGPage.pause.seconds / 1000;
}

function updateTimer() {
  const diff = new Date(BGPage.pause.expires).getTime() - Date.now();
  if (diff <= 0) {
    checkbox.addEventListener('click', clickHandler);
    timer.innerHTML = '';
  } else {
    checkbox.removeEventListener('click', clickHandler);
    timer.innerHTML = parseInt(diff / 1000) + 1;
  }
}

chrome.runtime.onMessage.addListener((message,sender,sendResponse) => {
  if (message.event === 'syncUI') {
    syncUItoState();
  }
  if (message.event === 'updateTimer') {
    updateTimer();
  }
});
