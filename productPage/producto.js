/**
 * producto.js — renderiza el producto dinámico y los embeds de YouTube
 * El producto se selecciona por ?id=N en la URL o con el selector en pantalla.
 * Los datos vienen de /data/products.js (VARYON_PRODUCTS).
 */

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function getProductId() {
    var params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10) || 1;
}

function findProduct(id) {
    return VARYON_PRODUCTS.find(function (p) { return p.id === id; }) || VARYON_PRODUCTS[0];
}

/* ----- Renderizado del producto principal ----- */
function renderProduct(product) {
    var slot = document.getElementById('producto-dinamico');
    if (!slot) return;

    var storeClass = 'store-' + product.store;
    var descHtml = product.description
        .map(function (line) { return '<p class="product-desc">' + escapeHtml(line) + '</p>'; })
        .join('');

    slot.innerHTML =
        '<div class="product-card">' +
            '<span class="store-badge ' + storeClass + '">' + escapeHtml(product.storeLabel) + '</span>' +
            '<a href="' + product.link + '" target="_blank" rel="noopener">' +
                '<div class="product-image">' +
                    '<img src="' + product.image + '" alt="' + escapeHtml(product.alt) + '">' +
                '</div>' +
            '</a>' +
            '<p class="product-name">' + escapeHtml(product.name) + '</p>' +
            descHtml +
            '<a href="' + product.link + '" target="_blank" rel="noopener" class="btn-comprar">Ver oferta ↗</a>' +
        '</div>';

    document.title = 'VARYON - ' + product.name;
}

/* ----- YouTube embeds dinámicos ----- */
function setupYoutube(product) {
    var isLocalFile = window.location.protocol !== 'http:' && window.location.protocol !== 'https:';
    var videoIds = (product.youtubeIds || []).slice(0, 2);
    var containers = document.querySelectorAll('.card-youtube');

    containers.forEach(function (card, index) {
        var embed = card.querySelector('.youtube-embed');
        var iframe = card.querySelector('iframe');
        if (!embed) return;

        var videoId = videoIds[index];

        if (!videoId) {
            card.style.display = 'none';
            return;
        }

        if (isLocalFile) {
            var watchUrl = 'https://www.youtube.com/watch?v=' + videoId;
            embed.innerHTML =
                '<a href="' + watchUrl + '" target="_blank" rel="noopener" class="youtube-fallback">' +
                    '<span class="youtube-fallback-icon">▶</span>' +
                    '<span class="youtube-fallback-text">Ver no YouTube</span>' +
                '</a>';
        } else if (iframe) {
            var origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
            iframe.src = 'https://www.youtube.com/embed/' + videoId + '?enablejsapi=1&origin=' + encodeURIComponent(origin);
        }
    });

    if (isLocalFile) {
        var banner = document.createElement('div');
        banner.className = 'youtube-file-banner';
        banner.innerHTML = 'Para ver os vídeos incorporados, abra a página com um servidor local (ex: <code>npx serve .</code>).';
        document.body.insertBefore(banner, document.body.firstChild);
    }
}

/* ----- Selector de producto ----- */
function setupSelector(currentId) {
    var sel = document.getElementById('product-selector');
    if (!sel) return;
    VARYON_PRODUCTS.forEach(function (p) {
        var opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        if (p.id === currentId) opt.selected = true;
        sel.appendChild(opt);
    });
    sel.addEventListener('change', function () {
        window.location.href = 'producto.html?id=' + this.value;
    });
}

/* ----- Init ----- */
(function () {
    function init() {
        var id = getProductId();
        var product = findProduct(id);
        renderProduct(product);
        setupYoutube(product);
        setupSelector(product.id);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
