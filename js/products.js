/**
 * Daud Fabrics - Centralized Product Catalog Data (js/products.js)
 * Supports dynamic product creation & deletion via Admin Dashboard (localStorage).
 */

const baseProducts = [
    // Gents Collection
    {
        id: "gents-001",
        name: "Pure Velvet Shawl For Men - Traditional Dussa Shawl (VS-09)",
        handle: "pure-velvet-shawl-for-men-traditional-dussa-shawl-vs-09",
        category: "Gents",
        price: 4999,
        oldPrice: 7999,
        discount: 38,
        image: "images/gents_velvet_shawl.jpg",
        additionalImages: ["images/gents_velvet_shawl.jpg"],
        description: "Elevate your traditional wardrobe with the Daud Fabrics Royal Velvet Dussa Shawl. Crafted from premium high-density velvet with rich embroidered borders, this shawl offers exceptional warmth, luxurious drape, and unmatched elegance for weddings and festive occasions.",
        details: [
            "Fabric: Premium Micro Velvet (Heavy Density)",
            "Dimensions: 2.5 Yards (Standard Men's Dussa Size)",
            "Embroidery: Fine Tilla & Silk Thread Bordering",
            "Care Instructions: Dryclean Only",
            "Season: Winter / Formal Festive Collection"
        ],
        rating: 4.9,
        reviewCount: 38,
        reviews: [
            {
                name: "Muhammad Ali",
                rating: 5,
                date: "2026-02-14",
                verified: true,
                comment: "The velvet quality is top-notch! Wore it to a family wedding and received endless compliments."
            }
        ]
    },
    {
        id: "gents-002",
        name: "Daud Fabrics Executive Cream Wash & Wear Unstitched Suit",
        handle: "daud-fabrics-executive-cream-wash-wear-unstitched-suit",
        category: "Gents",
        price: 3499,
        oldPrice: 4999,
        discount: 30,
        image: "images/gents_cream.jpg",
        additionalImages: ["images/gents_cream.jpg"],
        description: "Daud Fabrics signature Executive Cream Gents Wash & Wear suit is engineered for ultimate wrinkle-resistant comfort and durability. Ideal for daily formal wear, business meetings, and Jummah attire.",
        details: [
            "Fabric: Soft Tropical Wash & Wear (Wrinkle Resistant)",
            "Length: 4.25 Meters (1.5 Yard Width)",
            "Buttons: Premium Metallic / Custom Buttons Included",
            "Brand Tag: Official Daud Fabrics Woven Label Included"
        ],
        rating: 4.9,
        reviewCount: 52,
        reviews: [
            {
                name: "Bilal Ahmad",
                rating: 5,
                date: "2026-02-10",
                verified: true,
                comment: "Soft fabric, doesn't crease easily. Ideal for daily office wear."
            }
        ]
    },
    {
        id: "gents-003",
        name: "Daud Fabrics Royal Boski Silk Unstitched Suit (8 Pound)",
        handle: "daud-fabrics-royal-boski-silk-unstitched-suit",
        category: "Gents",
        price: 5999,
        oldPrice: 8499,
        discount: 29,
        image: "images/gents_boski.jpg",
        additionalImages: ["images/gents_boski.jpg"],
        description: "Pure Royal 8-Pound Boski Silk Gents Suit. Traditional luster, heavy fall, and breathable comfort for formal festive gatherings.",
        details: [
            "Fabric: 100% Pure Chinese Silk Boski (8 Pound Weight)",
            "Length: 4.5 Meters (Standard Gents Kameez Shalwar)",
            "Color: Authentic Golden Warm Ivory",
            "Includes: Custom Brass Collar Buttons & Brand Box"
        ],
        rating: 5.0,
        reviewCount: 41,
        reviews: []
    },
    {
        id: "gents-004",
        name: "Daud Fabrics Midnight Navy Cotton Kurta Suit",
        handle: "daud-fabrics-midnight-navy-cotton-kurta-suit",
        category: "Gents",
        price: 3799,
        oldPrice: 5299,
        discount: 28,
        image: "images/gents_blue.jpg",
        additionalImages: ["images/gents_blue.jpg"],
        description: "Deep midnight blue 100% fine Egyptian cotton Gents unstitched suit fabric. Breathable, durable, and sophisticated.",
        details: [
            "Fabric: 100% Long-Staple Egyptian Cotton",
            "Length: 4.25 Meters",
            "Color: Deep Midnight Navy Blue"
        ],
        rating: 4.8,
        reviewCount: 33,
        reviews: []
    },
    {
        id: "gents-005",
        name: "Daud Fabrics Charcoal Grey Tropical Wash & Wear Suit",
        handle: "daud-fabrics-charcoal-grey-tropical-wash-wear-suit",
        category: "Gents",
        price: 3699,
        oldPrice: 4999,
        discount: 26,
        image: "images/gents_grey.jpg",
        additionalImages: ["images/gents_grey.jpg"],
        description: "Elegant charcoal grey tropical suiting fabric. Heavy drape, easy care wash & wear technology.",
        details: [
            "Fabric: Heavy Drape Tropical Wash & Wear",
            "Length: 4.25 Meters",
            "Color: Charcoal Slate Grey"
        ],
        rating: 4.8,
        reviewCount: 27,
        reviews: []
    },
    {
        id: "gents-006",
        name: "Daud Fabrics Royal Floral Printed Unstitched Suit (PC-12)",
        handle: "daud-fabrics-royal-floral-printed-unstitched-suit-pc-12",
        category: "Gents",
        price: 3999,
        oldPrice: 5999,
        discount: 33,
        image: "images/WhatsAppImage2026-05-30at2.57.23PM_1.jpg",
        additionalImages: ["images/WhatsAppImage2026-05-30at2.57.23PM_1.jpg"],
        description: "Vibrant navy floral printed unstitched suit fabric by Daud Fabrics. Soft texture, premium color fastness, and breathable drape.",
        details: [
            "Fabric: Premium Printed Cotton Lawn",
            "Shirt: 2.5 Meters Printed Fabric",
            "Trouser: 2.5 Meters Printed Fabric",
            "Color: Royal Navy with Floral Accents"
        ],
        rating: 4.7,
        reviewCount: 29,
        reviews: []
    },
    {
        id: "gents-007",
        name: "Daud Fabrics Blossom Lawn Unstitched Suit (PC-06)",
        handle: "daud-fabrics-blossom-lawn-unstitched-suit-pc-06",
        category: "Gents",
        price: 2499,
        oldPrice: 3499,
        discount: 28,
        image: "images/WhatsAppImage2026-05-30at2.57.28PM_1.jpg",
        additionalImages: ["images/WhatsAppImage2026-05-30at2.57.28PM_1.jpg"],
        description: "Rich cobalt blue floral blossom printed unstitched suit fabric by Daud Fabrics.",
        details: [
            "Fabric: 100% Fine Lawn",
            "Pattern: Blossom Floral Print",
            "Length: 5.0 Meters Total (Shirt + Trouser)"
        ],
        rating: 4.6,
        reviewCount: 19,
        reviews: []
    },
    {
        id: "gents-008",
        name: "Daud Fabrics Mustard Gold Leaf Printed Suit (PC-03)",
        handle: "daud-fabrics-mustard-gold-leaf-printed-suit-pc-03",
        category: "Gents",
        price: 1499,
        oldPrice: 1999,
        discount: 25,
        image: "images/WhatsAppImage2026-05-30at2.56.25PM_1.jpg",
        additionalImages: ["images/WhatsAppImage2026-05-30at2.56.25PM_1.jpg"],
        description: "Vibrant mustard yellow leaf printed unstitched suit fabric by Daud Fabrics.",
        details: [
            "Fabric: Soft Breathable Lawn",
            "Pattern: Golden Leaf Botanical Print",
            "Includes: 2PC Unstitched Set"
        ],
        rating: 4.5,
        reviewCount: 14,
        reviews: []
    },

    // Women's Collection
    {
        id: "womens-001",
        name: "Embroidered Lawn Unstitched 3PC Set | RF1309",
        handle: "embroidered-lawn-unstitched-3pc-set-rf1309",
        category: "Women",
        price: 4999,
        oldPrice: 6999,
        discount: 30,
        image: "images/24_b8af8657-0cc4-40e8-b9c7-fe998a4ba02b_1.jpg",
        additionalImages: ["images/24_b8af8657-0cc4-40e8-b9c7-fe998a4ba02b_1.jpg"],
        description: "Exquisite 3-piece luxury embroidered lawn suit featuring intricate floral threadwork on shirt front, printed lawn dupatta, and dyed plain trousers.",
        details: [
            "Shirt: Heavy Embroidered Premium Lawn (3.0 Meters)",
            "Dupatta: Digital Printed Lawn Dupatta (2.5 Meters)",
            "Trouser: Solid Color Dyed Lawn Trouser (2.5 Meters)"
        ],
        rating: 4.9,
        reviewCount: 52,
        reviews: []
    },
    {
        id: "womens-002",
        name: "Crimson Bloom Bold Midnight Black Embroidered Lawn 3PC",
        handle: "crimson-bloom-bold-midnight-black-embroidered-lawn-3pc",
        category: "Women",
        price: 5499,
        oldPrice: 7499,
        discount: 27,
        image: "images/crimson-bloom-bold-midnight-black.jpg",
        additionalImages: ["images/crimson-bloom-bold-d4b-lawn.jpg"],
        description: "Designer midnight black embroidered lawn outfit with heavy organza embroidered necklines, printed chiffon dupatta, and silk borders.",
        details: [
            "Shirt: Embroidered Jet Black Lawn",
            "Dupatta: Digital Printed Chiffon Dupatta",
            "Trouser: Solid Black Cotton Trouser"
        ],
        rating: 5.0,
        reviewCount: 44,
        reviews: []
    },
    {
        id: "womens-003",
        name: "Crimson Bloom Bold D4-A Floral Embroidered Lawn 3PC",
        handle: "crimson-bloom-bold-d4-a-floral-embroidered-lawn-3pc",
        category: "Women",
        price: 5299,
        oldPrice: 7199,
        discount: 26,
        image: "images/crimson-bloom-bold-d4a-lawn.jpg",
        additionalImages: ["images/crimson-bloom-bold-d4a-lawn.jpg"],
        description: "Pastel botanical embroidered lawn set with soft thread embroidery and silk tissue printed dupatta.",
        details: [
            "Shirt: Embroidered Lawn (3 Meters)",
            "Dupatta: Silk Tissue Printed Dupatta",
            "Trouser: Cambric Cotton Trouser"
        ],
        rating: 4.8,
        reviewCount: 29,
        reviews: []
    },
    {
        id: "womens-004",
        name: "Royal Emerald Green Embroidered Lawn 3PC Suit",
        handle: "royal-emerald-green-embroidered-lawn-3pc-suit",
        category: "Women",
        price: 4799,
        oldPrice: 6299,
        discount: 24,
        image: "images/womens-lawn-embroidered-green.jpg",
        additionalImages: ["images/womens-green-embroidered.jpg"],
        description: "Deep emerald green 3-piece unstitched suit with gold tilla embroidery and contrasting printed dupatta.",
        details: [
            "Shirt: Embroidered Emerald Lawn",
            "Dupatta: Soft Printed Lawn Dupatta",
            "Trouser: Dyed Solid Green Trouser"
        ],
        rating: 4.9,
        reviewCount: 36,
        reviews: []
    },

    // Summer Collection
    {
        id: "summer-001",
        name: "ANEELA'S Premium Lawn 3PC Embroidered Suit - Summer Lawn 2026",
        handle: "aneela-s-premium-lawn",
        category: "Summer",
        price: 4799,
        oldPrice: 6499,
        discount: 26,
        image: "images/WhatsAppImage2026-02-09at10.16.33PM_1.jpg",
        additionalImages: ["images/WhatsAppImage2026-02-09at10.16.33PM_1.jpg"],
        description: "Fresh summer pastel lawn suit with breathable 80/80 count cotton lawn fabric.",
        details: [
            "Fabric: 100% Pure Summer Lawn (80/80 Count)",
            "Dupatta: Light Soft Lawn Dupatta",
            "Trouser: Breathable Cotton Trouser"
        ],
        rating: 4.9,
        reviewCount: 37,
        reviews: []
    },
    {
        id: "summer-002",
        name: "Aneela's Purple Floral Summer Lawn 3PC Suit",
        handle: "aneelas-purple-floral-summer-lawn-3pc-suit",
        category: "Summer",
        price: 4699,
        oldPrice: 6299,
        discount: 25,
        image: "images/summer-aneelas-purple-lawn.jpg",
        additionalImages: ["images/summer-aneelas-purple-lawn.jpg"],
        description: "Charming lilac purple summer lawn suit with delicate white thread embroidery and floral printed dupatta.",
        details: [
            "Shirt: Embroidered Pastel Lawn",
            "Dupatta: Chiffon Printed Dupatta",
            "Trouser: Soft Cambric Trouser"
        ],
        rating: 4.8,
        reviewCount: 31,
        reviews: []
    },
    {
        id: "summer-003",
        name: "Asim Jofa Black Luxury Summer Lawn 3PC Suit (Edition 02)",
        handle: "asim-jofa-black-luxury-summer-lawn-3pc-suit-02",
        category: "Summer",
        price: 5499,
        oldPrice: 7499,
        discount: 27,
        image: "images/summer-asim-jofa-black-02.jpg",
        additionalImages: ["images/summer-asim-jofa-black-05.jpg"],
        description: "Luxury designer black lawn suit with intricate golden neck embroidery and silk tissue printed dupatta.",
        details: [
            "Shirt: Premium Jet Black Lawn",
            "Dupatta: Silk Tissue Printed Dupatta",
            "Trouser: Dyed Cotton Pants"
        ],
        rating: 5.0,
        reviewCount: 50,
        reviews: []
    }
];

