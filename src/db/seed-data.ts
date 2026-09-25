export interface InitialProduct {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  productType: 'DIGITAL' | 'POD' | 'PHYSICAL' | 'BUNDLE';
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  sku: string;
  basePrice: number; // in cents
  salePrice?: number;
  currency: string;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  rightsStatus: 'ORIGINAL' | 'LICENSED' | 'PUBLIC_DOMAIN' | 'UNREVIEWED' | 'REQUIRES_REVIEW' | 'REJECTED';
  licenseType: 'PERSONAL' | 'COMMERCIAL_SMALL' | 'COMMERCIAL_EXTENDED';
  tags: string[];
  specs: Record<string, unknown>;
  seoTitle?: string;
  metaDescription?: string;
  categorySlugs: string[];
  collectionSlugs: string[];
  images: {
    url: string;
    altText: string;
    imageRole: 'FEATURED' | 'GALLERY' | 'MOCKUP' | 'DETAIL';
    width: number;
    height: number;
  }[];
  digitalAssets?: {
    filename: string;
    fileType: string;
    fileSize: number;
    storageKey: string;
  }[];
  variants?: {
    sku: string;
    title: string;
    options: Record<string, string>;
    priceAdjustment: number;
    salePrice?: number;
    provider: 'INTERNAL' | 'PRINTIFY';
    providerCost: number;
  }[];
}

export const initialCategories = [
  {
    id: 'cat-wall-art',
    slug: 'printable-wall-art',
    title: 'Printable Wall Art',
    description: 'High-resolution downloadable artwork formatted in 5 aspect ratios ready for home or local professional printing.',
    image: '/images/categories/wall-art.jpg',
    sortOrder: 1,
    seoTitle: 'Printable Wall Art & Digital Posters | HS Digital Store',
    metaDescription: 'Shop instant printable wall art in 300 DPI high-resolution formats. Includes 2:3, 3:4, 4:5, ISO, and 11:14 print ratios.',
  },
  {
    id: 'cat-frame-tv',
    slug: 'frame-tv-art',
    title: 'Samsung Frame TV Art',
    description: 'Specially formatted 3840 x 2160 4K digital art sized perfectly to transform your Samsung Frame TV into a modern gallery.',
    image: '/images/categories/frame-tv.jpg',
    sortOrder: 2,
    seoTitle: 'Samsung Frame TV Art 4K Digital Downloads | HS Digital Store',
    metaDescription: 'Stunning 4K Samsung Frame TV art files (3840x2160). Instant download with step-by-step SmartThings setup instructions.',
  },
  {
    id: 'cat-clipart',
    slug: 'clipart-png',
    title: 'Clipart & PNG Bundles',
    description: 'Crisp 300 DPI transparent PNG bundles for graphic designers, crafters, card makers, and commercial creators.',
    image: '/images/categories/clipart.jpg',
    sortOrder: 3,
    seoTitle: 'Transparent PNG Clipart Bundles 300 DPI | HS Digital Store',
    metaDescription: 'Browse high-quality transparent PNG clipart packs and illustrations for planners, scrapbooking, and merchandise creation.',
  },
  {
    id: 'cat-sublimation',
    slug: 'sublimation-graphics',
    title: 'Sublimation Graphics',
    description: 'Vibrant, high-resolution sublimation transfer designs crafted for mugs, tumblers, apparel, and craft blanks.',
    image: '/images/categories/sublimation.jpg',
    sortOrder: 4,
    seoTitle: 'Sublimation Designs & Tumbler Wrap PNGs | HS Digital Store',
    metaDescription: 'Download premium sublimation graphics and wraps ready for heat press transfers on tumblers, shirts, and mugs.',
  },
  {
    id: 'cat-planners',
    slug: 'planners-productivity',
    title: 'Planners & Productivity',
    description: 'Functional digital planners and printable organizers compatible with GoodNotes, Notability, or standard home printing.',
    image: '/images/categories/planners.jpg',
    sortOrder: 5,
    seoTitle: 'Digital Planners & Printable Organizers | HS Digital Store',
    metaDescription: 'Stay organized with hyperlinked GoodNotes digital planners and printable daily, weekly, and budget worksheets.',
  },
  {
    id: 'cat-kids',
    slug: 'kids-toddler-activities',
    title: 'Kids & Toddler Activities',
    description: 'Educational learning binders, tracing worksheets, animal coloring pages, and homeschool activities for toddlers and preschoolers.',
    image: '/images/categories/kids.jpg',
    sortOrder: 6,
    seoTitle: 'Printable Kids Activities & Toddler Learning Sheets | HS Digital Store',
    metaDescription: 'Montessori-inspired toddler learning binders, alphabet tracing sheets, and interactive homeschool printables.',
  },
  {
    id: 'cat-anime',
    slug: 'original-anime-manga-art',
    title: 'Original Anime & Manga Art',
    description: 'Authentic, original character artwork and cyberpunk cityscapes created in Japanese anime and manga aesthetics.',
    image: '/images/categories/anime.jpg',
    sortOrder: 7,
    seoTitle: 'Original Anime & Manga Art Prints | HS Digital Store',
    metaDescription: 'Shop exclusive original anime-inspired digital prints and cyberpunk illustrations. 100% original artwork.',
  },
  {
    id: 'cat-pod',
    slug: 'print-on-demand',
    title: 'Print-on-Demand Physical Products',
    description: 'Museum-quality archival posters, framed canvases, and ceramic mugs produced and shipped directly to your door.',
    image: '/images/categories/pod.jpg',
    sortOrder: 8,
    seoTitle: 'Physical Wall Art Prints & Framed Posters | HS Digital Store',
    metaDescription: 'Order museum-grade physical posters and framed wall art printed on archival paper with fast U.S. delivery.',
  },
  {
    id: 'cat-bundles',
    slug: 'digital-bundles',
    title: 'Digital Bundles & Value Packs',
    description: 'Curated value bundles grouping multiple popular prints, clipart sets, and seasonal templates at discounted package rates.',
    image: '/images/categories/bundles.jpg',
    sortOrder: 9,
    seoTitle: 'Digital Download Bundles & Wall Art Sets | HS Digital Store',
    metaDescription: 'Save up to 60% with curated digital art bundles, complete gallery wall sets, and mega clipart collections.',
  },
];

