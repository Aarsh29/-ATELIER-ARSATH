import { CollectionItem, FabricItem, CraftStep, ClientStory, JournalArticle } from '../types';

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'kalyanam-bridal',
    number: '01',
    title: 'THE KALYANAM COUTURE',
    subtitle: 'Sacred Threads & Architectural Zari',
    category: 'bridal',
    description: 'Conceived for the modern South Asian bride who honors ancestral craft. Pure mulberry silks hand-embroidered with beaten gold micro-zari, recreating temple relief sculptures with whisper-soft weightlessness.',
    details: [
      'Over 420 artisan-hours of needlework',
      '24k dipped pure silver-gilt zari wefts',
      'Contoured inner corsetry for seamless all-day regal posture',
      'Bespoke hand-embroidered wedding dates concealed in the border'
    ],
    silhouette: 'Sculptural Pleated Lehenga & Pavadai Drape',
    craft: 'Kanchipuram Double Warp × Nakshi Aari',
    leadTime: '8 to 14 weeks',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546804784-896d0dca3805?q=80&w=1200&auto=format&fit=crop'
    ],
    accentColor: '#C5A880',
    quote: 'A bridal garment should not conceal the woman; it should amplify her quiet royalty.'
  },
  {
    id: 'architectural-blouse',
    number: '02',
    title: 'THE ARCHITECTURAL BLOUSE',
    subtitle: 'Precision Tailoring × Aari Geometry',
    category: 'blouses',
    description: 'Moving far beyond ornamentation, our blouses are engineered like architectural silhouettes. Back cut-outs inspired by Dravidian temple gopuram geometry, micro-pearl tassels, and ergonomically balanced armholes that never pinch.',
    details: [
      'French seam finishes with interior Japanese silk lining',
      'Zero-tension shoulder engineering to anchor heavy pattu sarees',
      'Fine micro-aari needlework with matte antique kardana glass beads',
      'Signature hand-forged antique gold hook clasps'
    ],
    silhouette: 'Deep Sculpted Keyhole & Square Column',
    craft: 'Zardozi × Tambour French Knotting',
    leadTime: '3 to 5 weeks',
    heroImage: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1600&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop'
    ],
    accentColor: '#A88D65',
    quote: 'The blouse is the backbone of the saree; it carries the weight of memory and elegance.'
  },
  {
    id: 'kanchipuram-heirloom',
    number: '03',
    title: 'THE HEIRLOOM KANCHIPURAM',
    subtitle: 'Mulberry Silks of Undiminished Gravity',
    category: 'sarees',
    description: 'Woven on heritage pit-looms in the temple town of Kanchipuram. Featuring Korvai interlocking borders where body and pallu meet through hand-tied warp joins, untouched by automated power-looms.',
    details: [
      'Heavy 3-ply twisted mulberry raw filament silk',
      'Authentic Korvai temple petni joint craftsmanship',
      'Bespoke shades: Sandalwood Taupe, Madder Crimson, Obsidian Green',
      'Numbered atelier certificate of loom provenance'
    ],
    silhouette: 'Classic 9-yard and 6-yard Fluid Drape',
    craft: 'Pit-Loom Korvai Weaving',
    leadTime: '6 to 10 weeks',
    heroImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1600&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop'
    ],
    accentColor: '#8C6D46',
    quote: 'When you fold a pure handloom silk, you hear the breath of the weaver.'
  },
  {
    id: 'sangeet-reception',
    number: '04',
    title: 'THE NOCTURNE RECEPTION',
    subtitle: 'Fluid Organza & Starlight Tissue',
    category: 'reception',
    description: 'Designed for the evening crescendo. Weightless tissue silks that catch ambient ballroom chandeliers, paired with trail capes that whisper with every step on the dance floor.',
    details: [
      'Metallic spun tissue organza woven with real champagne filaments',
      'Fluted column skirts that move like liquid metal',
      'Hand-sewn Swarovski crystal micro-droplets on tone-on-tone netting',
      'Featherweight structural bustier with invisible support'
    ],
    silhouette: 'Draped Column Gown with Sheer Dupatta Trail',
    craft: 'Metallic Weft Infusion × Crystal Pavé',
    leadTime: '6 to 8 weeks',
    heroImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1600&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop'
    ],
    accentColor: '#D1BC9A',
    quote: 'Evening couture is poetry written in moonlight and movement.'
  },
  {
    id: 'aari-tapestry',
    number: '05',
    title: 'THE AARI MASTERWORKS',
    subtitle: 'Single-Thread Heritage Needlework',
    category: 'aari',
    description: 'Aari is not mere surface decoration; it is an unbroken meditation of needle and frame. Master craftsmen spend weeks pulling taut silk thread through stretched frames to achieve three-dimensional relief.',
    details: [
      'Tambour needle micro-chain stitches measuring 0.5mm each',
      'Custom dyed untwisted silk floss for velvety tactile luster',
      'Gilded floral arabesques inspired by 17th century Tanjore frescoes',
      'Signature signature seal engraved onto the internal hem'
    ],
    silhouette: 'Statement Blouse & Couture Cape',
    craft: 'Tanjore Heritage Aari Needlework',
    leadTime: '5 to 9 weeks',
    heroImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1600&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop'
    ],
    accentColor: '#BCA177',
    quote: 'A machine can simulate density; only human hands can weave vulnerability.'
  },
  {
    id: 'atelier-miniature',
    number: '06',
    title: 'LES PETITES / COUTURE KIDS',
    subtitle: 'Ceremonial Elegance for Young Heirs',
    category: 'kids',
    description: 'Couture crafted with the tenderest sensibilities. Organic silk pattu pavadais and miniature sherwanis lined in hypoallergenic natural mulmul so children celebrate without constraint.',
    details: [
      '100% natural Mulberry silk exterior with certified organic cotton lining',
      'Zero scratchy metallic threads on skin contact areas',
      'Expandable modular hidden seams allowing 2 growth seasons',
      'Hand-knotted tassel ties in pure dyed cotton'
    ],
    silhouette: 'Traditional Pattu Pavadai & Angavastram Set',
    craft: 'Feather-touch Handloom Weave',
    leadTime: '2 to 4 weeks',
    heroImage: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1600&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop'
    ],
    accentColor: '#C0A381',
    quote: 'Passing the love for authentic craft starts in the first celebration.'
  }
];

