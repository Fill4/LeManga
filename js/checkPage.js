// Runs on all pages and sends a message to eventScript to check if the url matches a desired pattern
"use strict";

var mirrorObject;

function registerMirror(mirrorVar) {
	mirrorObject = mirrorVar;
}

chrome.runtime.sendMessage({action: "matchURL", url: window.location.href }, function(response) {
	if(response.mirrorMatch) {
		$(document).ready(function() {
			mirrorObject.getListImages(window.location.href, function(listImages) {
				mirrorObject.changeImages(listImages);
			});
		});
	};
});
