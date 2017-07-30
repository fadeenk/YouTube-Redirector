Raven.config('https://03b6b508c625428f842368e57c29e108@sentry.io/197359', {
  release: chrome.app.getDetails().version,
}).install();

var BGPage = chrome.extension.getBackgroundPage();

var parent = document.querySelector('.toggle-btn');
var checkbox = parent.querySelector('input.cb-value');

BGPage.ga('send', 'pageview', '/popUp.html');

checkbox.checked = BGPage.featureEnabled;
updateButtonStyles();

document.querySelector('.cb-value').addEventListener('click', clickHandler);

function clickHandler() {
  updateButtonStyles();
  BGPage.ga('send', 'event', 'checkbox', 'clicked', checkbox.checked ? 'on' : 'off');
  BGPage.saveChanges({featureEnabled: checkbox.checked});
}

function updateButtonStyles() {
  if (checkbox.checked) {
    parent.classList.add('active')
  } else {
    parent.classList.remove('active');
  }
}