export const initialCollections = [
  {
    id: 'col-cyberpunk',
    slug: 'cyberpunk-collection',
    title: 'Cyberpunk & Neo-Tokyo',
    description: 'Vibrant neon rain, futuristic cityscapes, and mechanical anime artwork.',
    featured: true,
  },
  {
    id: 'col-botanical',
    slug: 'botanical-minimalist',
    title: 'Botanical & Organic Minimalist',
    description: 'Calming earth tones, line art eucalyptus, and modern boho gallery wall prints.',
    featured: true,
  },
  {
    id: 'col-seasonal',
    slug: 'seasonal-autumn-holiday',
    title: 'Seasonal & Holiday Magic',
    description: 'Festive autumn pumpkins, cozy winter hearths, and cheerful holiday decorations.',
    featured: true,
  },
  {
    id: 'col-pride',
    slug: 'pride-celebration',
    title: 'Pride & Equality',
    description: 'Geometric rainbow wall art, vibrant pride statements, and inclusive graphics.',
    featured: true,
  },
  {
    id: 'col-best-sellers',
    slug: 'best-sellers',
    title: 'Store Best Sellers',
    description: 'Our most loved and highest rated creative downloads across all categories.',
    featured: true,
  },
];

export const initialProducts: InitialProduct[] = [
  {
    id: 'prod-001',
    slug: 'neo-tokyo-cyber-samurai-printable-art',
    title: 'Neo-Tokyo Cyber Samurai — Original Anime Wall Art',
    shortDescription: 'Original cyberpunk warrior character design under atmospheric neon rain. Includes 5 high-resolution 300 DPI print ratios.',
    description: `Immerse your space in the electric atmosphere of Neo-Tokyo with this original Cyber Samurai printable wall art. Rendered with cinematic neon lighting, intricate mechanical armor, and atmospheric rain reflection, this original piece is designed for fans of modern cyberpunk aesthetics and Japanese manga styling.

### What You Receive
Upon purchase, you immediately receive access to 5 ultra high-resolution (300 DPI) JPG files and a comprehensive printing guide:
- **2:3 Ratio:** Prints up to 24x36 in (60x90 cm)
- **3:4 Ratio:** Prints up to 18x24 in (45x60 cm)
- **4:5 Ratio:** Prints up to 16x20 in (40x50 cm)
- **ISO Ratio:** Prints A1, A2, A3, A4, A5
- **11:14 Ratio:** Prints 11x14 in (28x35 cm)
- **Bonus:** Printing instructions & paper recommendations PDF

### Important Notes
- **Instant Digital Download:** No physical item will be shipped.
- **Color Disclaimer:** Colors may vary slightly due to monitor calibration and printer profiles.
- **License:** Personal use only. Commercial redistribution or resale of raw source files is strictly prohibited.`,
    productType: 'DIGITAL',
    status: 'PUBLISHED',
    sku: 'HSD-ART-001',
    basePrice: 799, // $7.99
    salePrice: 599, // $5.99 on sale
    currency: 'USD',
    featured: true,
    newArrival: false,
    bestSeller: true,
    rightsStatus: 'ORIGINAL',
    licenseType: 'PERSONAL',
    tags: ['anime wall art', 'cyberpunk poster', 'neo tokyo', 'printable art', 'japanese artwork', 'digital download'],
    specs: {
      dpi: 300,
      ratios: ['2:3', '3:4', '4:5', 'ISO', '11:14'],
      formats: ['JPG', 'PDF'],
      colorProfile: 'sRGB',
      recommendedPaper: 'Archival Matte 230gsm or Satin Luster',
    },
    categorySlugs: ['printable-wall-art', 'original-anime-manga-art'],
    collectionSlugs: ['cyberpunk-collection', 'best-sellers'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
        altText: 'Neo-Tokyo Cyber Samurai original anime wall art displayed in a modern frame',
        imageRole: 'FEATURED',
        width: 1200,
        height: 1200,
      },
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
        altText: 'Close up detail of cyberpunk armor and neon reflections',
        imageRole: 'DETAIL',
        width: 1200,
        height: 1200,
      },
    ],
    digitalAssets: [
      {
        filename: 'NeoTokyo_Samurai_2x3_Ratio_300DPI.zip',
        fileType: 'ZIP',
        fileSize: 42100000,
        storageKey: 'assets/prod-001/2x3.zip',
      },
      {
        filename: 'NeoTokyo_Samurai_3x4_Ratio_300DPI.zip',
        fileType: 'ZIP',
        fileSize: 36500000,
        storageKey: 'assets/prod-001/3x4.zip',
      },
      {
        filename: 'NeoTokyo_Samurai_4x5_Ratio_300DPI.zip',
        fileType: 'ZIP',
        fileSize: 31200000,
        storageKey: 'assets/prod-001/4x5.zip',
      },
      {
        filename: 'HSDigitalStore_Printing_Instructions.pdf',
        fileType: 'PDF',
        fileSize: 1450000,
        storageKey: 'assets/shared/printing_guide.pdf',
      },
    ],
  },
  {
    id: 'prod-002',
    slug: 'vintage-oil-landscape-samsung-frame-tv-art',
    title: 'Vintage Moody Landscape — Samsung Frame TV Art 4K',
    shortDescription: 'Classic oil painting landscape formatted at 3840 x 2160 (16:9) 4K for Samsung Frame TV and smart screens.',
    description: `Transform your living room into an art gallery with this moody vintage oil landscape designed specifically for Samsung Frame TV. Color-graded and digitally enhanced to look like genuine oil brushwork on canvas.

### What You Receive
- 1 ultra high-definition JPG file sized exactly 3840 x 2160 pixels at 300 DPI.
- Step-by-step visual PDF guide on uploading via Samsung SmartThings App and setting matting options.

### Compatibility
- Fits all Samsung Frame TV sizes (32", 43", 50", 55", 65", 75", 85")
- Also compatible with any 16:9 4K television or digital photo frame.`,
    productType: 'DIGITAL',
    status: 'PUBLISHED',
    sku: 'HSD-TV-002',
    basePrice: 599, // $5.99
    currency: 'USD',
    featured: true,
    newArrival: false,
    bestSeller: true,
    rightsStatus: 'ORIGINAL',
    licenseType: 'PERSONAL',
    tags: ['samsung frame tv art', '4k tv art', 'vintage landscape', 'smart tv wallpaper', 'moody oil painting'],
    specs: {
      resolution: '3840 x 2160 px',
      ratio: '16:9',
      dpi: 300,
      format: 'JPG',
    },
    categorySlugs: ['frame-tv-art'],
    collectionSlugs: ['best-sellers'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
        altText: 'Samsung Frame TV mounted above fireplace displaying vintage oil landscape art',
        imageRole: 'FEATURED',
        width: 1200,
        height: 1200,
      },
    ],
    digitalAssets: [
      {
        filename: 'Vintage_Landscape_FrameTV_3840x2160.jpg',
        fileType: 'JPG',
        fileSize: 8400000,
        storageKey: 'assets/prod-002/frametv_4k.jpg',
      },
      {
        filename: 'Samsung_SmartThings_Setup_Guide.pdf',
        fileType: 'PDF',
        fileSize: 1100000,
        storageKey: 'assets/shared/frametv_guide.pdf',
      },
    ],
  },
  {
    id: 'prod-003',
    slug: 'kawaii-pastel-sweets-clipart-png-bundle',
    title: '50+ Kawaii Pastel Sweets Clipart Bundle — 300 DPI PNG',
    shortDescription: 'Over 50 hand-crafted cute bakery treats, boba drinks, and mochi with transparent backgrounds for crafts and planners.',
    description: `Sweeten your creative projects with this charming bundle of 50+ pastel kawaii sweets and drinks! Every graphic is isolated with crisp transparent edges and high-resolution 300 DPI detail.

### What is Included
- 52 Individual Transparent PNG files (approx. 3000 x 3000 px each)
- Boba milk teas, taiyaki cones, macaron stacks, strawberry shortcake, matcha parfait, and cute mochi
- Small Commercial License included (up to 500 physical end products)
- Compatible with Canva, Procreate, Photoshop, Illustrator, Silhouette, and Cricut.`,
    productType: 'DIGITAL',
    status: 'PUBLISHED',
    sku: 'HSD-PNG-003',
    basePrice: 999, // $9.99
    salePrice: 699, // $6.99
    currency: 'USD',
    featured: true,
    newArrival: true,
    bestSeller: false,
    rightsStatus: 'ORIGINAL',
    licenseType: 'COMMERCIAL_SMALL',
    tags: ['kawaii clipart', 'transparent png', 'pastel sweets', 'boba tea clipart', 'planner stickers', 'cricut graphics'],
    specs: {
      itemsCount: 52,
      dpi: 300,
      format: 'PNG',
      transparent: true,
      license: 'Small Commercial (500 units)',
    },
    categorySlugs: ['clipart-png'],
    collectionSlugs: [],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&auto=format&fit=crop&q=80',
        altText: 'Preview collage of pastel kawaii treats and boba illustrations',
        imageRole: 'FEATURED',
        width: 1200,
        height: 1200,
      },
    ],
    digitalAssets: [
      {
        filename: 'Kawaii_Sweets_Part1_PNG.zip',
        fileType: 'ZIP',
        fileSize: 68000000,
        storageKey: 'assets/prod-003/part1.zip',
      },
      {
        filename: 'Kawaii_Sweets_Part2_PNG.zip',
        fileType: 'ZIP',
        fileSize: 74000000,
        storageKey: 'assets/prod-003/part2.zip',
      },
    ],
  },
  {
    id: 'prod-004',
    slug: 'botanical-eucalyptus-trio-printable-wall-art',
    title: 'Minimalist Botanical Eucalyptus Trio — Set of 3 Prints',
    shortDescription: 'Clean organic line art eucalyptus leaves in warm earthy sage and beige tones. Perfect for Scandinavian or modern boho rooms.',
    description: `A harmonious set of three minimalist botanical eucalyptus wall art prints. Designed to bring organic tranquility and understated modern luxury into bedrooms, living rooms, and nursery spaces.

### Set of 3 Prints
Each print is provided in 5 proportional ratios (15 high-res files total):
- Print 01: Minimalist Olive Branch
- Print 02: Eucalyptus Fan
- Print 03: Wild Meadow Frond`,
    productType: 'DIGITAL',
    status: 'PUBLISHED',
    sku: 'HSD-ART-004',
    basePrice: 1199, // $11.99
    currency: 'USD',
    featured: true,
    newArrival: false,
    bestSeller: true,
    rightsStatus: 'ORIGINAL',
    licenseType: 'PERSONAL',
    tags: ['botanical prints', 'set of 3 prints', 'eucalyptus art', 'sage green wall art', 'scandi wall art'],
    specs: {
      dpi: 300,
      printCount: 3,
      ratios: ['2:3', '3:4', '4:5', 'ISO', '11:14'],
      formats: ['JPG', 'PDF'],
    },
    categorySlugs: ['printable-wall-art', 'digital-bundles'],
    collectionSlugs: ['botanical-minimalist', 'best-sellers'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80',
        altText: 'Set of 3 botanical eucalyptus prints hanging above a beige linen sofa',
        imageRole: 'FEATURED',
        width: 1200,
        height: 1200,
      },
    ],
    digitalAssets: [
      {
        filename: 'Botanical_Trio_All_Ratios.zip',
        fileType: 'ZIP',
        fileSize: 89000000,
        storageKey: 'assets/prod-004/botanical_bundle.zip',
      },
    ],
  },
  {
    id: 'prod-005',
    slug: 'toddler-learning-binder-45-page-activity-pack',
    title: 'Toddler Learning Busy Book — 45-Page Interactive Printable',
    shortDescription: 'Montessori-inspired preschool learning binder with matching games, alphabet tracing, colors, counting, and weather charts.',
    description: `Engage toddlers and preschoolers with this comprehensive 45-page hands-on learning binder! Designed by early childhood education enthusiasts to develop fine motor skills, recognition, and phonics through fun visual matching.

### 45 Interactive Activity Pages
- Alphabet recognition & Animal matching (A to Z)
- Number counting (1 to 20) with colorful fruits
- Color wheel & Shape sorter
- Weather chart & Daily calendar
- Dressing for the seasons
- Farm animal habitat sorting
- Includes cutting cut-outs and easy assembly instructions.`,
    productType: 'DIGITAL',
    status: 'PUBLISHED',
    sku: 'HSD-KID-005',
    basePrice: 1299, // $12.99
    salePrice: 899, // $8.99
    currency: 'USD',
    featured: false,
    newArrival: true,
    bestSeller: true,
    rightsStatus: 'ORIGINAL',
    licenseType: 'PERSONAL',
    tags: ['toddler learning binder', 'busy book printable', 'homeschool preschool', 'montessori activities', 'alphabet tracing'],
    specs: {
      pageCount: 45,
      paperSizes: ['US Letter (8.5x11 in)', 'A4'],
      format: 'PDF',
      recommendation: 'Laminate and use Velcro dots for years of reusable play',
    },
    categorySlugs: ['kids-toddler-activities'],
    collectionSlugs: ['best-sellers'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&auto=format&fit=crop&q=80',
        altText: 'Toddler learning binder pages arranged with colorful matching cards',
        imageRole: 'FEATURED',
        width: 1200,
        height: 1200,
      },
    ],
    digitalAssets: [
      {
        filename: 'Toddler_Busy_Book_US_Letter.pdf',
        fileType: 'PDF',
        fileSize: 45200000,
        storageKey: 'assets/prod-005/busy_book_letter.pdf',
      },
      {
        filename: 'Toddler_Busy_Book_A4.pdf',
        fileType: 'PDF',
        fileSize: 44800000,
        storageKey: 'assets/prod-005/busy_book_a4.pdf',
      },
    ],
  },
  {
    id: 'prod-006',
    slug: 'neo-tokyo-cyber-samurai-museum-poster',
    title: 'Neo-Tokyo Cyber Samurai — Museum-Quality Archival Poster',
    shortDescription: 'Physically printed on thick 250 gsm / 110 lb archival matte paper with fade-resistant pigment inks. Ships worldwide in protective tube.',
    description: `Prefer to have our original artwork professionally printed and delivered to your doorstep? This physical museum-grade poster showcases our Neo-Tokyo Cyber Samurai design with brilliant color depth and velvety matte finish.

### Physical Product Details
- **Paper:** Heavyweight 250 gsm / 110 lb museum-quality archival paper
- **Printing:** Giclée pigment inks with 100+ year color permanence
- **Finish:** Glare-free smooth matte finish
- **Packaging:** Shipped securely in sturdy kraft mailing tubes
- **Fulfillment:** Printed to order within 2-4 business days.`,
    productType: 'POD',
    status: 'PUBLISHED',
    sku: 'HSD-POD-006',
    basePrice: 2800, // $28.00 base for 12x18
    currency: 'USD',
    featured: true,
    newArrival: false,
    bestSeller: false,
    rightsStatus: 'ORIGINAL',
    licenseType: 'PERSONAL',
    tags: ['physical poster', 'print on demand art', 'anime poster print', 'museum paper', 'cyberpunk wall decor'],
    specs: {
      paperWeight: '250 gsm (110 lb)',
      printingTechnique: 'Giclée Pigment',
      finish: 'Smooth Matte',
      shippingOrigin: 'United States',
      productionTime: '2-4 business days',
    },
    categorySlugs: ['print-on-demand', 'original-anime-manga-art'],
    collectionSlugs: ['cyberpunk-collection'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=1200&auto=format&fit=crop&q=80',
        altText: 'Museum quality matte print of Cyber Samurai mounted in a sleek modern room',
        imageRole: 'FEATURED',
        width: 1200,
        height: 1200,
      },
    ],
    variants: [
      {
        sku: 'HSD-POD-006-12X18',
        title: '12 x 18 inches (30 x 45 cm)',
        options: { size: '12x18 in' },
        priceAdjustment: 0,
        provider: 'PRINTIFY',
        providerCost: 1150,
      },
      {
        sku: 'HSD-POD-006-18X24',
        title: '18 x 24 inches (45 x 60 cm)',
        options: { size: '18x24 in' },
        priceAdjustment: 800, // $36.00 total
        provider: 'PRINTIFY',
        providerCost: 1520,
      },
      {
        sku: 'HSD-POD-006-24X36',
        title: '24 x 36 inches (60 x 90 cm)',
        options: { size: '24x36 in' },
        priceAdjustment: 1600, // $44.00 total
        provider: 'PRINTIFY',
        providerCost: 2040,
      },
    ],
  },
  {
    id: 'prod-007',
    slug: 'rainbow-pride-geometric-heart-digital-art',
    title: 'Rainbow Pride Geometric Heart — Printable Wall Art',
    shortDescription: 'Modern geometric prism heart incorporating vibrant inclusive pride colors. Instant digital download in 5 print ratios.',
    description: `Celebrate love and diversity with this contemporary geometric prism heart. Clean vector gradients meet bold modern composition, making it a proud focal point in living rooms, dorm rooms, or creative offices.

### What You Receive
- 5 high-resolution 300 DPI JPG files supporting standard frame sizes up to 24x36 inches.
- Instant digital delivery straight to your account and email.`,
    productType: 'DIGITAL',
    status: 'PUBLISHED',
    sku: 'HSD-PRIDE-007',
    basePrice: 699, // $6.99
    currency: 'USD',
    featured: false,
    newArrival: false,
    bestSeller: false,
    rightsStatus: 'ORIGINAL',
    licenseType: 'PERSONAL',
    tags: ['pride wall art', 'geometric heart', 'rainbow poster', 'lgbtq decor', 'inclusive artwork'],
    specs: {
      dpi: 300,
      ratios: ['2:3', '3:4', '4:5', 'ISO', '11:14'],
      formats: ['JPG', 'PDF'],
    },
    categorySlugs: ['printable-wall-art'],
    collectionSlugs: ['pride-celebration'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80',
        altText: 'Geometric rainbow heart print in a white wooden frame',
        imageRole: 'FEATURED',
        width: 1200,
        height: 1200,
      },
    ],
    digitalAssets: [
      {
        filename: 'Pride_Geometric_Heart_Print_Files.zip',
        fileType: 'ZIP',
        fileSize: 32000000,
        storageKey: 'assets/prod-007/pride_files.zip',
      },
    ],
  },
  {
    id: 'prod-008',
    slug: 'ultimate-mega-art-bundle-100-prints',
    title: 'The Ultimate Studio Mega Bundle — 100+ Best-Selling Prints',
    shortDescription: 'Our entire signature catalog in one massive value collection. Includes anime, botanical, abstract, and Scandinavian series.',
    description: `The definitive collection for interior decorators, Airbnb hosts, and gallery wall creators. Over 100 distinctive, original art prints packaged with full printing entitlements in 5 aspect ratios.

### What You Save
Individual prints valued at over $700 if purchased separately. Get the entire curated vault with instant unlimited lifetime download access!`,
    productType: 'BUNDLE',
    status: 'PUBLISHED',
    sku: 'HSD-BUN-008',
    basePrice: 4999, // $49.99
    salePrice: 3499, // $34.99
    currency: 'USD',
    featured: true,
    newArrival: true,
    bestSeller: true,
    rightsStatus: 'ORIGINAL',
    licenseType: 'COMMERCIAL_SMALL',
    tags: ['mega art bundle', '100 prints bundle', 'gallery wall collection', 'digital download pack', 'printable art set'],
    specs: {
      totalArtworks: 105,
      ratiosPerArt: 5,
      dpi: 300,
      license: 'Small Commercial (500 units)',
    },
    categorySlugs: ['digital-bundles', 'printable-wall-art'],
    collectionSlugs: ['best-sellers'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80',
        altText: 'Vast gallery wall mockup showing diverse prints from the Mega Bundle',
        imageRole: 'FEATURED',
        width: 1200,
        height: 1200,
      },
    ],
    digitalAssets: [
      {
        filename: 'Mega_Bundle_Access_Vault.pdf',
        fileType: 'PDF',
        fileSize: 5200000,
        storageKey: 'assets/prod-008/vault_access.pdf',
      },
    ],
  },
];

