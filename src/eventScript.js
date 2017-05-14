function checkURL(url, callback){
	var isTrue = url.match(/(mangastream|readms).(com|net)/g) !== null;
	if (isTrue) {
		callback(isTrue, 'src/MangaStream.js');
	};
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "matchURL") {
		checkURL(request.url, function(isTrue, mirrorScript) {
			sendResponse({isTrue: isTrue, mirrorScript: mirrorScript});
		});
		// Used to keep the messaging channel open until a response is sent
		return true;
	}
});
