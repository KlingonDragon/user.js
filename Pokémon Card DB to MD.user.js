// ==UserScript==
// @name         Pokémon Card DB to MD
// @version      0.1.0
// @description  Adds a button to copy image, set, and number to clipboard as markdown table syntax
// @namespace    https://github.com/KlingonDragon/user.js
// @author       KlingonDragon
// @match        https://www.pokemon.com/uk/pokemon-tcg/pokemon-cards/series/*/*/
// @run-at       document-end
// ==/UserScript==

const mdString = `|![${document.querySelector('div.card-description h1')?.textContent}](${document.querySelector('div.card-image > img')?.src})|![${document.querySelector('div.stats-footer h3')?.textContent}](${document.querySelector('div.expansion i')?.style.backgroundImage.replace(/url\("(.*)"\)/, '$1')})|${document.querySelector('div.stats-footer span')?.textContent?.replace(/(\S+)\/(\S+).*/, '$1/$2')}
`, but = document.createElement('button');
but.addEventListener('click', () => navigator.clipboard.writeText(mdString));
but.innerText = 'Copy MD';
but.style = 'position:fixed;top:0;left:0;font-size: 4rem;z-index:999999999';
document.querySelector('head')?.before(but);