export const FABRICS: FabricItem[] = [
  {
    id: 'kanchipuram-silk',
    name: 'Kanchipuram Silk',
    tamilName: 'காஞ்சிபுரம் பட்டு',
    origin: 'Kanchipuram, Tamil Nadu',
    description: 'Woven from three single threads of silk yarn twisted with the finest silver wire. Known for its ceremonial heft, natural luster, and extraordinary durability spanning generations.',
    tactileFeel: 'Crisp structural glide with substantial comforting drape',
    composition: '100% Pure Mulberry Silk × Real Gold-Silver Interlaced Zari',
    recommendedFor: ['Bridal Muhurtham Sarees', 'Ceremonial Pavadais', 'Structured Statement Blouses'],
    textureImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    drapeWeight: 'Sculptural Heavy'
  },
  {
    id: 'banarasi-katan',
    name: 'Banarasi Katan Silk',
    origin: 'Varanasi, Uttar Pradesh',
    description: 'Prepared by twisting multiple silk filaments together to create a smooth, dense, tactile surface that holds complex floral brocades and kadwa hunting motifs.',
    tactileFeel: 'Supple, rich, cool-to-touch surface with velvet-soft fold memory',
    composition: 'Pure Mulberry Katan Silk with Gold Kardana Wefts',
    recommendedFor: ['Grand Sangeet Lehengas', 'Heirloom Shawls', 'Evening Blouses'],
    textureImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    drapeWeight: 'Sculptural Heavy'
  },
  {
    id: 'tissue-organza',
    name: 'Gilded Tissue Organza',
    origin: 'Chanderi & Surat Weaving Clusters',
    description: 'An ethereal gossamer weave interlaced with ultra-fine metallic yarn. Catches golden hour daylight and evening candlelight with holographic depth.',
    tactileFeel: 'Whisper-light, crisp airy volume that floats around the body',
    composition: '60% Fine Mulberry Silk, 40% Gilded Metallised Filament',
    recommendedFor: ['Contemporary Reception Drapes', 'Dupattas', 'Fluid Capes'],
    textureImage: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?q=80&w=1000&auto=format&fit=crop',
    drapeWeight: 'Whisper-light'
  },
  {
    id: 'vintage-velvet',
    name: 'Silk Micro-Velvet',
    origin: 'Heritage Weaving Mills, Kashmir',
    description: 'A densely piled, plush textile with deep light-absorbing characteristics, providing the perfect dark theatrical ground for antique zardozi and pearl embroidery.',
    tactileFeel: 'Warm, deeply cushioned, opulent touch with dramatic shadows',
    composition: 'Silk Pile on Pure Cotton Canvas Ground',
    recommendedFor: ['Winter Wedding Blouses', 'Bespoke Jackets', 'Statement Borders'],
    textureImage: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1000&auto=format&fit=crop',
    drapeWeight: 'Medium Lustrous'
  },
  {
    id: 'raw-matka',
    name: 'Bengal Matka Raw Silk',
    origin: 'Malda, West Bengal',
    description: 'Spun from mulberry cocoons with natural slubs and organic texture. Its matte, imperfect finish embodies the Japanese wabi-sabi philosophy blended with Indian loom culture.',
    tactileFeel: 'Textured, earthy, breathable, holds dramatic geometric shapes',
    composition: '100% Hand-Spun Pierced Mulberry Silk',
    recommendedFor: ['Daytime Haldi & Mehendi Ensembles', 'Minimalist Blouses', 'Modern Kurtas'],
    textureImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1000&auto=format&fit=crop',
    drapeWeight: 'Medium Lustrous'
  }
];

