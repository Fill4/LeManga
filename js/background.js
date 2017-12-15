// Checks whether the url sent from checkPage matches a known pattern.
// If so, returns the javascript file with that website implementation
function checkUrl(url, callback) {
	//var isTrue = url.match(/(mangastream|readms).(com|net)/g) !== null;
	var mirrorMatch = url.match(/readms.net/g) !== null;
	mirrorName = "MangaStream";
	callback(mirrorMatch, mirrorName, "mirrors/MangaStream.js");
}

function initDBs() {
	var db = new PouchDB('MangaList');
}

async function initMangaList() {
	//var db = new PouchDB('MangaList');
	//db.allDocs({include_docs: true})
	//.then(mangas => console.log(mangas.total_rows));
	
	var db = new PouchDB('MangaList');
	info = await db.info()
	if (info.doc_count === 0) {
		console.log('Its empty!');
	} else {
		docs = await db.allDocs({ include_docs: true });
		console.log(docs);
	};
}

function updateMangaList() {
	return undefined;
}

function drawMangaList(mangas) {
	var fragment = document.createDocumentFragment();
	var mangaList = fragment.appendChild(document.createElement("ul"));
	mangas.forEach(manga => {
		
	});
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
				injectScripts(sender.tab.id, 'js/handlePage.js')
				.then(injectScripts(sender.tab.id, mirrorScript))
				.then(sendResponse({ mirrorMatch: true }));
			} else {
				sendResponse({mirrorMatch: false});
			};
		});
	};
	if (request.action == "updateChapters") {
		
	};
	// Used to keep the messaging channel open until a response is sent. Async response
	return true;
});

// Add all the code here for extension initialization
// Setup options variables and default values
// Setup database initialization and alarm updates with user defined intervals
console.log("Initializing extension!");

initMangaList();
//updateMangaList();