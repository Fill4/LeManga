// Checks whether the url sent from checkPage matches a known pattern.
// If so, returns the javascript file with that website implementation
function checkUrl(url, callback) {
	//var isTrue = url.match(/(mangastream|readms).(com|net)/g) !== null;
	var mirrorMatch = url.match(/mangastream.com/g) !== null;
	mirrorName = "MangaStream";
	callback(mirrorMatch, mirrorName, "mirrors/MangaStream.js");
}

function initDBs() {
	var db = new PouchDB('MangaList');
}

// Receives url from checkPage and if checkUrl returns true it injects the js file 
// from that mirror into the current page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "matchURL") {
		//console.log("Checking Url: " + request.url);
		checkUrl(request.url, function(mirrorMatch, mirrorName, mirrorScript) {
			if (mirrorMatch) {
				promises = []
				promises.push(chrome.tabs.executeScript(sender.tab.id, {file: mirrorScript}, () => console.log("Injected mirror " + mirrorName)));
				promises.push(chrome.tabs.executeScript(sender.tab.id, {file: "js/libs/jquery-3.2.1.js"}));
				Promise.all(promises)
					.then(function() {sendResponse({mirrorMatch: true, mirrorName: mirrorName});})
					.catch(function(e) {console.log("Catch: " + e);});
			} else {
				sendResponse({mirrorMatch: false, mirrorName: null});
			};
		});
	};
	// Used to keep the messaging channel open until a response is sent. Async response
	return true;
});

// Add all the code here for extension initialization
// Setup options variables and default values
// Setup database initialization and alarm updates with user defined intervals
console.log("Initializing extension!");
