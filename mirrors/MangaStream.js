"use strict";
var MangaStream = {
	mirrorName: "MangaStream",

	isMe: function (url) {
		return (url.match(/(mangastream|readms).(com|net)/g) !== null);
	},

	getListMangas: function () {
		return undefined;
	},

	getListChapters: function () {
		return undefined;
	},

	getSrc: async function(url) {
		let response = await fetch(url);
		let text = await response.text();
		let doc = await new DOMParser().parseFromString(text, 'text/html');
		return doc;
	},

	// Get list of all images in 
	getListImageSrc: function (url, callback) {
		var chapterURL = url.substring(0,url.lastIndexOf('/')+1);
		var lastPageURL = document.querySelector('.btn-reader-page .dropdown-menu li:last-of-type a').href;
		var numberPages = parseInt(lastPageURL.substring(lastPageURL.lastIndexOf('/')+1, lastPageURL.length));
		var listImageSrc = [];
		var promises = [];
		var urls = [];

		// Add urls from all chapter pages to an array
		for (var indexPage = 1; indexPage < numberPages+1; ++indexPage) {
			var nextPageURL = chapterURL + indexPage;
			urls.push(nextPageURL);
		}

		// Get promises for the DOM of all the pages and then resolve the promises by getting the images src
		promises = urls.map(async url => getSrc(url));
		Promise.all(promises).then(docs => {
			var listImageSrc = docs.map(doc => doc.querySelector("#manga-page").src);
			callback(listImageSrc);
		});
		// Added to stop program execution here
		//throw new Error("Stopping here");
	},

	changeImages: function (listImageSrc) {
		console.log('In changeImages');
		// Clear main body element
		var mainElement = document.querySelector(".row-fluid");
		while (mainElement.firstChild) mainElement.removeChild(mainElement.firstChild);
		mainElement.style.backgroundColor = "#161616";

		var fragment = document.createDocumentFragment();
		var imgList = fragment.appendChild(document.createElement("ul"));
		listImageSrc.forEach( imageSrc => {
			var imgElement = document.createElement('img');
			imgElement.src = imageSrc;
			imgElement.style.display = "block";
			imgElement.style.border = "1em";
			imgElement.style.margin = "auto";
			var divComponent = document.createElement('div');
			divComponent.style.margin = '1em';
			divComponent.appendChild(imgElement);
			imgList.appendChild(divComponent);
		});

		mainElement.appendChild(fragment);
	}
};

registerMirror(MangaStream);

/* function changeImage(listImageSrc) {
	//get page element into variable
	var pageTemplate = $('.page')[0].cloneNode(true);
	//remove page element
	var pageParent = $('.page')[0].parentElement;
	$('.page')[0].remove();
	pageParent.setAttribute("style", "background-color: #161616;");
	for (var page = 1; page < listImageSrc.length+1; ++page) {
		// create new page elements from default and change id and src of img
		pageImage = pageTemplate.cloneNode(true);
		pageImage.querySelector('#manga-page').src = listImageSrc[page-1];
		pageImage.querySelector('#manga-page').id = 'manga-page' + page;
		// append page title
		var header = document.createElement('h3');
		pageParent.appendChild(header);
		// append each new page to parent element
		pageParent.append(pageImage);
	}
}

$(document).ready(function() {
	getlistImageSrc(window.location.href, function(listImageSrc) {
		changeImage(listImageSrc);
	});
}); */