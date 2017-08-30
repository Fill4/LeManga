$(function () {
    "use strict";

    // Get version from manifest and update html
    $("#version").text(chrome.runtime.getManifest().version);

    var db = new PouchDB('ListMangas');
    db.info().then(function (result) {
        if(result.doc_count === 0) {
            console.log('Its empty!');
        }
    });
});