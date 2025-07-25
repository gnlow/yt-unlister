// ==UserScript==
// @name         yt-unlister
// @namespace    gnlow
// @version      0.1.0
// @description  Intercepts YouTube URL changes to remove the 'list' parameter.
// @author       Gnlow
// @match        https://www.youtube.com/*
// ==/UserScript==

(function() {
    "use strict"

    const onLoad = () => {
        const newLoc = window.location.search
          .replace(/(?<=[?&])list=[^&]+/, "")
          .replace("&&", "&")
        if (window.location.search != newLoc)
          window.location.search = newLoc
    }

    window.addEventListener("load", function() {
        onLoad()
    })

    let lastUrl = window.location.href
    new MutationObserver(() => {
        const url = window.location.href
        if (url != lastUrl) {
            lastUrl = url
            onLoad()
        }
    }).observe(document, {subtree: true, childList: true})
})()
