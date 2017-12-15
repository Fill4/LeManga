document.addEventListener("DOMContentLoaded", function (event) {    
    "use strict";

    // Get version from manifest and update html
    document.querySelector("#name").append("v" + chrome.runtime.getManifest().version);
});