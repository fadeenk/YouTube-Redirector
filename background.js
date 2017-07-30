var featureEnabled;
var openTabs = [];

checkNewInstallation();
syncStorageArea();

chrome.tabs.onUpdated.addListener(checkForValidUrl);

function syncStorageArea() {
  chrome.storage.sync.get(null, function(storage, err) {
    if (err) {
      throw err;
    }
    if (storage.featureEnabled === null || storage.featureEnabled === undefined) {
      storage.featureEnabled = false;
      saveChanges(storage);
    }
    featureEnabled =  storage.featureEnabled;
  });
}

function saveChanges(obj) {
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set(obj, function(err) {
    if (err) throw err;
    console.log('Settings saved');
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    if (key === 'featureEnabled') {
      featureEnabled = changes[key].newValue;
      updatePageActionIcon();
    }
  }
});

function updatePageActionIcon() {
  var path = featureEnabled ? './icons/on-48.png' : './icons/off-48.png';
  openTabs.forEach((tabID) => {
    chrome.pageAction.setIcon({tabId: tabID, path: path});
  });
}

function isYoutube(tab) {
  return tab.url.indexOf('youtube') >= 0;
}

function checkForValidUrl(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    if (!isYoutube(tab)) {
      chrome.pageAction.hide(tabId);
      return null;
    }
    openTabs.push(tabId);
    updatePageActionIcon();
    chrome.pageAction.show(tabId);
    if (featureEnabled && isYoutube(tab)) {
      if(tab.url.length < 25){
        chrome.tabs.executeScript(tab.id, {file: 'script.js'}, function() {
          console.log('Successfully injected script into the page');
        });
      }
    }

  }
}

function checkNewInstallation() {
	var CurVer = parseInt(chrome.app.getDetails().version.replace(/\./g, ''));
	var oldVersion = localStorage.getItem('version');
	console.log(oldVersion, CurVer);
  if (!oldVersion || oldVersion < CurVer) {
		localStorage.setItem('version', CurVer);
    chrome.tabs.create({url: "log.txt"});
	}
}
