// From the current URL of the tab, gathers the URLs of all the pages from the chapter and
// accesses the DOM of each URL to get the 'src' of the images of each page.
// Returns all the images in listImages.
function getListImages(currentURL, callback) {
	var chapterURL = currentURL.substring(0,currentURL.lastIndexOf('/')+1);
	var lastPageURL = $('.dropdown-menu:last li a:last')[0].href;
	var numberPages = parseInt(lastPageURL.substring(lastPageURL.lastIndexOf('/')+1, lastPageURL.length));
	var listImages = [];
	var promises = [];
	var indexPage = 1;
	for (var indexPage = 1; indexPage < numberPages+1; ++indexPage) {
		nextPageURL = chapterURL + indexPage;
		promises.push($.ajax(nextPageURL));
	}
	Promise.all(promises).then( function(results) {
		for (var indexPage = 1; indexPage < numberPages+1; ++indexPage) {
			listImages[indexPage-1] = $(results[indexPage-1]).find("#manga-page")[0].src;
		}
		callback(listImages);
	});
}

function changeImage(listImages) {
	//get page element into variable
	var pageTemplate = $('.page')[0].cloneNode(true);
	//remove page element
	pageParent = $('.page')[0].parentElement;
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

// Listens for messages from the extension scripts. If message is {action: getImages} it runs
// getListImages and then returns the list of images listImages to the extension with a response
// {output: listImages}. Otherwise return the response {output: Wrong Action}.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "getImages") {
		getListImages(window.location.href, function(listImages) {
			//changeImage(listImages);
			sendResponse({output: listImages });
		});
		// Used to keep the messaging channel open until a response is sent
		return true;
	} else{
		sendResponse({output: "Wrong Action"});
	}
});

$(document).ready(function() {
	getListImages(window.location.href, function(listImages) {
		changeImage(listImages);
	});
});