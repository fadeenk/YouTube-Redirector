var loged = parseInt(localStorage.getItem('loged'));
var BGPage = chrome.extension.getBackgroundPage();
var id = parseInt(localStorage.getItem('id'));

$(document).ready(function () {
	html();
});


function html() {
	console.log('gen');

	if(loged === 0){
		$('.loged').html('<p>The YouTube Redirector is: <button class="off" id="btn">Off</button>');
	}
	else{
		$('.loged').html('<p>The YouTube Redirector is: <button class="on" id="btn">On</button>');
	}
	setTimeout(addListener,100);
}

function addListener(){
	document.querySelector('#btn').addEventListener('click', clickHandler);
}

function clickHandler(e) {
	setTimeout(toggle, 100);
}

function toggle(){
	console.log('toggole');
	if(loged == 0){
		loged = 1;
		localStorage.setItem('loged',loged);
	}
	else{
		loged = 0;
		localStorage.setItem('loged',loged);
	};
	chrome.tabs.get(id, function(tab){
		BGPage.checkForValidUrl(tab.id, tab.url, tab);
	});
	html();
};