export const initialBlogPosts = [
  {
    slug: 'how-to-print-digital-wall-art-complete-guide',
    title: 'How to Print Digital Wall Art: The Ultimate Guide for Beginners',
    excerpt: 'Everything you need to know about aspect ratios, paper weights, fine-art giclée printing, and where to print your downloads locally or online.',
    category: 'Printable Art',
    tags: ['printing guide', 'paper types', 'aspect ratios', 'wall art tips'],
    author: 'HS Digital Store Creative Team',
    publishedAt: new Date('2026-08-15'),
    featuredImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80',
    body: `So you’ve purchased a stunning digital art download—what next? Printing your own wall art is not only cost-effective; it gives you total control over the finish, framing, and scale of your home décor. In this comprehensive guide, we walk you through aspect ratios, choosing the right paper, and our favorite online and local printing labs.

## 1. Understanding Aspect Ratios
When you download art from **HS Digital Store**, your purchase includes multiple files sized to standard photographic ratios:
- **2:3 Ratio:** Standard 35mm photo ratio. Perfect for 4x6, 8x12, 12x18, 16x24, 20x30, and 24x36 inches.
- **3:4 Ratio:** Common frame format. Sized for 6x8, 9x12, 12x16, 15x20, and 18x24 inches.
- **4:5 Ratio:** Classic gallery standard. Fits 4x5, 8x10, 12x15, and 16x20 inches.
- **ISO (International Standard):** A5, A4, A3, A2, A1 sizing for European and international frames.
- **11:14 Ratio:** Specifically tailored for popular 11x14 inch frames.

## 2. Best Paper Types for Wall Art
The secret to museum-looking wall art is paper weight and finish:
- **Weight:** Always aim for at least **200 to 250 gsm (80–100 lb)** paper. Lightweight copy paper will buckle under ink and reflect glare.
- **Matte Fine Art Paper:** Our #1 recommendation. Glare-free, rich black density, and sophisticated texture.
- **Satin / Luster Paper:** Slight pearl sheen with outstanding color vibrancy—ideal for high-saturation anime and neon artwork.

## 3. Where to Print
- **Local Print Shops:** Support local print houses or visit Walgreens, FedEx Office, or Staples for same-day prints.
- **Online Fine Art Labs:** For true archival giclée prints, services like FinerWorks, Mpix, and Gelato offer breathtaking pigment quality.`,
  },
  {
    slug: 'samsung-frame-tv-art-setup-guide',
    title: 'How to Display Digital Art on Your Samsung Frame TV in 4K',
    excerpt: 'Step-by-step instructions on transferring 3840 x 2160 images to your Samsung Frame TV using the SmartThings app, adjusting brightness, and selecting realistic matte frames.',
    category: 'Frame TV Art',
    tags: ['samsung frame tv', '4k tv art', 'smartthings', 'tv decor'],
    author: 'HS Digital Store Creative Team',
    publishedAt: new Date('2026-08-20'),
    featuredImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
    body: `The Samsung Frame TV is a revolution in interior aesthetics—disguising an entertainment screen as a custom framed masterpiece. Here is how to achieve the most lifelike canvas appearance with your HS Digital Store 4K art downloads.

## 1. Verify File Dimensions
The Samsung Frame TV requires exact **3840 x 2160 pixels (16:9 ratio)**. All Frame TV downloads from HS Digital Store come precisely pre-cropped and optimized to avoid awkward letterboxing or pixel distortion.

## 2. Upload via Samsung SmartThings App
1. Download and open the **SmartThings** mobile app on your iPhone or Android.
2. Select your **Samsung Frame TV** device.
3. Tap **Art Mode** -> **Add Your Photos+**.
4. Select the downloaded 4K image from your phone's photo roll.
5. Tap **Save on The Frame**.

## 3. Pro Tips for Realistic Canvas Looks
- **Choose "No Mat" or "Shadow Box":** A delicate shadow box matting adds believable depth.
- **Adjust TV Brightness:** Lower the Art Mode brightness to match the natural ambient lighting of your room so the screen doesn't glow artificially at night.
- **Enable Night Mode:** This automatically puts the display into low-power sleep when lights are turned off.`,
  },
  {
    slug: 'sublimation-vs-printable-png-dpi-explained',
    title: 'Sublimation vs Clipart: What Does 300 DPI Really Mean?',
    excerpt: 'Demystifying graphic resolutions, color profiles (sRGB vs CMYK), and why 300 DPI is the non-negotiable benchmark for physical merchandise printing.',
    category: 'Sublimation',
    tags: ['sublimation', '300 dpi', 'transparent png', 'cricut'],
    author: 'HS Digital Store Creative Team',
    publishedAt: new Date('2026-08-28'),
    featuredImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&auto=format&fit=crop&q=80',
    body: `If you have ever printed a design on a t-shirt or tumbler only to have it turn out blurry, pixelated, or dull, resolution is almost certainly the culprit. In this guide, we break down what 300 DPI means and why all HS Digital Store creative assets are meticulously crafted at 300 DPI.

## What is DPI?
DPI stands for **Dots Per Inch**. In physical printing, it represents how many microscopic ink dots the printhead places along a single linear inch.
- **72 DPI:** Standard web/screen resolution. Looks great on phones and monitors, but turns fuzzy and jagged when printed on paper or mugs.
- **300 DPI:** The gold standard for commercial and fine art printing. At 300 DPI, individual dots blend seamlessly into sharp, continuous photographic detail.

## Why Transparent PNGs are Essential
When crafting custom tumbler wraps or DTF heat transfers, you need transparent backgrounds rather than white boxes. Our clipart bundles are rendered with clean alpha channels that allow your base shirt or ceramic color to show through cleanly.`,
  },
];
