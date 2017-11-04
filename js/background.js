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

async function injectScripts(tabId, file) {
	await chrome.tabs.executeScript(tabId, { file: file }, () => console.log("Injected " + file));
}

// Receives url from checkPage and if checkUrl returns true it injects the js file 
// from that mirror into the current page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "matchURL") {
		//console.log("Checking Url: " + request.url);
		checkUrl(request.url, function(mirrorMatch, mirrorName, mirrorScript) {
			if (mirrorMatch) {
				//injectScripts(sender.tab.id, mirrorScript).then(sendResponse({mirrorMatch: true}));
				injectScripts(sender.tab.id, 'js/buildPage.js')
				.then(injectScripts(sender.tab.id, mirrorScript))
				.then(sendResponse({ mirrorMatch: true }));
			} else {
				sendResponse({mirrorMatch: false});
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
