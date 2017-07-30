var BGPage = chrome.extension.getBackgroundPage();

var parent = document.querySelector('.toggle-btn');
var checkbox = parent.querySelector('input.cb-value');

checkbox.checked = BGPage.featureEnabled;
updateButtonStyles();
BGPage.updatePageActionIcon();

document.querySelector('.cb-value').addEventListener('click', clickHandler);

function clickHandler(e) {
  updateButtonStyles();
  BGPage.saveChanges({featureEnabled: checkbox.checked});
}

function updateButtonStyles() {
  if (checkbox.checked) {
    parent.classList.add('active')
  } else {
    parent.classList.remove('active');
  }
}
