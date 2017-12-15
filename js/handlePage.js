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

function drawManga() {
    //var listUrls = await mirrorObject.getListUrls(window.location.href);
    //var listImages = await mirrorObject(listUrls);
    //var 
    mirrorObject.getListImageSrc(window.location.href, listImageSrc => {
        mirrorObject.changeImages(listImageSrc);
    });
}

function handlePage() {
    info = mirrorObject.getInfo();
    sendInfo(info);
    drawManga();
}

function registerMirror(mirrorVar) {
    mirrorObject = mirrorVar;
}