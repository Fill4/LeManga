// Runs on all pages and sends a message to eventScript to check if the url matches a desired pattern
(function() {
	"use strict";
	chrome.runtime.sendMessage({action: "matchURL", url: window.location.href }, function(response) {
		if(response.mirrorMatch) {
			$(document).ready(function() {
				var mirror = window[response.mirrorName];
				console.log(mirror);
				mirror.getListImages(window.location.href, function(listImages) {
					mirror.changeImages(listImages);
				});
			});
		};
	});
})();