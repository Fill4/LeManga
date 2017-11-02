// Runs on all pages and sends a message to eventScript to check if the url matches a desired pattern
"use strict";

var mirrorObject;

function registerMirror(mirrorVar) {
	mirrorObject = mirrorVar;
};

async function getSrc(url) {
	let response = await fetch(url);
	let text = await response.text();
	let doc = await new DOMParser().parseFromString(text, 'text/html');
	return doc;
};

chrome.runtime.sendMessage({action: "matchURL", url: window.location.href }, response => {
	if(response.mirrorMatch) {
		setTimeout(function() {
			console.log(mirrorObject);
			mirrorObject.getListImageSrc(window.location.href, listImageSrc => {
				mirrorObject.changeImages(listImageSrc);
			});
		}, 500);
	};
});
