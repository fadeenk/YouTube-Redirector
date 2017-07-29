function checkForValidUrl(tabId, changeInfo, tab) {
	localStorage.setItem('id',tabId);
	loged = parseInt(localStorage.getItem('loged'));
	if(loged == 0){
		chrome.pageAction.setIcon({tabId: tab.id, path: 'icons/off-48.png'});
	}
	else if(loged == 1){
		chrome.pageAction.setIcon({tabId: tab.id, path: 'icons/on-48.png'});
		if(tab.url.length < 25){
      chrome.tabs.executeScript(tab.id, {file: 'script.js'}, function() {
        console.log('Successfully injected script into the page');
      });
		}
	}
  if (tab.url.indexOf('youtube') >= 0) {
    chrome.pageAction.show(tabId);
  }
};

function install_notice() {
	var CurVer = chrome.app.getDetails().version;
	while( CurVer.indexOf('.') > 0 ){
	    CurVer = CurVer.replace('.', '');
	}
	CurVer = parseInt(CurVer);
	console.log(localStorage.getItem('version'));
	console.log(CurVer);
  // if(localStorage.getItem('version') == null){
	// 	console.log("case null");
	// 	localStorage.setItem('version',CurVer);
	// 	chrome.tabs.create({url: "Thankyou.html"});
  //   }
	// else if (localStorage.getItem('version') < CurVer){
	// console.log("case update");
		chrome.tabs.create({url: "log.txt"});
		localStorage.setItem('version',CurVer);
	//}
}

install_notice();
if(localStorage.getItem('loged') == null){
var loged = 0;
localStorage.setItem('loged',loged);
}
else{
loged = parseInt(localStorage.getItem('loged'));
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);
