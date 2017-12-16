"use strict";
var MangaStream = {
	mirrorName: "MangaStream",
	canShowFullChapter: false,
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
		return {nameManga, nameChapter, urlManga, urlChapter};
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

	getImageFromDoc: function (doc) {
		return doc.querySelector("#manga-page").src;
	},

	whereToDrawChapter: function () {
		return document.querySelector(".row-fluid");
	}
};

registerMirror(MangaStream);