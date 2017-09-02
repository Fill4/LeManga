// On button click sends message {action: getImages} to contentScript and receives a list of all images
// in a chapter. Then updates status (setStatus) with un/successful and if sucessfull, adds one of the
// images to the extension popup.
function readFullChapter() {	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: 'getImages'}, function(response) {
			try{
				setStatus('Displaying complete chapter');
				//setImage(response.output[4]);
			} catch(err) {
				setStatus(err.message);
			}
		});
	});
}

// If readFullChapter returns successful, updates the extension with a image from the chapter
function setImage(imageURL) {
	try {
		var imageResult = document.getElementById("image-result");
		imageResult.src = imageURL;
		imageResult.hidden = false;
	} catch(err) {
		setStatus(err.message);
	}
}

// Updates the extesion with success or failure of readFullChapter
function setStatus(statusText) {
  document.getElementById('statusText').textContent = statusText;
}

// Creates an event listener for the button in the extension
// Triggers readFullChapter on button click
document.addEventListener('DOMContentLoaded', function () {
	getImageButton.addEventListener('click', readFullChapter);
});