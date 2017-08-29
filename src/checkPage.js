// Runs on all pages and sends a message to eventScript to check if the url matches a desired pattern
(function() {
	"use strict";
	chrome.runtime.sendMessage({action: "matchURL", url: window.location.href }, function(response) {
		if(response.mirrorMatch) {
			$(document).ready(function() {
				MangaStream.getListImages(window.location.href, function(listImages) {
					MangaStream.changeImages(listImages);
				});
			});
		};
	});
})();