// Checks whether the url sent from checkPage matches a known pattern.
// If so, returns the javascript file with that website implementation
function checkURL(url, callback){
	//var isTrue = url.match(/(mangastream|readms).(com|net)/g) !== null;
	var mirrorMatch = url.match(/readms.net/g) !== null;
	callback(mirrorMatch, 'src/MangaStream.js');
}

// Receives url from checkPage and if checkURL returns true it injects the js file 
// from that mirror into the current page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "matchURL") {
		checkURL(request.url, function(mirrorMatch, mirrorScript) {
			if (mirrorMatch) {
				chrome.tabs.executeScript(sender.tab.id, {file: mirrorScript});
				chrome.tabs.executeScript(sender.tab.id, {file: 'src/styles/semantic/semantic.css'});
				chrome.tabs.executeScript(sender.tab.id, {file: 'src/styles/semantic/semantic.js'});
				sendResponse({mirrorMatch: true, mirrorScript: mirrorScript});
			} else {
				sendResponse({mirrorMatch: false, mirrorScript: null});
			};
		});
		// Used to keep the messaging channel open until a response is sent
		return true;
	};
});
