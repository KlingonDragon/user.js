// ==UserScript==
// @name         Pokémon Card DB to MD
// @version      0.1.2
// @description  Adds a button to copy image, set, and number to clipboard as markdown table syntax
// @namespace    https://github.com/KlingonDragon/user.js
// @author       KlingonDragon
// @match        https://www.pokemon.com/uk/pokemon-tcg/pokemon-cards/series/*/*/
// @run-at       document-end
// ==/UserScript==
document.querySelector('title')?.insertAdjacentText('afterbegin', `${window.location.pathname.split('/').slice(5, 7).join(' - ')} | `);
const mdString = `![${document.querySelector('div.card-description h1')?.textContent}](${document.querySelector('div.card-image > img')?.src})|![${document.querySelector('div.stats-footer h3')?.textContent}](${document.querySelector('div.expansion i')?.style.backgroundImage.replace(/url\("(.*)"\)/, '$1')})<br/>${document.querySelector('div.stats-footer span')?.textContent?.replace(/(\S+)\/(\S+).*/, '$1/$2').replace(/(\S+)\s.*/, '$1')}
`, but = document.createElement('button');
but.addEventListener('click', () => navigator.clipboard.writeText(mdString));
but.innerText = 'Copy MD';
Object.assign(but.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    fontSize: '4rem',
    zIndex: '999999999'
});
document.querySelector('head')?.before(but);