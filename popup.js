var mangaList;

function drawMangaList(mangas) {
    var fragment = document.createDocumentFragment();
	var list = fragment.appendChild(document.createElement("ul"));
	mangas.forEach(manga => {
        var a = document.createElement('a');
		a.innerText = manga.nameManga;
        a.href = manga.urlManga;
        a.onclick = function() {chrome.tabs.create({url: a.href});}
        var li = document.createElement('li')
        li.appendChild(a);
        list.appendChild(li);
	});
    nomangas = document.querySelector('#nomangas');
    nomangas.style.display = 'none';
    main = document.querySelector('#mangalist');
    main.style.display = 'block';
    main.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", function (event) {    
    "use strict";

    // Get version from manifest and update html
    document.querySelector("#name").append("v" + chrome.runtime.getManifest().version);

    mangaList = chrome.extension.getBackgroundPage().mangaList;
    if (mangaList) drawMangaList(mangaList);
});