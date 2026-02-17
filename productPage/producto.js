/**
 * Página dinámica de producto: solo cambia el contenido del producto,
 * el resto de la página (header, gráficos, YouTube) permanece igual.
 * El producto se puede cambiar por URL (?id=1) o con el selector en la página.
 */

/* ----- YouTube IFrame Player API ----- */
(function () {
    var isLocalFile = window.location.protocol !== 'http:' && window.location.protocol !== 'https:';
    var origin = isLocalFile
        ? ''
        : (window.location.origin || window.location.protocol + '//' + window.location.host);

    var youtubeVideos = [
        { id: 'youtube-player-1', videoId: 'AZkEf0M0UGc' },
        { id: 'youtube-player-2', videoId: 'dQw4w9WgXcQ' }
    ];

    if (isLocalFile) {
        // Abriendo con file://: YouTube no permite embed (Error 153). Mostrar enlace a YouTube.
        youtubeVideos.forEach(function (v) {
            var iframe = document.getElementById(v.id);
            if (iframe) {
                var wrap = iframe.closest('.youtube-embed');
                if (wrap) {
                    var watchUrl = 'https://www.youtube.com/watch?v=' + v.videoId;
                    wrap.innerHTML = '<a href="' + watchUrl + '" target="_blank" rel="noopener" class="youtube-fallback">' +
                        '<span class="youtube-fallback-icon">▶</span>' +
                        '<span class="youtube-fallback-text">Ver en YouTube</span>' +
                        '</a>';
                }
            }
        });
        var banner = document.createElement('div');
        banner.className = 'youtube-file-banner';
        banner.innerHTML = 'Para ver los vídeos aquí incrustados, abre la página con un servidor local (ej: <code>npx serve .</code> en la carpeta del proyecto).';
        document.body.insertBefore(banner, document.body.firstChild);
        return;
    }

    youtubeVideos.forEach(function (v) {
        var iframe = document.getElementById(v.id);
        if (iframe) {
            var url = 'https://www.youtube.com/embed/' + v.videoId + '?enablejsapi=1';
            if (origin) url += '&origin=' + encodeURIComponent(origin);
            iframe.src = url;
        }
    });

    window.ytPlayers = {};
    window.onYouTubeIframeAPIReady = function () {
        ['youtube-player-1', 'youtube-player-2'].forEach(function (id) {
            if (document.getElementById(id)) {
                window.ytPlayers[id] = new YT.Player(id, {
                    events: {
                        'onReady': function () {},
                        'onStateChange': function () {}
                    }
                });
            }
        });
    };

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

/* ----- Lógica de producto dinámico ----- */
(function () {
    'use strict';

    // Datos de productos (puedes ampliarlos o cargarlos por API después)
    var productos = [
        {
            id: 1,
            store: 'amazon',
            storeLabel: 'amazon',
            image: 'https://placehold.co/200x200/fce7f3/333?text=Smartphone',
            alt: 'Smartphone',
            line1: 'XXXXXXXXXXXXXXXXXXXXXXX',
            line2: 'XXXXXXXXXXXXXXXXXXXXXXX',
            line3: 'XXXXXXXXXXXXXXXXXXXXXXX'
        },
        {
            id: 2,
            store: 'mercado',
            storeLabel: 'mercado livre',
            image: 'https://placehold.co/200x200/f0f0f0/333?text=RC+Car',
            alt: 'Coche teledirigido',
            line1: 'XXXXXXXXXXXXXXXXXXXXXXX',
            line2: 'XXXXXXXXXXXXXXXXXXXXXXX',
            line3: 'XXXXXXXXXXXXXXXXXXXXXXX'
        },
        {
            id: 3,
            store: 'amazon',
            storeLabel: 'amazon',
            image: 'https://placehold.co/200x200/e0f2fe/333?text=Auriculares',
            alt: 'Auriculares',
            line1: 'XXXXXXXXXXXXXXXXXXXXXXX',
            line2: 'XXXXXXXXXXXXXXXXXXXXXXX',
            line3: 'XXXXXXXXXXXXXXXXXXXXXXX'
        },
        {
            id: 4,
            store: 'mercado',
            storeLabel: 'mercado livre',
            image: 'https://placehold.co/200x200/dcfce7/333?text=Tablet',
            alt: 'Tablet',
            line1: 'XXXXXXXXXXXXXXXXXXXXXXX',
            line2: 'XXXXXXXXXXXXXXXXXXXXXXX',
            line3: 'XXXXXXXXXXXXXXXXXXXXXXX'
        }
    ];
})();
