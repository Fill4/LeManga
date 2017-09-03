// Checks whether the url sent from checkPage matches a known pattern.
// If so, returns the javascript file with that website implementation
function checkURL(url, callback){
	//var isTrue = url.match(/(mangastream|readms).(com|net)/g) !== null;
	var mirrorMatch = url.match(/readms.net/g) !== null;
	mirrorName = "MangaStream";
	callback(mirrorMatch, mirrorName, 'mirrors/MangaStream.js');
}

// Receives url from checkPage and if checkURL returns true it injects the js file 
// from that mirror into the current page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "matchURL") {
		checkURL(request.url, function(mirrorMatch, mirrorName, mirrorScript) {
			if (mirrorMatch) {
				promises = []
				promises.push(chrome.tabs.executeScript(sender.tab.id, {file: mirrorScript}));
				promises.push(chrome.tabs.executeScript(sender.tab.id, {file: 'css/semantic/semantic.css'}));
				promises.push(chrome.tabs.executeScript(sender.tab.id, {file: 'css/semantic/semantic.js'}));
				Promise.all(promises).then(sendResponse({mirrorMatch: true, mirrorName: mirrorName}));
			} else {
				sendResponse({mirrorMatch: false, mirrorName: null});
			};
		});
		// Used to keep the messaging channel open until a response is sent
		return true;
	};
});