// ==UserScript==
// @name         Resize iPlayer
// @description  Resize iPlayer to use more screen space
// @version      0.0.5
// @match        https://www.bbc.co.uk/iplayer/episode/*
// @match        https://www.bbc.co.uk/iplayer/live/*
// @require      https://cdn.jsdelivr.net/gh/klingondragon/simple-dom/index.min.js
// ==/UserScript==

//#region Utilities/Types
/// <reference path="./simple-dom.d.ts" />
const { _, _css, wait$ } = simpleDOM;
//#endregion
_css(`
#main > * {
    margin-inline: auto;
}
#main :has(smp-toucan-player) {
    max-width: calc(16 * (100svh / 9));
}
`);
Promise.all([
    wait$('body'),
    wait$('#main smp-toucan-player')
]).then(([body, player]) => {
    player.scrollIntoView();
    body._(
        _('button', {
            style: { colorScheme: 'dark', position: 'fixed', top: '0', left: '0', fontSize: '2rem', zIndex: '999999999', opacity: '0.1' }
        })._('Scroll').on('click', () => player.scrollIntoView())
    );
});