export const CRAFT_STEPS: CraftStep[] = [
  {
    step: '01',
    title: 'THE CHARCOAL SKETCH',
    subtitle: 'Where Architecture Meets Anatomy',
    description: 'Every creation begins on heavy handmade cotton paper with raw graphite and water gouache. We map the client’s exact body proportions, natural posture, and movement patterns before touching a single thread.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
    timeframe: 'Days 1 – 4',
    artisanQuote: 'A line drawn without empathy for how a woman breathes will produce a stiff garment.'
  },
  {
    step: '02',
    title: 'YARN & LOOM SELECTION',
    subtitle: 'Aligning Texture with Intention',
    description: 'We curate pure silk hanks dyed in small dye pots with natural madder, indigo, pomegranate rind, and catechu. The tension of the warp is tuned specifically to the drape intended for the silhouette.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
    timeframe: 'Weeks 1 – 3',
    artisanQuote: 'Silk remembers the water it was washed in and the sunlight it was dried under.'
  },
  {
    step: '03',
    title: 'SCULPTURAL CUTTING',
    subtitle: 'Mathematical Balance on Fabric',
    description: 'Fabric is laid flat on solid teakwood cutting tables. Unlike fast fashion that stacks multiple layers, our master cutters slice each panel individually with century-old brass shears to preserve grain alignment.',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop',
    timeframe: 'Days 14 – 18',
    artisanQuote: 'One millimeter of grain misalignment will cause a saree pleat to veer off balance.'
  },
  {
    step: '04',
    title: 'THE AARI EMBROIDERY FRAME',
    subtitle: 'The Rhythmic Meditation of the Needle',
    description: 'Stretched tightly over long khatia wooden frames. Artisans work in coordinated rhythm: one hand above guiding the needle, one hand underneath feeding the gold thread, never breaking tempo.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1200&auto=format&fit=crop',
    timeframe: 'Weeks 3 – 8',
    artisanQuote: 'A single aari chain stitch is an act of prayer for the woman who will celebrate life in it.'
  },
  {
    step: '05',
    title: 'HAND FINISHING & INTERNAL FIT',
    subtitle: 'The Invisible Luxury Beneath',
    description: 'What touches the skin must be as exquisite as what meets the eyes. All seams are blind-hemmed with fine Japanese silk thread. Micro-cushioned boning channels prevent bruising during 14-hour ceremonies.',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1200&auto=format&fit=crop',
    timeframe: 'Weeks 8 – 10',
    artisanQuote: 'True couture is felt on the skin, not just seen in photographs.'
  },
  {
    step: '06',
    title: 'HER CEREMONIAL REVEAL',
    subtitle: 'Entering the World of Memory',
    description: 'The completed ensemble is steamed with natural rose water and resting in unbleached calico garment bags, sealed with our signature molten wax emblem, ready to accompany the bride into eternity.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
    timeframe: 'The Sacred Day',
    artisanQuote: 'Our work is only finished when she stands in front of the mirror and recognizes her goddess self.'
  }
];

