(function() {
	"use strict";
	chrome.runtime.sendMessage({action: "matchURL", url: window.location.href }, function(response) {
		if(response.isTrue) {
			chrome.runtime.executeScript(null, {file: response.mirrorScript}, function() {
				console.log('Here');
				printThis();
			});
		};
	});
})();