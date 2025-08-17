// ==UserScript==
// @name         Pokémon Card DB to MD
// @version      0.1.2
// @description  Adds a button to copy image, set, and number to clipboard as markdown table syntax
// @namespace    https://github.com/KlingonDragon/user.js
// @author       KlingonDragon
// @match        https://www.pokemon.com/uk/pokemon-tcg/pokemon-cards/series/*/*/
// @require      https://cdn.jsdelivr.net/gh/klingondragon/simple-dom/index.min.js
// @run-at       document-end
// ==/UserScript==

//#region Utilities/Types
/// <reference path="./GM.d.ts" />
/// <reference path="./simple-dom.d.ts" />
/// <reference path="./Pokémon Card DB to MD.d.ts" />
const { _, $, wait$ } = simpleDOM;
//#endregion
wait$('title').then(title => title.__(`${location.pathname.split('/').slice(5, 7).join(' - ')} | ${title.textContent}`));
Promise.all([
    wait$('body'),
    wait$(('div.card-description h1')),
    wait$('div.card-image > img'),
    wait$('div.stats-footer h3'),
    wait$('div.expansion i'),
    wait$('div.stats-footer span')
]).then(([body, cardName, cardImg, expansionName, expansionImg, setNumber]) => body._(
    _('button', {
        style: { position: 'fixed', top: '0', left: '0', fontSize: '4rem', zIndex: '999999999' }
    })._('Copy MD').on('click', () => navigator.clipboard.writeText(
        `![${cardName.textContent}](${cardImg?.src})|![${expansionName?.textContent}](${expansionImg?.style.backgroundImage.replace(/url\("(.*)"\)/, '$1')})<br/>${setNumber?.textContent?.replace(/(\S+)\/(\S+).*/, '$1/$2').replace(/(\S+)\s.*/, '$1')}\n`
    ))
));