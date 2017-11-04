var mirrorObject;

async function getSrc(url) {
    let response = await fetch(url);
    let text = await response.text();
    let doc = await new DOMParser().parseFromString(text, 'text/html');
    return doc;
};

function drawPage(mirrorObject) {
    mirrorObject.getListImageSrc(window.location.href, listImageSrc => {
        mirrorObject.changeImages(listImageSrc);
    });
};

function registerMirror(mirrorVar) {
    mirrorObject = mirrorVar;
};