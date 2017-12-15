"use strict";
var MangaStream = {
	mirrorName: "MangaStream",

	isMe: function (url) {
		return (url.match(/(mangastream|readms).(com|net)/g) !== null);
	},

	getInfo: function (url) {
		var nameManga;
		var nameChapter;
		var urlManga;
		var urlChapter;	
		
		nameManga = document.querySelector('.btn-default .hidden-sm').innerText;
		nameChapter = document.querySelector('.btn-reader-chapter .dropdown-menu li a span').innerText;
		urlManga = document.querySelector('.btn-reader-chapter .dropdown-menu li:last-child a').href
		urlChapter = document.querySelector('.btn-reader-chapter .dropdown-menu li:first-child a').href

		/*
		console.log(" nameManga : " + nameManga + "\n" +
					" nameChapter : " + nameChapter + "\n" +
					" urlManga : " + urlManga + "\n" +
					" urlChapter : " + urlChapter); 
		*/

		return {"nameManga" : nameManga,
				"nameChapter" : nameChapter,
				"urlManga" : urlManga,
				"urlChapter" : urlChapter};
		
	},

	getListMangas: function () {
		return undefined;
	},

	getListChapters: function () {
		return undefined;
	},

	// Get list of all images in page
	getUrls: function (url) {
		var chapterURL = url.substring(0,url.lastIndexOf('/')+1);
		var lastPageURL = document.querySelector('.btn-reader-page .dropdown-menu li:last-child a').href;
		var numberPages = parseInt(lastPageURL.substring(lastPageURL.lastIndexOf('/')+1, lastPageURL.length));
		var listUrls = [];

		// Add urls from all chapter pages to an array
		for (var indexPage = 1; indexPage < numberPages+1; ++indexPage) {
			var nextPageURL = chapterURL + indexPage;
			listUrls.push(nextPageURL);
		};
		return listUrls;
	},

	getImages: function (listDocs) {
		// Get promises for the DOM of all the pages and then resolve the promises by getting the images src
		var listImages = listDocs.map(doc => doc.querySelector("#manga-page").src);
		return listImages;
	},

	changeImages: function (listImageSrc) {
		// Clear main body element and change to dark color
		var mainElement = document.querySelector(".row-fluid");
		//mainElement.parentElement.removeChild(document.querySelector(".msa"));
		while (mainElement.firstChild) mainElement.removeChild(mainElement.firstChild);
		mainElement.style.backgroundColor = "#161616";

		//Create a fragment and add all images to frangment inside a div to fix margins
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
		// Add fragment to main element to destroy it and add its elements
		mainElement.appendChild(fragment);
	}
};

registerMirror(MangaStream);