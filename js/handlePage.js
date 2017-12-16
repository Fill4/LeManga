var mirrorObject;

function sendInfo(info) {
    return undefined;
}

// Abstracts the use of the fetch API by getting a URL and returning a promise that resolves with the doc of that URL
async function promiseDocFromUrl(url) {
    let response = await fetch(url);
    let text = await response.text();
    let doc = await new DOMParser().parseFromString(text, 'text/html');
    return doc;
}

async function getMangaChapter() {
    var listUrls = mirrorObject.getUrls(window.location.href);
    var promises = await listUrls.map(async url => promiseDocFromUrl(url));
    var listDocs;
    await Promise.all(promises).then(docs => {
        listDocs = docs;
    });
    var listImages = listDocs.map(doc => mirrorObject.getImageFromDoc(doc));
    return listImages;
}

function drawMangaChapter(listImages) {
    var mainElement = mirrorObject.whereToDrawChapter();
    while (mainElement.firstChild) mainElement.removeChild(mainElement.firstChild);
    mainElement.style.backgroundColor = "#161616";

    //Create a fragment and add all images to frangment inside a div to fix margins
    var fragment = document.createDocumentFragment();
    var imgList = fragment.appendChild(document.createElement("ul"));
    listImages.forEach(imageSrc => {
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

async function handlePage() {
    info = mirrorObject.getInfo();
    chrome.runtime.sendMessage({ action: "checkChapterInfo", info: info});
    if (!mirrorObject.canShowFullChapter) {
        var listImages = await getMangaChapter();
        drawMangaChapter(listImages);
    }
}

function registerMirror(mirrorVar) {
    mirrorObject = mirrorVar;
}