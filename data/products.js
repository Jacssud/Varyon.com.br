/**
 * products.js — fuente de datos central de Varyon Shop
 *
 * Para agregar un producto nuevo, basta con agregar un objeto al array VARYON_PRODUCTS.
 * No es necesario tocar ningún HTML.
 *
 * Campos por producto:
 *   id          {number}   — identificador único (no repetir)
 *   name        {string}   — nombre del producto
 *   store       {string}   — "amazon" | "mercado" | "aliexpress" (clase CSS del badge)
 *   storeLabel  {string}   — texto que aparece en el badge
 *   link        {string}   — URL de compra (se abre en tab nuevo)
 *   image       {string}   — URL de la imagen principal
 *   alt         {string}   — texto alternativo de la imagen
 *   description {string[]} — array de líneas de descripción
 *   youtubeIds  {string[]} — array con hasta 2 IDs de videos de YouTube (solo el ID, ej: "dQw4w9WgXcQ")
 *   tags        {string[]} — palabras clave para la búsqueda (opcional)
 */

var VARYON_PRODUCTS = [
    {
        id: 1,
        name: "Smartphone Samsung Galaxy A55",
        store: "amazon",
        storeLabel: "amazon",
        link: "https://amzn.to/example1",
        image: "https://placehold.co/200x200/fce7f3/333?text=Smartphone",
        alt: "Smartphone Samsung Galaxy A55",
        description: [
            "Tela Super AMOLED 6.6\" FHD+",
            "Bateria 5000mAh com carregamento rápido",
            "Câmera tripla 50MP + 12MP + 5MP"
        ],
        youtubeIds: ["AZkEf0M0UGc", "dQw4w9WgXcQ"],
        tags: ["smartphone", "samsung", "celular", "android"]
    },
    {
        id: 2,
        name: "Carro RC Offroad 4x4",
        store: "mercado",
        storeLabel: "mercado livre",
        link: "https://mercadolivre.com.br/example2",
        image: "https://placehold.co/200x200/f0f0f0/333?text=RC+Car",
        alt: "Carro RC Offroad 4x4",
        description: [
            "Controle remoto com alcance 50m",
            "Suspensão ajustável 4x4",
            "Bateria recarregável inclusa"
        ],
        youtubeIds: ["dQw4w9WgXcQ"],
        tags: ["brinquedo", "rc", "carro", "offroad"]
    },
    {
        id: 3,
        name: "Auriculares Bluetooth Pro",
        store: "amazon",
        storeLabel: "amazon",
        link: "https://amzn.to/example3",
        image: "https://placehold.co/200x200/e0f2fe/333?text=Auriculares",
        alt: "Auriculares Bluetooth Pro",
        description: [
            "Cancelamento ativo de ruído",
            "Autonomia 30h com case",
            "Conexão multipoint (2 dispositivos)"
        ],
        youtubeIds: ["AZkEf0M0UGc"],
        tags: ["auriculares", "fone", "bluetooth", "audio"]
    },
    {
        id: 4,
        name: "Tablet Xiaomi Pad 6",
        store: "mercado",
        storeLabel: "mercado livre",
        link: "https://mercadolivre.com.br/example4",
        image: "https://placehold.co/200x200/dcfce7/333?text=Tablet",
        alt: "Tablet Xiaomi Pad 6",
        description: [
            "Tela 11\" 2.8K 144Hz",
            "Processador Snapdragon 870",
            "8GB RAM + 256GB armazenamento"
        ],
        youtubeIds: ["dQw4w9WgXcQ", "AZkEf0M0UGc"],
        tags: ["tablet", "xiaomi", "android", "tela grande"]
    }
];
