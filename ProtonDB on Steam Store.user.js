// ==UserScript==
// @name         ProtonDB on Steam Store
// @version      0.1.0
// @description  Adds protondb score to steam store pages
// @namespace    https://github.com/KlingonDragon/user.js
// @author       KlingonDragon
// @match        https://store.steampowered.com/app/*/*/
// @match        https://store.steampowered.com/app/*/*
// @match        https://store.steampowered.com/app/*/
// @match        https://store.steampowered.com/app/*
// @require      https://cdn.jsdelivr.net/gh/klingondragon/simple-dom/index.min.js
// @grant        GM.xmlHttpRequest
// @connect      jazzy-starlight-aeea19.netlify.app
// ==/UserScript==

//#region Utilities/Types
/// <reference path="./simple-dom.d.ts" />
/// <reference path="./GM.d.ts" />
const { _, wait$ } = simpleDOM;
//#endregion
//#region Config
const backgroundColours = {
    platinum: 'rgb(180, 199, 220)',
    gold: 'rgb(207, 181, 59)',
    silver: 'rgb(166, 166, 166)',
    bronze: 'rgb(205, 127, 50)',
    borked: 'red'
};
//#endregion
const steamAppId = location.pathname.match(/\/([0-9]+)\/?/)?.[1];
Promise.all([
    wait$('#gameHeaderImageCtn'),
    GM.xmlHttpRequest({ method: 'GET', url: `https://jazzy-starlight-aeea19.netlify.app/api/v1/reports/summaries/${steamAppId}.json`, responseType: 'json' }).then(r => r.response)
]).then(([body, { tier }]) => {
    body._(_('a', {
        href: `https://www.protondb.com/app/${steamAppId}`,
        target: '_blank',
        style: {
            display: 'block',
            background: backgroundColours[tier] ?? 'black',
            color: tier in backgroundColours ? 'black' : 'white',
            padding: '0.5rem',
            fontSize: '3rem',
            textAlign: 'center',
            textDecoration: 'none',
        },
    })._(tier.toUpperCase()));
});
