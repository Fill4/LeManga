// Runs on all pages and sends a message to eventScript to check if the url matches a desired pattern
(function() {
	"use strict";
	chrome.runtime.sendMessage({action: "matchURL", url: window.location.href }, function(response) {
		if(response.isTrue) {
			$(document).ready(function() {
				getListImages(window.location.href, function(listImages) {
					changeImages(listImages);
				});
			});
		}; //else {
		//	console.log('Page matches no patterns');
		//};
	});
})();