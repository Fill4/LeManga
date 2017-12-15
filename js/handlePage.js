var mirrorObject;

function sendInfo(info) {
    return undefined;
}

async function getSrc(url) {
    let response = await fetch(url);
    let text = await response.text();
    let doc = await new DOMParser().parseFromString(text, 'text/html');
    return doc;
}

async function drawManga() {
    var listUrls = mirrorObject.getUrls(window.location.href);
    var promises = await listUrls.map(async url => getSrc(url));
    var listDocs;
    await Promise.all(promises).then(docs => {
        listDocs = docs;
    });
    var listImages = mirrorObject.getImages(listDocs);
    mirrorObject.changeImages(listImages);
    
    //mirrorObject.getListImageSrc(window.location.href, listImageSrc => {
    //      mirrorObject.changeImages(listImageSrc);
    //});
}

function handlePage() {
    info = mirrorObject.getInfo();
    //sendInfo(info);
    drawManga();
}

function registerMirror(mirrorVar) {
    mirrorObject = mirrorVar;
}