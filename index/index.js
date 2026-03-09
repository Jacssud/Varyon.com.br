(function () {
    'use strict';

    function buildCard(product) {
        var article = document.createElement('article');
        article.className = 'product-card';
        article.dataset.id = product.id;

        var storeClass = 'store-' + product.store;
        var descHtml = product.description
            .map(function (line) { return '<p class="product-desc">' + escapeHtml(line) + '</p>'; })
            .join('');

        article.innerHTML =
            '<a href="productPage/producto.html?id=' + product.id + '" target="_blank" class="product-card-link">' +
                '<span class="store-badge ' + storeClass + '">' + escapeHtml(product.storeLabel) + '</span>' +
                '<div class="product-image">' +
                    '<img src="' + product.image + '" alt="' + escapeHtml(product.alt) + '" loading="lazy">' +
                '</div>' +
                '<p class="product-name">' + escapeHtml(product.name) + '</p>' +
                descHtml +
            '</a>';

        return article;
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderProducts(products) {
        var grid = document.querySelector('.product-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (products.length === 0) {
            grid.innerHTML = '<p class="no-results">Nenhum produto encontrado.</p>';
            return;
        }

        products.forEach(function (product) {
            grid.appendChild(buildCard(product));
        });
    }

    function filterProducts(query) {
        if (!query) return VARYON_PRODUCTS;
        var q = query.toLowerCase();
        return VARYON_PRODUCTS.filter(function (p) {
            var haystack = [
                p.name,
                p.storeLabel,
                p.description.join(' '),
                (p.tags || []).join(' ')
            ].join(' ').toLowerCase();
            return haystack.indexOf(q) !== -1;
        });
    }

    function init() {
        renderProducts(VARYON_PRODUCTS);

        var searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                renderProducts(filterProducts(this.value.trim()));
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
