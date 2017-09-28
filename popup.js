$(function () {
    "use strict";

    // Get version from manifest and update html
    $("#name").append("v" + chrome.runtime.getManifest().version);

    // Open  database and check number of entries
    var db = new PouchDB('MangaList');
    db.info().then(function (result) {
        if(result.doc_count === 0) {
            console.log('Its empty!');
        }
    });

    
    
});