// ============================================================================
// DYNAMIC PRODUCT CATALOG ENGINE (Merges base products with localStorage)
// ============================================================================

function getAllProducts() {
    try {
        const customProducts = JSON.parse(localStorage.getItem('daud_fabrics_custom_products') || '[]');
        const deletedIds     = JSON.parse(localStorage.getItem('daud_fabrics_deleted_product_ids') || '[]');
        
        // Filter out deleted base items
        const activeBase = baseProducts.filter(p => !deletedIds.includes(p.id));
        
        return [...customProducts, ...activeBase];
    } catch (e) {
        return baseProducts;
    }
}

function getProductById(idOrHandle) {
    if (!idOrHandle) return null;
    const all = getAllProducts();
    return all.find(p => p.id === idOrHandle || p.handle === idOrHandle) || null;
}

function getProductsByCategory(categoryName) {
    const all = getAllProducts();
    if (!categoryName || categoryName.toLowerCase() === 'all') return all;
    return all.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
}

function getRelatedProducts(currentProductId, limit = 4) {
    const all = getAllProducts();
    const current = getProductById(currentProductId);
    if (!current) return all.slice(0, limit);

    const sameCategory = all.filter(p => p.category === current.category && p.id !== current.id);
    if (sameCategory.length >= limit) {
        return sameCategory.slice(0, limit);
    }

    const otherProducts = all.filter(p => p.id !== current.id && !sameCategory.includes(p));
    return [...sameCategory, ...otherProducts].slice(0, limit);
}

