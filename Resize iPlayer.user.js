// ==UserScript==
// @name         Resize iPlayer
// @description  Resize iPlayer to use more screen space
// @version      0.0.3
// @match        https://www.bbc.co.uk/iplayer/episode/*
// @match        https://www.bbc.co.uk/iplayer/live/*
// @require      https://cdn.jsdelivr.net/gh/klingondragon/simple-dom/index.min.js
// ==/UserScript==

//#region Utilities/Types
/// <reference path="./simple-dom.d.ts" />
const { _css } = simpleDOM;
//#endregion
_css(`
#main > div.channel-wrap > div.channel-grid.gel-wrap,
#main > div.hero-player > div.hero-player__theatre > div.gel-wrap {
    max-width: calc(16 * (90svh / 9));
}
`);