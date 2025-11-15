// main.js
// - Footerin vuosiluku
// - "Takaisin ylös" -nappi
// - Yhteystietojen obfuskaatio (sähköposti & puhelin)

/**
 * Muodostaa merkkijonon charcode-listasta.
 * Tämä tekee sähköpostin ja puhelimen lukemisen hankalammaksi yksinkertaisille boteille,
 * mutta selaimelle ja käyttäjälle kaikki toimii normaalisti.
 */
function fromCharCodes(codes) {
  return String.fromCharCode.apply(null, codes);
}

/**
 * Aseta obfuskoitu linkki (mailto/tel/ym.).
 * @param {string} elementId  - HTML-elementin id
 * @param {number[]} codes    - merkkijonon charcode-lista
 * @param {string} protocol   - esim. "mailto:" tai "tel:"
 */
function setObfuscatedLink(elementId, codes, protocol) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const value = fromCharCodes(codes);

  if (protocol) {
    el.setAttribute('href', protocol + value);
  }

  el.textContent = value;
}

document.addEventListener('DOMContentLoaded', function () {
  // Footerin vuosiluku
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Takaisin ylös -napin logiikka
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopButton.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      } else {
        backToTopButton.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Yhteystietojen obfuskaatio
  // Sähköposti: reino.pesonen@gmail.com
  const emailCharCodes = [
    114, 101, 105, 110, 111, 46, 112, 101, 115, 111, 110, 101, 110, // "reino.pesonen"
    64,                                                            // "@"
    103, 109, 97, 105, 108, 46, 99, 111, 109                       // "gmail.com"
  ];
  setObfuscatedLink('emailLink', emailCharCodes, 'mailto:');

  // Puhelin: +358440424867
  const phoneCharCodes = [
    43, 51, 53, 56, 52, 52, 48, 52, 50, 52, 56, 54, 55
    // "+358440424867"
  ];
  setObfuscatedLink('phoneLink', phoneCharCodes, 'tel:');
});
