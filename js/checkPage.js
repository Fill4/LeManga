// Runs on all pages and sends a message to eventScript to check if the url matches a desired pattern
"use strict";

chrome.runtime.sendMessage({action: "matchURL", url: window.location.href }, response => {
	if(response.mirrorMatch) {
		setTimeout(function () {
			handlePage();
		}, 100);
	};
});
