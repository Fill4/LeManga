// Checks whether the url sent from checkPage matches a known pattern.
// If so, returns the javascript file with that website implementation
function checkUrl(url) {
	var mirrorMatch = url.match(/readms.net/g) !== null;
	var mirrorName = "MangaStream";
	var mirrorScript = "mirrors/MangaStream.js"
	return {mirrorMatch, mirrorName, mirrorScript};
}

function initDBs() {
	var db = new PouchDB('MangaList');
}

async function getMangaList() {
	var db = new PouchDB('MangaList');
	await db.createIndex({ index: { fields: ['nameManga'] } });
	var docs = await db.find({
		selector: { nameManga: { $gte: null } },
		sort: ['nameManga']
	});
	return docs.docs;
}

async function initMangaList() {
	docs = await getMangaList();
	if (docs.length === 0) {
		console.log('Its empty!');
	} else {
		drawMangaList(docs);
	};
}

async function updateMangaList(info) {
	var db = new PouchDB('MangaList');
	var result = await db.find({
		selector: {nameManga: info.nameManga} 
	});
	//console.log(result);
	if (result.docs.length === 0) {
		await db.post({nameManga: info.nameManga, urlManga: info.urlManga});
	};
	var result = await db.find({
		selector: { nameManga: info.nameManga }
	});
}

function drawMangaList(mangas) {
	var fragment = document.createDocumentFragment();
	var list = fragment.appendChild(document.createElement("ul"));
	mangas.forEach(manga => {
		var item = document.createElement('a');
		item.innerText = manga.nameManga;
		item.href = manga.urlManga;
		list.appendChild(item);
	});
	console.log(list);
	return undefined;
}




// Simple function to simplify function injection
async function injectScripts(tabId, file) {
	await chrome.tabs.executeScript(tabId, { file: file }, () => console.log("Injected " + file));
}

// Background message listener
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// Receives url from checkPage and if checkUrl returns true it injects the js file 
	// from that mirror into the current page and returns message true
	if (request.action == "checkURL") {
		//console.log("Checking Url: " + request.url);
		var result = checkUrl(request.url);
		if (result.mirrorMatch) {
			injectScripts(sender.tab.id, 'js/handlePage.js')
			.then(injectScripts(sender.tab.id, result.mirrorScript))
			.then(sendResponse({ mirrorMatch: true }));
		} else {
			sendResponse({mirrorMatch: false});
		};
	};
	// Request from handlePage that has information about the current page manga and chapter
	// Info is then used to update the extension manga list
	if (request.action == "checkChapterInfo") {
		//console.log(request.info);
		updateMangaList(request.info)
	};
	// Used to keep the messaging channel open until a response is sent. Async response
	return true;
});

// Add all the code here for extension initialization
// Setup options variables and default values
// Setup database initialization and alarm updates with user defined intervals
console.log("Starting extension!");

initMangaList();
//updateMangaList();