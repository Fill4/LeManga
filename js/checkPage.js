// Runs on all pages and sends a message to eventScript to check if the url matches a desired pattern
"use strict";

chrome.runtime.sendMessage({action: "checkURL", url: window.location.href }, response => {
	if(response.mirrorMatch) {
		setTimeout(function () {
			console.log('Handling page');
			handlePage();
		}, 100);
	};
});
