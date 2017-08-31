$(function () {
    "use strict";

    // Get version from manifest and update html
    $("#version").text(chrome.runtime.getManifest().version);

    var db = new PouchDB('MangaList');
    db.info().then(function (result) {
        if(result.doc_count === 0) {
            console.log('Its empty!');
        }
    });

    $("#window").html("<ul id='mangaList'><li>Item 1</li></ul>");
    setTimeout(function() {
        $("#mangaList").append("<li>Item 2</li>");
    }, 2000);
});