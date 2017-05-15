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

	// Get list of all images in 
	getListImages: function (url, callback) {
		var chapterURL = url.substring(0,url.lastIndexOf('/')+1);
		var lastPageURL = $('.dropdown-menu:last li a:last')[0].href;
		var numberPages = parseInt(lastPageURL.substring(lastPageURL.lastIndexOf('/')+1, lastPageURL.length));
		var listImages = [];
		var promises = [];
		var indexPage = 1;
		for (var indexPage = 1; indexPage < numberPages+1; ++indexPage) {
			var nextPageURL = chapterURL + indexPage;
			promises.push($.ajax(nextPageURL));
		}
		Promise.all(promises).then( function(results) {
			for (var indexPage = 1; indexPage < numberPages+1; ++indexPage) {
				listImages[indexPage-1] = $(results[indexPage-1]).find("#manga-page")[0].src;
			}
			callback(listImages);
		});
	},

	changeImages: function (listImages) {
		// Clear main body element
		var $mainElement = $('.row-fluid')[0];
		$($mainElement).empty();
		$($mainElement).attr('style', 'background-color: #161616;');
		// Create basic element for image
		var $imgContainer = $('<div>', {"class": "ui fluid segment"});
		var $imgElement = $('<img>', {"class": "ui fluid image"});
		var $imgSpacing = $('<h3>');
		$($imgContainer).append($imgElement);
		$($imgContainer).append($imgSpacing);
		// For every image in listImages, copy the image element, change src and append to mainElement
		for (var page = 1; page < listImages.length+1; ++page) {
			// Copy basic element
			var $newContainer = $imgContainer.clone();
			// append page title
			$newContainer.children('img').attr('src', listImages[page-1]);
			console.log($newContainer[0]);
			// append each new page to parent element
			$mainElement.append($newContainer[0]);
		}
	}
};

/* function changeImage(listImages) {
	//get page element into variable
	var pageTemplate = $('.page')[0].cloneNode(true);
	//remove page element
	var pageParent = $('.page')[0].parentElement;
	$('.page')[0].remove();
	pageParent.setAttribute("style", "background-color: #161616;");
	for (var page = 1; page < listImages.length+1; ++page) {
		// create new page elements from default and change id and src of img
		pageImage = pageTemplate.cloneNode(true);
		pageImage.querySelector('#manga-page').src = listImages[page-1];
		pageImage.querySelector('#manga-page').id = 'manga-page' + page;
		// append page title
		var header = document.createElement('h3');
		pageParent.appendChild(header);
		// append each new page to parent element
		pageParent.append(pageImage);
	}
}

$(document).ready(function() {
	getListImages(window.location.href, function(listImages) {
		changeImage(listImages);
	});
}); */