function formatPrice(amount) {
    const num = Number(amount) || 0;
    return 'Rs. ' + num.toLocaleString('en-PK');
}

// ============================================================================
// ADMIN PRODUCT MANAGEMENT FUNCTIONS
// ============================================================================

/**
 * addProductByAdmin(newProductData)
 * Adds a new product object to the catalog via Admin Panel.
 */
function addProductByAdmin(prodData) {
    const customProducts = JSON.parse(localStorage.getItem('daud_fabrics_custom_products') || '[]');
    
    const newId = 'prod-' + Date.now();
    const handle = (prodData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const price  = Number(prodData.price) || 0;
    const oldPrice = prodData.oldPrice ? Number(prodData.oldPrice) : Math.round(price * 1.3);
    const discount = prodData.discount ? Number(prodData.discount) : Math.round(((oldPrice - price) / oldPrice) * 100);

    const newProd = {
        id: newId,
        name: prodData.name || 'New Daud Fabrics Suit',
        handle: handle,
        category: prodData.category || 'Gents',
        price: price,
        oldPrice: oldPrice,
        discount: discount > 0 ? discount : 20,
        image: prodData.image || 'images/gents_velvet_shawl.jpg',
        additionalImages: [prodData.image || 'images/gents_velvet_shawl.jpg'],
        description: prodData.description || 'Exclusive new arrival by Daud Fabrics. High quality material and premium finish.',
        details: prodData.details ? prodData.details.split('\n').filter(d => d.trim() !== '') : [
            `Category: ${prodData.category}`,
            "Quality: 100% Guaranteed Premium Fabric",
            "Condition: Unstitched Pack"
        ],
        rating: 5.0,
        reviewCount: 1,
        reviews: []
    };

    customProducts.unshift(newProd);
    localStorage.setItem('daud_fabrics_custom_products', JSON.stringify(customProducts));
    return newProd;
}

/**
 * deleteProductByAdmin(productId)
 * Removes a product from the catalog by ID.
 */
function deleteProductByAdmin(productId) {
    // If it's a custom product, remove from custom list
    let customProducts = JSON.parse(localStorage.getItem('daud_fabrics_custom_products') || '[]');
    const isCustom = customProducts.some(p => p.id === productId);

    if (isCustom) {
        customProducts = customProducts.filter(p => p.id !== productId);
        localStorage.setItem('daud_fabrics_custom_products', JSON.stringify(customProducts));
    } else {
        // Mark base product as deleted
        const deletedIds = JSON.parse(localStorage.getItem('daud_fabrics_deleted_product_ids') || '[]');
        if (!deletedIds.includes(productId)) {
            deletedIds.push(productId);
            localStorage.setItem('daud_fabrics_deleted_product_ids', JSON.stringify(deletedIds));
        }
    }
}

/**
 * resetCatalogToDefault()
 * Clears custom additions and deleted IDs to restore default factory catalog.
 */
function resetCatalogToDefault() {
    localStorage.removeItem('daud_fabrics_custom_products');
    localStorage.removeItem('daud_fabrics_deleted_product_ids');
}