export const CLIENT_STORIES: ClientStory[] = [
  {
    id: 'priya-chennai',
    brideName: 'Priya & Vikram',
    occasion: 'Temple Muhurtham & Leela Palace Reception',
    date: 'February 2026',
    city: 'Chennai / Besant Nagar',
    quote: 'When I wore my Atelier Aarsh Kanchipuram at 5 AM inside the Kapaleeshwarar temple, the weight of the silk felt like an anchor of pure serenity. Everyone asked about the bespoke peacock motif on the back of my blouse—it was unlike anything Chennai had ever witnessed.',
    portrait: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    outfitDetails: 'Bespoke Madder-Red Korvai Pattu & Dravidian Temple Aari Blouse with 24k Gold Kardana',
    videoDuration: '3:45 min wedding film'
  },
  {
    id: 'ananya-london',
    brideName: 'Ananya Deshmukh',
    occasion: 'Destination Wedding, Lake Como',
    date: 'June 2026',
    city: 'London / Lake Como',
    quote: 'Planning a wedding from London seemed daunting until my virtual consultations with Atelier Aarsh. They shipped fabric swatches directly to Mayfair. When the final bridal lehenga arrived in Italy, the fit was millimetric perfection. I felt like an Indian queen on Lake Como.',
    portrait: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?q=80&w=1000&auto=format&fit=crop',
    outfitDetails: 'Champagne Tissue Organza & Antique Zari Trail Gown with Hand-Carved Jade Buttons',
    videoDuration: '4:12 min film'
  },
  {
    id: 'meera-singapore',
    brideName: 'Dr. Meera Swaminathan',
    occasion: 'Botanical Gardens Sangeet & Reception',
    date: 'January 2026',
    city: 'Singapore',
    quote: 'What sets Aarsh apart is their architectural restraint. No gaudy over-sparkling stone work. Just pure sculptural lines, pristine hand-knotted pearl tassels, and silk that moves with the fluidity of water. It was the most comfortable outfit I have ever celebrated in.',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    outfitDetails: 'Obsidian Velvet Corseted Blouse with Liquid Gold Draped Tissue Skirt',
    videoDuration: '2:50 min film'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: 'the-art-of-aari',
    number: '01',
    title: 'The Breath of the Tambour: Why True Aari Cannot Be Replicated by Machine',
    category: 'CRAFT HERITAGE',
    readTime: '6 MIN READ',
    excerpt: 'Examining the subtle difference in thread tension that gives hand-guided aari its three-dimensional human vibration.',
    author: 'Aarsh Creative Studio',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1200&auto=format&fit=crop'
  },
  {
    slug: 'choosing-your-bridal-silk',
    number: '02',
    title: 'The Weight of Memory: How to Select Your Sacred Muhurtham Palette',
    category: 'BRIDAL ESSAY',
    readTime: '8 MIN READ',
    excerpt: 'Beyond bridal red: exploring antique vermilion, sandalwood bone, and deep temple emerald against South Asian skin tones.',
    author: 'Senior Couturier',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    slug: 'architecture-of-the-blouse',
    number: '03',
    title: 'Ergonomics of Grandeur: Engineering Comfort Beneath Heavy Silks',
    category: 'ATELIER TECHNIQUE',
    readTime: '5 MIN READ',
    excerpt: 'How our interior boning and zero-friction shoulder seams keep brides standing tall through seven hours of rituals.',
    author: 'Master Pattern Maker',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1200&auto=format&fit=crop'
  }
];
